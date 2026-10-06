import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { saveDecision } from "../utils/storage";
import { generateId } from "../utils/helpers";

const AddDecision = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Career",
    status: "Pending",
    options: "",
    selectedOption: "",
    reason: "",
    expectedOutcome: "",
    actualOutcome: "",
    confidence: 50,
    tags: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({...form,[name]: value,});
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const decision = {
      id: generateId(),
      userId: user.id,
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      status: form.status,
      options: form.options
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      selectedOption: form.selectedOption.trim(),
      reason: form.reason.trim(),
      expectedOutcome: form.expectedOutcome.trim(),
      actualOutcome: form.actualOutcome.trim(),
      confidence: Number(form.confidence),
      tags: form.tags
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      date: form.date,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveDecision(decision);
    navigate("/decisions");
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <Link to="/decisions" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600">
          <ArrowLeft size={17} /> Back to Decisions
        </Link>

        <h1 className="mt-4 text-3xl font-bold text-slate-900">Record New Decision</h1>

        <p className="mt-2 text-sm text-slate-500">Capture what you decided, why you decided it, and what happened afterward.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900">Decision Information</h2>

          <div className="mt-5 grid gap-5">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Decision Title
              </label>

              <input name="title" value={form.title} onChange={handleChange} placeholder="Example: Choose a new Development Framework" required className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"/>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Description
              </label>

              <textarea name="description" value={form.description} onChange={handleChange} rows="4" placeholder="Describe the Situation..." required className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" />
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Category
                </label>

                <select name="category" value={form.category} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-indigo-500">
                  <option>Career</option>
                  <option>Finance</option>
                  <option>Education</option>
                  <option>Technology</option>
                  <option>Personal</option>
                  <option>Health</option>
                  <option>Business</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Status
                </label>

                <select name="status" value={form.status} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-indigo-500">
                  <option>Pending</option>
                  <option>Decided</option>
                  <option>Revisited</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Decision Date
                </label>

                <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500" />
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900">Reasoning</h2>

          <div className="mt-5 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Options Considered
              </label>

              <input name="options" value={form.options} onChange={handleChange} placeholder="Option A, Option B, Option C" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"/>

              <p className="mt-1 text-xs text-slate-400">Separate Options using Commas.</p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Selected Option
              </label>

              <input name="selectedOption" value={form.selectedOption} onChange={handleChange} placeholder="Which Option did you Select?" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"/>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Why did you choose it?
              </label>

              <textarea name="reason" value={form.reason} onChange={handleChange} rows="5" placeholder="Explain the Reasoning behind your Decision..." className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"/>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Confidence: {form.confidence}%
              </label>

              <input type="range" name="confidence" min="0" max="100" value={form.confidence} onChange={handleChange} className="w-full accent-indigo-600"/>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900">Outcome Tracking</h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Expected Outcome
              </label>

              <textarea name="expectedOutcome" value={form.expectedOutcome} onChange={handleChange} rows="4" placeholder="What do you Expect to happen?" className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"/>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Actual Outcome
              </label>

              <textarea name="actualOutcome" value={form.actualOutcome} onChange={handleChange} rows="4" placeholder="What actually Happened?" className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"/>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900">Organization</h2>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium">
              Tags
            </label>

            <input name="tags" value={form.tags} onChange={handleChange} placeholder="Work, Learning, Important" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"/>
          </div>
        </section>

        <div className="flex justify-end gap-3">
          <Link to="/decisions" className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200">
            Cancel
          </Link>

          <Button type="submit">
            <span className="flex items-center gap-2">
              <Save size={17} />
              Save Decision
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddDecision;