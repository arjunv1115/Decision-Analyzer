import { ArrowLeft, Calendar, Edit3, Tag, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { useAuth } from "../context/AuthContext";
import { deleteDecision, getUserDecisions } from "../utils/storage";
import { formatDate, getConfidenceColor, getStatusColor } from "../utils/helpers";

const DecisionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const decision = getUserDecisions(user.id).find((item) => item.id === id);
  const [deleteModal, setDeleteModal] = useState(false);

  if (!decision) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center">
        <h2 className="text-xl font-bold">Decision not Found</h2>

        <Link to="/decisions" className="mt-4 inline-block text-indigo-600">
          Back to Decisions
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    deleteDecision(decision.id);
    navigate("/decisions");
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <Link to="/decisions" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600">
          <ArrowLeft size={17} />
          Back to Decisions
        </Link>

        <div className="flex gap-2">
          <Button variant="outline">
            <span className="flex items-center gap-2">
              <Edit3 size={16} />
              Edit
            </span>
          </Button>

          <Button variant="danger" onClick={() => setDeleteModal(true)}>
            <span className="flex items-center gap-2">
              <Trash2 size={16} />
              Delete
            </span>
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(decision.status)}`}>
                {decision.status}
              </span>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {decision.category}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-bold text-slate-900">{decision.title}</h1>

            <p className="mt-3 max-w-3xl text-slate-500">{decision.description}</p>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {formatDate(decision.date)}
              </span>

              <span>
                Created {formatDate(decision.createdAt)}
              </span>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5 text-center">
            <p className="text-xs font-medium text-slate-400">Confidence</p>

            <p className={`mt-1 text-4xl font-bold ${getConfidenceColor(decision.confidence)}`}>{decision.confidence}%</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900">Options Considered</h2>

          <div className="mt-4 space-y-2">
            {decision.options?.length ? (
              decision.options.map((option, index) => (
                <div key={index} className={`rounded-xl border p-4 ${option === decision.selectedOption ? "border-indigo-200 bg-indigo-50" : "border-slate-100 bg-slate-50"}`}>
                  <p className="text-sm font-medium text-slate-700">{option}</p>

                  {option === decision.selectedOption && (
                    <p className="mt-1 text-xs font-semibold text-indigo-600">Selected Option</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400">No Options Recorded.</p>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900">Reasoning</h2>

          <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-600">{decision.reason || "No reasoning recorded."}</p>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900">Expected Outcome</h2>

          <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-600">{decision.expectedOutcome ||"No Expected Outcome Recorded."}</p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900">Actual Outcome</h2>

          <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-600">{decision.actualOutcome ||"No Actual Outcome Recorded yet."}</p>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <Tag size={19} /> Tags
        </h2>

        <div className="mt-4 flex flex-wrap gap-2">
          {decision.tags?.length ? (
            decision.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                #{tag}
              </span>
            ))
          ) : (
            <p className="text-sm text-slate-400">No Tags.</p>
          )}
        </div>
      </section>

      <Modal isOpen={deleteModal} onClose={() => setDeleteModal(false)} title="Delete Decision">
        <p className="text-sm leading-6 text-slate-600">Are you sure you want to Delete this Decision?This Action cannot be Undone.</p>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setDeleteModal(false)}>
            Cancel
          </Button>

          <Button variant="danger" onClick={handleDelete}>
            Delete Decision
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default DecisionDetails;