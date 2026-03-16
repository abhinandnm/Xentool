import { Outlet, Link } from "react-router-dom";
import { Layers } from "lucide-react";

const AdPlaceholder = ({ className = "", text = "Ad Space" }) => (
  <div className={`bg-slate-200 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center text-slate-500 font-medium ${className}`}>
    {text}
  </div>
);

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col pt-16">
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 flex items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Xentool
            </span>
          </Link>
          <nav className="hidden sm:flex gap-6">
            <Link to="/" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Tools</Link>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">API</a>
          </nav>
        </div>
      </header>
      
      {/* Header Ad Space */}
      <div className="max-w-7xl mx-auto w-full mt-6 px-4 sm:px-6 lg:px-8">
        <AdPlaceholder className="w-full h-24 mb-8" text="Google AdSense Banner (728x90)" />
      </div>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow">
            <Outlet />
          </div>
          {/* Sidebar Ad Space */}
          <aside className="hidden lg:block w-80 shrink-0">
             <div className="sticky top-24">
                <AdPlaceholder className="w-full h-[600px]" text="Sidebar Ad (300x600)" />
             </div>
          </aside>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
             <Layers className="w-5 h-5 text-slate-400" />
             <span className="text-sm font-semibold text-slate-500">Xentool © {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link to="/privacy-policy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-slate-900 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
