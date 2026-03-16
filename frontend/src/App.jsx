import { HashRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import ImageToPdf from "./pages/ImageToPdf";
import PdfCompressor from "./pages/PdfCompressor";
import TextToQr from "./pages/TextToQr";
import PdfToWord from "./pages/PdfToWord";
import PptExtractor from "./pages/PptExtractor";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Contact from "./pages/Contact";


function App() {
  return (
    <HashRouter>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="image-to-pdf" element={<ImageToPdf />} />
          <Route path="pdf-compressor" element={<PdfCompressor />} />
          <Route path="text-to-qr" element={<TextToQr />} />
          <Route path="pdf-to-word" element={<PdfToWord />} />
          <Route path="ppt-extractor" element={<PptExtractor />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </HashRouter>

  );
}

export default App;
