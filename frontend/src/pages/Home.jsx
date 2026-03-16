import { useEffect } from "react";
import ToolCard from "../components/ToolCard";
import { 
  Image as ImageIcon, 
  Minimize2, 
  QrCode, 
  FileText, 
  Presentation 
} from "lucide-react";

const tools = [
  {
    title: "Image to PDF",
    description: "Convert JPG, PNG, and WEBP images into high-quality PDF documents quickly.",
    icon: ImageIcon,
    path: "/image-to-pdf"
  },
  {
    title: "PDF Compressor",
    description: "Reduce the file size of your PDFs without losing quality for easier sharing.",
    icon: Minimize2,
    path: "/pdf-compressor"
  },
  {
    title: "Text to QR",
    description: "Generate a scannable QR code from any text, link, or contact information.",
    icon: QrCode,
    path: "/text-to-qr"
  },
  {
    title: "PDF to Word",
    description: "Convert your PDF files to editable Word documents (.docx) with high accuracy.",
    icon: FileText,
    path: "/pdf-to-word"
  },
  {
    title: "PPT Text Extractor",
    description: "Extract raw text from your PowerPoint presentations (.pptx) instantly.",
    icon: Presentation,
    path: "/ppt-extractor"
  }
];

export default function Home() {
  useEffect(() => {
    document.title = "Xentool - Free Online File Utilities";
  }, []);

  return (
    <div className="py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Every tool you need to work with files in one place
        </h1>
        <p className="text-xl text-slate-600 mb-8 leading-relaxed">
          Xentool is your all-in-one platform to convert, compress, and extract files directly in your browser. 100% free, fast, and secure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {tools.map((tool, idx) => (
          <ToolCard 
            key={idx}
            title={tool.title}
            description={tool.description}
            icon={tool.icon}
            path={tool.path}
          />
        ))}
      </div>
    </div>
  );
}
