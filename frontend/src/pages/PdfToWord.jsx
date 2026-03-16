import { useState, useEffect } from "react";
import FileUploader from "../components/FileUploader";
import { uploadFile } from "../utils/api";
import { FileText } from "lucide-react";

export default function PdfToWord() {
  const [isUploading, setIsUploading] = useState(false);
  
  useEffect(() => {
    document.title = "PDF to Word Converter - Xentool";
  }, []);

  const handleUpload = async (file) => {
    setIsUploading(true);
    try {
      await uploadFile("/pdf-to-word", file);
    } catch(err) {
      alert("Error processing file: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto py-12">
      <div className="bg-orange-600/10 p-5 rounded-3xl mb-6">
        <FileText className="w-12 h-12 text-orange-600" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 text-center">
        PDF to Word Converter
      </h1>
      <p className="text-lg text-slate-600 mb-12 text-center max-w-2xl">
        Convert your PDF files to editable Word documents (.docx) with high accuracy.
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
