const Button = ({children, type = "button", onClick, variant = "primary", className = "", disabled = false }) => {
  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700",

    secondary:
      "bg-slate-100 text-slate-700 hover:bg-slate-200",

    danger:
      "bg-red-600 text-white hover:bg-red-700",

    outline:
      "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;