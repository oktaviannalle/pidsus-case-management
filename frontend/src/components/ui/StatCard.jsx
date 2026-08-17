import { ArrowUpRight, TrendingDown, Minus } from "lucide-react";

function StatCard({ title, value, icon: Icon, color = "primary", subtitle, trend }) {
  const colorMap = {
    primary: { bar: "#1e7a3e", iconBg: "#eaf4ee", iconColor: "#1e7a3e", border: "#b8d9c3" },
    gold:    { bar: "#c9a227", iconBg: "#fdf8ec", iconColor: "#c9a227", border: "#e8d5a0" },
    blue:    { bar: "#1d4ed8", iconBg: "#eff6ff", iconColor: "#1d4ed8", border: "#bfdbfe" },
    indigo:  { bar: "#4f46e5", iconBg: "#f5f3ff", iconColor: "#4f46e5", border: "#ddd6fe" },
    red:     { bar: "#dc2626", iconBg: "#fff1f2", iconColor: "#dc2626", border: "#fecaca" },
  };

  const scheme = colorMap[color] || colorMap.primary;

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        border: "1px solid var(--border-color)",
        boxShadow: "var(--shadow-sm)",
        overflow: "hidden",
        transition: "box-shadow 0.18s ease",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "var(--shadow-md)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "var(--shadow-sm)"; }}
    >
      {/* Colored top accent */}
      <div style={{ height: "3px", backgroundColor: scheme.bar }} />

      <div style={{ padding: "1.25rem 1.375rem 1.25rem" }}>
        {/* Title row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.875rem" }}>
          <span
            style={{
              fontSize: "0.68rem",
              fontWeight: 700,
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              lineHeight: 1.4,
              maxWidth: "140px",
            }}
          >
            {title}
          </span>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "8px",
              backgroundColor: scheme.iconBg,
              border: `1px solid ${scheme.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: scheme.iconColor,
              flexShrink: 0,
            }}
          >
            {Icon && <Icon size={19} />}
          </div>
        </div>

        {/* Value */}
        <div
          style={{
            fontSize: "1.65rem",
            fontWeight: 800,
            color: "var(--text-primary)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "0.875rem",
          }}
        >
          {value}
        </div>

        {/* Footer */}
        {subtitle && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
              paddingTop: "0.625rem",
              borderTop: "1px solid #f0f4f1",
              fontSize: "0.7rem",
              color: "var(--text-muted)",
            }}
          >
            {trend === true && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: "2px", padding: "1px 5px", borderRadius: "3px", background: "#f0fdf4", color: "#15803d", fontSize: "0.65rem", fontWeight: 700 }}>
                <ArrowUpRight size={10} /> Naik
              </span>
            )}
            {trend === false && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: "2px", padding: "1px 5px", borderRadius: "3px", background: "#fff1f2", color: "#dc2626", fontSize: "0.65rem", fontWeight: 700 }}>
                <TrendingDown size={10} /> Turun
              </span>
            )}
            <span>{subtitle}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;
