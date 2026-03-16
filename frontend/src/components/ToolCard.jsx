import { Link } from "react-router-dom";

export default function ToolCard({ title, description, icon: Icon, path }) {
  return (
    <Link 
      to={path}
      className="glass-card p-6 flex flex-col items-start gap-4 hover:-translate-y-1 hover:shadow-2xl transition-all group"
    >
      <div className="bg-blue-50 text-blue-600 p-4 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
        <Icon className="w-8 h-8" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
      </div>
    </Link>
  );
}
