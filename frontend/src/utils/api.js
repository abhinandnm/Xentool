// Utility to handle API calls to the FastAPI backend

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/tools";

export const uploadFile = async (endpoint, file, onProgress) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      body: formData,
      // Note: fetch doesn't support upload progress natively without XMLHttpRequest
      // For a real prod app we'd use axios or XHR, keeping it simple here.
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error processing file');
    }

    // Get filename from Content-Disposition header if possible
    const contentDisposition = response.headers.get('Content-Disposition');
    let filename = 'downloaded_file';
    if (contentDisposition && contentDisposition.includes('filename=')) {
      filename = contentDisposition.split('filename=')[1].replace(/"/g, '');
    } else {
        // fallback
        if(endpoint === '/image-to-pdf') filename = 'converted.pdf';
        if(endpoint === '/pdf-compress') filename = `compressed_${file.name}`;
        if(endpoint === '/pdf-to-word') filename = 'converted.docx';
        if(endpoint === '/ppt-extract') filename = 'extracted_text.txt';
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    // Create a temporary link to trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    return true;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};

export const generateQrCode = async (text) => {
  const formData = new FormData();
  formData.append("text", text);

  try {
    const response = await fetch(`${API_BASE_URL}/text-to-qr`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Error generating QR code');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qrcode.png';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    return true;
  } catch (error) {
    console.error("QR Code error:", error);
    throw error;
  }
};
