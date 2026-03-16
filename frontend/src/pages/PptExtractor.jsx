import { useState, useEffect } from "react";
import FileUploader from "../components/FileUploader";
import { uploadFile } from "../utils/api";
import { Presentation } from "lucide-react";

export default function PptExtractor() {
  const [isUploading, setIsUploading] = useState(false);
  
  useEffect(() => {
    document.title = "PPT Text Extractor - Xentool";
  }, []);

  const handleUpload = async (file) => {
    setIsUploading(true);
    try {
      await uploadFile("/ppt-extract", file);
    } catch(err) {
      alert("Error processing file: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto py-12">
      <div className="bg-rose-600/10 p-5 rounded-3xl mb-6">
        <Presentation className="w-12 h-12 text-rose-600" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 text-center">
        PPT Text Extractor
      </h1>
      <p className="text-lg text-slate-600 mb-12 text-center max-w-2xl">
        Extract all text content from PowerPoint presentations (.pptx) instantly into a clean text file.
      </p>
      <FileUploader 
        accept=".pptx, .ppt" 
        maxMb={10} 
        onUpload={handleUpload}
        isUploading={isUploading}
      />
    </div>
  );
}
