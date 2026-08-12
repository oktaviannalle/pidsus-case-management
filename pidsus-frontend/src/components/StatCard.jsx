import { TrendingUp, ArrowUpRight } from "lucide-react";

function StatCard({ title, value, icon: Icon, color = "primary", subtitle, trend }) {
  const colorMap = {
    primary: { bg: "#ecfdf5", border: "#a7f3d0", text: "#047857" },
    gold: { bg: "#fffbeb", border: "#fde68a", text: "#d97706" },
    blue: { bg: "#eff6ff", border: "#bfdbfe", text: "#2563eb" },
    indigo: { bg: "#e0e7ff", border: "#c7d2fe", text: "#4f46e5" },
    red: { bg: "#fef2f2", border: "#fecaca", text: "#dc2626" },
  };

  const scheme = colorMap[color] || colorMap.primary;

  return (
    <div
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
        <div>
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.03em" }}>
            {title}
          </span>
          <h3 style={{ fontSize: "1.65rem", fontWeight: 800, marginTop: "0.25rem", color: "var(--text-primary)" }}>
            {value}
          </h3>
        </div>

        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            backgroundColor: scheme.bg,
            border: `1px solid ${scheme.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: scheme.text,
            flexShrink: 0,
          }}
        >
          {Icon && <Icon size={24} />}
        </div>
      </div>

      {subtitle && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.75rem", color: "var(--text-secondary)", paddingTop: "0.5rem", borderTop: "1px solid #f1f5f9" }}>
          {trend && <ArrowUpRight size={14} color="var(--primary)" />}
          <span>{subtitle}</span>
        </div>
      )}
    </div>
  );
}

export default StatCard;
