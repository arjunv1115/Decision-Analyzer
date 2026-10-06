const Input = ({ label, name, value, onChange, type = "text", placeholder, required = false }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"/>
    </div>
  );
};

export default Input;