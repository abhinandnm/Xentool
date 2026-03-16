export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6 shadow-sm bg-white rounded-xl border border-slate-200">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Contact</h1>
      <div className="space-y-4 text-slate-600 leading-relaxed">
        <p>If you have questions, suggestions, or feedback about Xentool, feel free to contact us.</p>
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-2">
          <p><strong className="text-slate-800">Creator:</strong> Abhinand N.M</p>
          <p><strong className="text-slate-800">Email:</strong> <a href="mailto:abhinandnm327@gmail.com" className="text-blue-600 hover:underline">abhinandnm327@gmail.com</a></p>
        </div>
      </div>
    </div>
  );
}
