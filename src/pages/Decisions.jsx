import { Filter, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DecisionCard from "../components/DecisionCard";
import { useAuth } from "../context/AuthContext";
import { getUserDecisions } from "../utils/storage";

const Decisions = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const decisions = getUserDecisions(user.id);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(decisions.map((item) => item.category)),];
  const filteredDecisions = useMemo(() => {
    return decisions
      .filter((decision) => {
        const searchText = search.toLowerCase();

        return (
          decision.title.toLowerCase().includes(searchText) || decision.description.toLowerCase().includes(searchText)
        );
      })
      .filter((decision) => {
        if (status === "All") return true;
        return decision.status === status;
      })
      .filter((decision) => {
        if (category === "All") return true;
        return decision.category === category;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [decisions, search, status, category]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Decisions</h1>

          <p className="mt-2 text-sm text-slate-500">Browse and Analyze your Decision History.</p>
        </div>

        <Link to="/decisions/new" className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700">
          <Plus size={18} />Add Decision
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>

            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search Decisions..." className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-indigo-500"/>
          </div>

          <div className="relative">
            <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>

            <select value={status} onChange={(event) => setStatus(event.target.value)} className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-indigo-500">
              <option>All</option>
              <option>Pending</option>
              <option>Decided</option>
              <option>Revisited</option>
            </select>
          </div>

          <select value={category} onChange={(event) => setCategory(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500">
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredDecisions.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <h3 className="text-lg font-bold text-slate-800">No Decisions Found</h3>

            <p className="mt-2 text-sm text-slate-500">Try Changing your Filters or Create a New Decision.</p>
          </div>
        ) : (
          filteredDecisions.map((decision) => (
            <DecisionCard key={decision.id} decision={decision} onClick={() => navigate(`/decisions/${decision.id}`)}/>
          ))
        )}
      </div>
    </div>
  );
};

export default Decisions;