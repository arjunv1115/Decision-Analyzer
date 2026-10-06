import { Brain, Lock, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({name: "", email: "", password: "", confirmPassword: "",});
  const [error, setError] = useState("");
  const handleChange = (event) => {
    setForm({...form,[event.target.name]: event.target.value,});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (form.name.trim().length < 2) {
      setError("Please enter a valid name.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const result = register({name: form.name.trim(), email: form.email.trim(), password: form.password});

    if (!result.success) {
      setError(result.message);
      return;
    }
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="hidden flex-1 items-center justify-center bg-indigo-600 p-12 lg:flex">
        <div className="max-w-lg text-white">
          <div className="mb-6 inline-flex rounded-2xl bg-white/10 p-4">
            <Brain size={40} />
          </div>

          <h1 className="text-5xl font-bold leading-tight">Build Better Decision Habits.</h1>

          <p className="mt-6 text-lg leading-8 text-indigo-100">Keep a structured history of your important Decisions and use your History to Understand your Patterns.</p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center p-6 lg:w-[520px]">
        <div className="w-full max-w-md">
          <div className="mb-7">
            <div className="mb-4 inline-flex rounded-xl bg-indigo-600 p-3 text-white lg:hidden">
              <Brain size={25} />
            </div>

            <h2 className="text-3xl font-bold text-slate-900">Create Account</h2>

            <p className="mt-2 text-sm text-slate-500">Start Analyzing your Decisions Today.</p>
          </div>

          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Full Name
              </label>

              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>

                <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"/>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </label>

              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>

                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"/>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>

              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>

                <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Minimum 6 Characters" required className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"/>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Confirm Password
              </label>

              <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Repeat your Password" required className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"/>
            </div>

            <button type="submit" className="w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white hover:bg-indigo-700">
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-indigo-600">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;