import { Clock, CheckCircle, XCircle } from "lucide-react";

export default function StatusBadge({ status }) {
  const map = {
    PENDING: {
      cls: "badge-pending",
      icon: <Clock size={11} />,
      label: "Pending",
    },
    APPROVED: {
      cls: "badge-approved",
      icon: <CheckCircle size={11} />,
      label: "Approved",
    },
    REJECTED: {
      cls: "badge-rejected",
      icon: <XCircle size={11} />,
      label: "Rejected",
    },
    COMPLETED: {
      cls: "badge-approved",
      icon: <CheckCircle size={11} />,
      label: "Completed",
    },
  };
  const { cls, icon, label } = map[status] || map.PENDING;
  return (
    <span className={`badge ${cls}`}>
      {icon}
      {label}
    </span>
  );
}
