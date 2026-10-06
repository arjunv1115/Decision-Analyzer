export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

export const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const getStatusColor = (status) => {
  switch (status) {
    case "Decided":
      return "bg-emerald-100 text-emerald-700";

    case "Pending":
      return "bg-amber-100 text-amber-700";

    case "Revisited":
      return "bg-purple-100 text-purple-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
};

export const getConfidenceColor = (confidence) => {
  if (confidence >= 80) {
    return "text-emerald-600";
  }

  if (confidence >= 50) {
    return "text-amber-600";
  }

  return "text-red-600";
};