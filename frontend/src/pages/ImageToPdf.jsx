import { useState, useEffect } from "react";
import FileUploader from "../components/FileUploader";
import { uploadFile } from "../utils/api";
import { Image as ImageIcon } from "lucide-react";

export default function ImageToPdf() {
  const [isUploading, setIsUploading] = useState(false);
  
  useEffect(() => {
    document.title = "Image to PDF Converter - Xentool";
    // For SEO: Add meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Convert JPG, PNG, and WEBP images to PDF quickly and securely.");
    }
  }, []);

  const handleUpload = async (file) => {
    setIsUploading(true);
    try {
      await uploadFile("/image-to-pdf", file);
      // Success is handled by download drop in utils
    } catch(err) {
      alert("Error uploading file: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto py-12">
      <div className="bg-blue-600/10 p-5 rounded-3xl mb-6">
        <ImageIcon className="w-12 h-12 text-blue-600" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 text-center">
        Image to PDF Converter
      </h1>
      <p className="text-lg text-slate-600 mb-12 text-center max-w-2xl">
        Convert your JPG, PNG, or WEBP images into high-quality PDF documents in seconds. Fast, secure, and free.
      </p>

      <FileUploader 
        accept="image/jpeg, image/png, image/webp" 
        maxMb={10} 
        onUpload={handleUpload}
        isUploading={isUploading}
      />
    </div>
  );
}
