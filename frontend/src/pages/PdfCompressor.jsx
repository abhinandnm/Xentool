import { useState, useEffect } from "react";
import FileUploader from "../components/FileUploader";
import { uploadFile } from "../utils/api";
import { Minimize2 } from "lucide-react";

export default function PdfCompressor() {
  const [isUploading, setIsUploading] = useState(false);
  
  useEffect(() => {
    document.title = "PDF Compressor - Xentool";
  }, []);

  const handleUpload = async (file) => {
    setIsUploading(true);
    try {
      await uploadFile("/pdf-compress", file);
    } catch(err) {
      alert("Error processing file: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto py-12">
      <div className="bg-emerald-600/10 p-5 rounded-3xl mb-6">
        <Minimize2 className="w-12 h-12 text-emerald-600" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 text-center">
        Compress PDF
      </h1>
      <p className="text-lg text-slate-600 mb-12 text-center max-w-2xl">
        Reduce the size of your PDF files without losing quality. Make them easy to email or upload.
      </p>
      <FileUploader 
        accept="application/pdf" 
        maxMb={10} 
        onUpload={handleUpload}
        isUploading={isUploading}
      />
    </div>
  );
}
