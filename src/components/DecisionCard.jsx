import { Calendar, ChevronRight, Tag } from "lucide-react";
import { formatDate, getStatusColor } from "../utils/helpers";

const DecisionCard = ({ decision, onClick }) => {
  return (
    <div onClick={onClick} className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold text-slate-900">
            {decision.title}
          </h3>

          <p className="mt-1 line-clamp-2 text-sm text-slate-500">
            {decision.description}
          </p>
        </div>

        <ChevronRight className="shrink-0 text-slate-300 transition group-hover:text-indigo-500"size={20}/>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(decision.status)}`}>
          {decision.status}
        </span>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {decision.category}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-400">
        <span className="flex items-center gap-1">
          <Calendar size={14} />
          {formatDate(decision.date)}
        </span>

        {decision.tags?.length > 0 && (
          <span className="flex items-center gap-1">
            <Tag size={14} />
            {decision.tags.length} tags
          </span>
        )}

        <span>
          Confidence: {decision.confidence}%
        </span>
      </div>
    </div>
  );
};

export default DecisionCard;