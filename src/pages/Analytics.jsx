import { BarChart3, CheckCircle2, Clock, Target } from "lucide-react";
import { useMemo } from "react";
import StatCard from "../components/StatCard";
import { useAuth } from "../context/AuthContext";
import { getUserDecisions } from "../utils/storage";

const Analytics = () => {
  const { user } = useAuth();
  const decisions = getUserDecisions(user.id);
  const total = decisions.length;
  const completed = decisions.filter((item) => item.status === "Decided").length;
  const pending = decisions.filter((item) => item.status === "Pending").length;
  const revisited = decisions.filter((item) => item.status === "Revisited").length;

  const averageConfidence =
    total === 0 ? 0 : Math.round(decisions.reduce((sum, item) =>sum + Number(item.confidence || 0), 0) /total);

  const categoryData = useMemo(() => {
    const result = {};

    decisions.forEach((decision) => {
      result[decision.category] = (result[decision.category] || 0) + 1;
    });

    return Object.entries(result).sort((a, b) => b[1] - a[1]);
  }, [decisions]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>

        <p className="mt-2 text-sm text-slate-500">Understand patterns across your decision history.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total" value={total} icon={BarChart3}/>
        <StatCard title="Completed" value={completed} icon={CheckCircle2}/>
        <StatCard title="Pending" value={pending} icon={Clock}/>
        <StatCard title="Confidence" value={`${averageConfidence}%`} icon={Target}/>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900">Decision Status</h2>

          <div className="mt-6 space-y-5">
            {[
              {
                label: "Completed",
                value: completed,
                total,
              },
              {
                label: "Pending",
                value: pending,
                total,
              },
              {
                label: "Revisited",
                value: revisited,
                total,
              },
            ].map((item) => {
              const percentage = total === 0 ? 0 : Math.round((item.value / total) * 100);

              return (
                <div key={item.label}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-slate-700">
                      {item.label}
                    </span>

                    <span className="text-slate-400">
                      {item.value} ({percentage}%)
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-indigo-600" style={{ width: `${percentage}%`, }}/>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900">Decisions by Category</h2>

          <div className="mt-6 space-y-4">
            {categoryData.length === 0 ? (
              <p className="text-sm text-slate-400">No Analytics Available yet.</p>
            ) : (
              categoryData.map(([category, count]) => {
                const percentage =
                  Math.round((count / total) * 100);

                return (
                  <div key={category}>
                    <div className="mb-2 flex justify-between">
                      <span className="text-sm font-medium text-slate-700">
                        {category}
                      </span>

                      <span className="text-sm text-slate-400">
                        {count}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-indigo-500" style={{ width: `${percentage}%` }}/>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>

      <section className="rounded-2xl bg-indigo-600 p-7 text-white">
        <h2 className="text-xl font-bold">Decision-Making Insight</h2>

        <p className="mt-3 max-w-3xl text-sm leading-7 text-indigo-100">Analytics become more useful as your History grows. Record both your Reasoning and Actual Outcomes so you can compare what you Expected with what Actually happened.</p>
      </section>
    </div>
  );
};

export default Analytics;