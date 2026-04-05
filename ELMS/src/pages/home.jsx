

const QUICK_STATS = [
  { label: "Total Employees", value: "—",  icon: "👥", color: "#81C6FF" },
  { label: "On Leave Today",  value: "—",  icon: "🏖️", color: "#4aaae0" },
  { label: "Pending Requests",value: "—",  icon: "⏳", color: "#f5c518" },
  { label: "Approved This Month", value: "—", icon: "✅", color: "#22a36a" },
];

const RECENT_REQUESTS = [
  { name: "—", type: "Vacation",   dates: "—", status: "pending" },
  { name: "—", type: "Sick Leave", dates: "—", status: "approved" },
  { name: "—", type: "Personal",   dates: "—", status: "rejected" },
];

const STATUS_STYLES = {
  pending:  { bg: "rgba(245,197,24,0.15)",  color: "#b38600",  label: "Pending" },
  approved: { bg: "rgba(34,163,106,0.12)",  color: "#22a36a",  label: "Approved" },
  rejected: { bg: "rgba(220,53,69,0.1)",    color: "#dc3545",  label: "Rejected" },
};

export default function HomePage() {
  // fetch logged-in user from localStorage/context
  const user = { name: "Employee" }; // placeholder — replace with auth context

  // replace handleLogout body:
  //   localStorage.removeItem("token")
  //   navigate("/login")
  const handleLogout = () => {
    alert("Logout — wire up: clear localStorage token then redirect to /login");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f0f6ff" }}>

      {/* ── Navbar ─────────────────────────────────────────────────────────────── */}
      <nav
        className="navbar px-4 px-lg-5"
        style={{ background: "#0d2136", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="container-fluid p-0 d-flex align-items-center justify-content-between">
          {/* Brand */}
          <div className="d-flex align-items-center gap-2">
            <div
              className="d-flex align-items-center justify-content-center rounded-2"
              style={{ width: 34, height: 34, background: "#81C6FF", flexShrink: 0 }}
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="4" width="14" height="13" rx="2" stroke="#0d2136" strokeWidth="1.8" />
                <path d="M3 8h14" stroke="#0d2136" strokeWidth="1.8" />
                <path d="M7 3v2M13 3v2" stroke="#0d2136" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
            <span className="fw-bold text-white" style={{ fontSize: "0.9rem" }}>
              Employee Leave Management System
            </span>
          </div>

          {/* Right side: user + logout */}
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center gap-2">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle fw-bold"
                style={{ width: 34, height: 34, background: "#81C6FF", color: "#0d2136", fontSize: "0.85rem", flexShrink: 0 }}
              >
                {/* TODO (teammate): show first letter of logged-in user's name */}
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-white d-none d-md-inline" style={{ fontSize: "0.88rem" }}>
                {/* TODO (teammate): show logged-in user's name */}
                {user.name}
              </span>
            </div>
            {/* TODO (teammate): replace onClick with auth logout logic */}
            <button
              onClick={handleLogout}
              className="btn btn-sm rounded-3"
              style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.12)", fontSize: "0.82rem" }}
            >
              Log Out
            </button>
          </div>
        </div>
      </nav>

      {/* ── Main content ───────────────────────────────────────────────────────── */}
      <div className="container py-5">

        {/* Welcome banner */}
        <div
          className="rounded-4 p-4 mb-4 d-flex align-items-center justify-content-between flex-wrap gap-3"
          style={{ background: "linear-gradient(135deg, #0d2136 0%, #1a3a57 100%)", border: "1px solid rgba(129,198,255,0.15)" }}
        >
          <div>
            <p className="mb-1" style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.82rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Welcome back
            </p>
            {/* TODO (teammate): replace with logged-in user's name */}
            <h4 className="fw-bold text-white mb-0">{user.name} 👋</h4>
          </div>
          {/* Apply Leave button */}
          {/* TODO (teammate): wire to apply leave modal or /apply route */}
          <button
            className="btn fw-bold px-4 py-2 rounded-3"
            style={{ background: "#81C6FF", color: "#0d2136", fontSize: "0.9rem" }}
          >
            + Apply for Leave
          </button>
        </div>

        {/* Quick stats */}
        <div className="row g-3 mb-4">
          {QUICK_STATS.map((stat) => (
            <div key={stat.label} className="col-6 col-lg-3">
              <div
                className="bg-white rounded-4 p-4 h-100"
                style={{ border: "1px solid #d4e6f7" }}
              >
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span style={{ fontSize: "1.4rem" }}>{stat.icon}</span>
                  <div
                    className="rounded-circle"
                    style={{ width: 10, height: 10, background: stat.color }}
                  />
                </div>
                <div className="fw-bold mb-1" style={{ fontSize: "1.8rem", color: "#0d2136", lineHeight: 1 }}>
                  {/* TODO (teammate): replace "—" with real data from API */}
                  {stat.value}
                </div>
                <div style={{ fontSize: "0.82rem", color: "#6b8aa8" }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4">
          {/* Recent leave requests table */}
          <div className="col-12 col-lg-7">
            <div className="bg-white rounded-4 p-4" style={{ border: "1px solid #d4e6f7" }}>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h6 className="fw-bold mb-0" style={{ color: "#0d2136" }}>Recent Leave Requests</h6>
                {/* TODO (teammate): wire to full requests list page/tab */}
                <a href="#" className="text-decoration-none" style={{ fontSize: "0.8rem", color: "#4aaae0" }}>
                  View all →
                </a>
              </div>

              {/* Table header */}
              <div className="row g-0 mb-2 px-2">
                {["Employee", "Type", "Dates", "Status"].map((h) => (
                  <div key={h} className="col" style={{ fontSize: "0.72rem", fontWeight: 700, color: "#6b8aa8", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                    {h}
                  </div>
                ))}
              </div>

              {/* Rows — TODO (teammate): replace with real API data */}
              {RECENT_REQUESTS.map((req, i) => {
                const s = STATUS_STYLES[req.status];
                return (
                  <div
                    key={i}
                    className="row g-0 align-items-center px-2 py-3 rounded-3"
                    style={{ borderBottom: i < RECENT_REQUESTS.length - 1 ? "1px solid #f0f6ff" : "none" }}
                  >
                    <div className="col">
                      <div className="d-flex align-items-center gap-2">
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
                          style={{ width: 28, height: 28, background: "#e8f4ff", color: "#1a3a57", fontSize: "0.72rem", flexShrink: 0 }}
                        >
                          —
                        </div>
                        <span style={{ fontSize: "0.83rem", color: "#0d2136", fontWeight: 500 }}>{req.name}</span>
                      </div>
                    </div>
                    <div className="col" style={{ fontSize: "0.82rem", color: "#6b8aa8" }}>{req.type}</div>
                    <div className="col" style={{ fontSize: "0.82rem", color: "#6b8aa8" }}>{req.dates}</div>
                    <div className="col">
                      <span
                        className="rounded-pill px-2 py-1"
                        style={{ background: s.bg, color: s.color, fontSize: "0.72rem", fontWeight: 700 }}
                      >
                        {s.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Leave balance card */}
          <div className="col-12 col-lg-5">
            <div className="bg-white rounded-4 p-4 h-100" style={{ border: "1px solid #d4e6f7" }}>
              <h6 className="fw-bold mb-4" style={{ color: "#0d2136" }}>My Leave Balance</h6>

              {/* TODO (teammate): replace hardcoded values with real API data */}
              {[
                { type: "Vacation Leave",  used: 0, total: 15, color: "#81C6FF" },
                { type: "Sick Leave",      used: 0, total: 10, color: "#4aaae0" },
                { type: "Personal Leave",  used: 0, total: 5,  color: "#22a36a" },
              ].map((b) => (
                <div key={b.type} className="mb-4">
                  <div className="d-flex justify-content-between mb-1">
                    <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#1a3a57" }}>{b.type}</span>
                    <span style={{ fontSize: "0.82rem", color: "#6b8aa8" }}>
                      {b.used} / {b.total} days used
                    </span>
                  </div>
                  <div className="rounded-pill overflow-hidden" style={{ height: 8, background: "#f0f6ff" }}>
                    <div
                      className="h-100 rounded-pill"
                      style={{ width: `${(b.used / b.total) * 100}%`, background: b.color, transition: "width 0.4s ease" }}
                    />
                  </div>
                </div>
              ))}

              {/* Apply leave CTA */}
              {/* TODO (teammate): wire to apply leave modal or /apply route */}
              <button
                className="btn w-100 rounded-3 mt-2 fw-semibold"
                style={{ background: "#f0f6ff", color: "#1a3a57", border: "1px solid #d4e6f7", fontSize: "0.88rem" }}
              >
                Apply for Leave
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}