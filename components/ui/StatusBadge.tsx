import { STATUS_COLORS, STATUS_LABELS, STATUS_DOT, VisitStatus } from "@/lib/types";

export default function StatusBadge({ status }: { status: VisitStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${STATUS_COLORS[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[status]}`} aria-hidden />
      {STATUS_LABELS[status]}
    </span>
  );
}
