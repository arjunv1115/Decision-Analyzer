import { Activity, ArrowRight, CheckCircle2, Clock3, Plus, RotateCcw } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard";
import DecisionCard from "../components/DecisionCard";
import { useAuth } from "../context/AuthContext";
import { getUserDecisions } from "../utils/storage";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const decisions = getUserDecisions(user.id);
  const total = decisions.length;
  const pending = decisions.filter((item) => item.status === "Pending").length;
  const decided = decisions.filter((item) => item.status === "Decided").length;
  const revisited = decisions.filter((item) => item.status === "Revisited").length;
  const averageConfidence = total === 0 ? 0 : Math.round(decisions.reduce( (sum, item) => sum + Number(item.confidence || 0), 0) / total);
  const recentDecisions = [...decisions].sort((a, b) =>new Date(b.createdAt) -new Date(a.createdAt)).slice(0, 4);

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-indigo-600">Welcome Back</p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">{user.name}</h1>

          <p className="mt-2 text-sm text-slate-500">Here's an Overview of your Decision History.</p>
        </div>

        <Link to="/decisions/new" className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700">
          <Plus size={18} />
          New Decision
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Decisions" value={total} icon={Activity} description="All Recorded Decisions"/>
        <StatCard title="Pending" value={pending} icon={Clock3} description="Awaiting Final Outcome"/>
        <StatCard title="Completed" value={decided} icon={CheckCircle2} description="Decisions Completed"/>
        <StatCard title="Avg Confidence" value={`${averageConfidence}%`} icon={RotateCcw} description={`${revisited} revisited`}/>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Recent Decisions</h2>

              <p className="mt-1 text-sm text-slate-500">Your Latest Recorded Decisions.</p>
            </div>

            <button onClick={() => navigate("/decisions")} className="flex items-center gap-1 text-sm font-semibold text-indigo-600">
              View All
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {recentDecisions.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center">
                <p className="font-semibold text-slate-700">No Decisions yet</p>

                <p className="mt-1 text-sm text-slate-400">Start by Recording your First Decision.</p>
              </div>
            ) : (
              recentDecisions.map((decision) => (
                <DecisionCard key={decision.id} decision={decision} onClick={() => navigate(`/decisions/${decision.id}`)}/>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-indigo-600 p-6 text-white">
          <h2 className="text-xl font-bold">Decision Insight</h2>

          <p className="mt-3 text-sm leading-6 text-indigo-100">The more Consistently you Record your Reasoning and Outcomes, the Easier it becomes to Identify Patterns in your Decision-Making.</p>

          <div className="mt-8 rounded-xl bg-white/10 p-5">
            <p className="text-sm text-indigo-100">Current Confidence</p>

            <p className="mt-2 text-4xl font-bold">{averageConfidence}%</p>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-white" style={{ width: `${averageConfidence}%` }}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;