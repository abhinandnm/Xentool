import { useState, useEffect } from "react";
import { generateQrCode } from "../utils/api";
import { QrCode, AlertCircle } from "lucide-react";

export default function TextToQr() {
  const [text, setText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  
  useEffect(() => {
    document.title = "Text to QR Code - Xentool";
  }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError("Please enter some text or a URL.");
      return;
    }
    setError("");
    setIsGenerating(true);
    
    try {
      await generateQrCode(text);
    } catch(err) {
      setError("Error generating QR Code: " + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto py-12">
      <div className="bg-purple-600/10 p-5 rounded-3xl mb-6">
        <QrCode className="w-12 h-12 text-purple-600" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 text-center">
        Text to QR Code
      </h1>
      <p className="text-lg text-slate-600 mb-12 text-center max-w-2xl">
        Generate a scannable QR code from any text, link, email, or phone number instantly.
      </p>

      <div className="w-full max-w-2xl">
        {error && (
          <div className="mb-4 bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-2 font-medium">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}
        
        <form onSubmit={handleGenerate} className="glass-card p-8">
          <label htmlFor="qr-text" className="block text-sm font-semibold text-slate-700 mb-2">
            Enter Text or URL
          </label>
          <textarea
            id="qr-text"
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full rounded-xl border border-slate-300 p-4 text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none mb-6"
            placeholder="https://example.com"
          />
          <button 
            type="submit"
            className="btn-primary w-full h-14 text-lg" 
            disabled={isGenerating}
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : "Generate & Download QR Code"}
          </button>
        </form>
      </div>
    </div>
  );
}
