import { useState, useRef } from "react";
import logo from "../../assets/LOGO.png";

const RULES = [
  { id: "length",    label: "At least 8 characters",      test: (v) => v.length >= 8 },
  { id: "uppercase", label: "At least 1 uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { id: "number",    label: "At least 1 number",           test: (v) => /[0-9]/.test(v) },
  { id: "symbol",    label: "At least 1 symbol",           test: (v) => /[^A-Za-z0-9]/.test(v) },
];

const pageWrap = {
  minHeight: "100vh",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #0a1a2e 0%, #0d2136 50%, #0f2d4a 100%)",
  padding: "24px 16px",
  boxSizing: "border-box",
};

const card = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(129,198,255,0.2)",
  borderRadius: 18,
  padding: "clamp(20px, 4vw, 32px)",
  boxSizing: "border-box",
  width: "100%",
};

// ─── Floating Label Input ──────────────────────────────────────────────────────
function FloatingInput({ id, label, type = "text", name, value, onChange, onBlur, hasError, rightSlot, inputRef, onKeyDown }) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        borderRadius: 10,
        background: "rgba(255,255,255,0.07)",
        border: `1.5px solid ${
          hasError ? "rgba(220,53,69,0.6)" : focused ? "#81C6FF" : "rgba(129,198,255,0.2)"
        }`,
        transition: "border-color 0.2s, box-shadow 0.2s",
        boxShadow: focused ? "0 0 0 3px rgba(129,198,255,0.1)" : "none",
        boxSizing: "border-box",
      }}
    >
      <label
        htmlFor={id}
        style={{
          position: "absolute",
          left: 14,
          top: lifted ? 7 : "50%",
          transform: lifted ? "translateY(0) scale(0.76)" : "translateY(-50%) scale(1)",
          transformOrigin: "left center",
          color: lifted
            ? hasError ? "#e74c3c" : focused ? "#81C6FF" : "rgba(255,255,255,0.45)"
            : "rgba(255,255,255,0.4)",
          fontSize: "0.88rem",
          fontWeight: 600,
          pointerEvents: "none",
          transition: "all 0.18s ease",
          whiteSpace: "nowrap",
          zIndex: 1,
        }}
      >
        {label}
      </label>

      <input
        id={id}
        ref={inputRef}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={(e) => { setFocused(false); onBlur?.(e); }}
        onKeyDown={onKeyDown}
        autoComplete="off"
        style={{
          width: "100%",
          padding: lifted ? `22px ${rightSlot ? 44 : 14}px 7px 14px` : `15px ${rightSlot ? 44 : 14}px 15px 14px`,
          background: "transparent",
          border: "none",
          outline: "none",
          color: "#fff",
          fontSize: "0.9rem",
          boxSizing: "border-box",
          transition: "padding 0.18s ease",
        }}
      />

      {rightSlot && (
        <div style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)" }}>
          {rightSlot}
        </div>
      )}
    </div>
  );
}

const EyeIcon = ({ open }) => open
  ? <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
  : <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;

// ─── Role Selection ────────────────────────────────────────────────────────────
function RoleSelection({ onSelect }) {
  const roles = [
    {
      id: "admin",
      title: "Admin",
      desc: "Manage employees, approvals, departments, and system settings.",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#81C6FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    },
    {
      id: "employee",
      title: "Employee",
      desc: "Apply for leave, track requests, and view your leave balance.",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#81C6FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    },
  ];

  return (
    <div style={pageWrap}>
      <div style={{ width: "100%", maxWidth: 440 }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.35)", fontSize: "0.83rem", textDecoration: "none", marginBottom: 20 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Back to home
        </a>

        <div style={card}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <img src={logo} alt="Logo" style={{ width: 72, height: 72, objectFit: "contain", marginBottom: 12 }} />
            <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: 4, fontSize: "1.15rem", margin: "0 0 4px" }}>Create an Account</h4>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", margin: 0 }}>Who are you registering as?</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {roles.map((role) => (
              <RoleCard key={role.id} role={role} onSelect={onSelect} />
            ))}
          </div>

          <p style={{ textAlign: "center", marginTop: 24, marginBottom: 0, color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>
            Already have an account?{" "}
            <a href="/login" style={{ color: "#81C6FF", fontWeight: 700, textDecoration: "none" }}>Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
}

function RoleCard({ role, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onClick={() => onSelect(role.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        width: "100%",
        background: hovered ? "rgba(129,198,255,0.08)" : "rgba(255,255,255,0.04)",
        border: `1.5px solid ${hovered ? "#81C6FF" : "rgba(129,198,255,0.25)"}`,
        borderRadius: 14,
        padding: "16px 18px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.18s",
        transform: pressed ? "scale(0.98)" : "scale(1)",
        boxShadow: hovered ? "0 4px 20px rgba(129,198,255,0.1)" : "none",
      }}
    >
      <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(129,198,255,0.12)", border: "1.5px solid rgba(129,198,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {role.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.93rem", marginBottom: 2 }}>{role.title}</div>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.78rem", lineHeight: 1.5 }}>{role.desc}</div>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(129,198,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </button>
  );
}

// ─── Register Form ─────────────────────────────────────────────────────────────
function RegisterForm({ role, onBack }) {
  const isAdmin = role === "admin";

  const [form, setForm]               = useState({ username: "", department: "", email: "", password: "", confirm: "" });
  const [touched, setTouched]         = useState({});
  const [submitted, setSubmitted]     = useState(false);
  const [loading, setLoading]         = useState(false);
  const [showPass, setShowPass]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [btnPressed, setBtnPressed]   = useState(false);

  // Refs for keyboard nav
  const deptRef       = useRef(null);
  const emailRef      = useRef(null);
  const passwordRef   = useRef(null);
  const confirmRef    = useRef(null);
  const submitRef     = useRef(null);

  const ruleResults   = RULES.map(r => ({ ...r, passed: r.test(form.password) }));
  const passwordValid = ruleResults.every(r => r.passed);
  const passwordMatch = form.confirm.length > 0 && form.password === form.confirm;
  const formValid     = form.username.trim() && form.email.trim() &&
                        passwordValid && passwordMatch &&
                        (isAdmin ? form.department.trim() : true);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleBlur   = (e) => setTouched({ ...touched, [e.target.name]: true });

  const handleSubmit = (e) => {
    if (e?.preventDefault) e.preventDefault();
    if (!formValid || loading) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 800);
  };

  const focusNext = (ref) => (e) => {
    if (e.key === "Enter") { e.preventDefault(); ref?.current?.focus(); }
  };
  const focusSubmit = (e) => {
    if (e.key === "Enter") { e.preventDefault(); submitRef.current?.focus(); handleSubmit(); }
  };

  // ── Success ──
  if (submitted) {
    return (
      <div style={pageWrap}>
        <div style={{ ...card, maxWidth: 380, textAlign: "center", animation: "fadeIn 0.3s ease" }}>
          <div style={{ width: 68, height: 68, borderRadius: "50%", background: "rgba(129,198,255,0.12)", border: "2px solid #81C6FF", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
              <path d="M7 16l6 6 12-12" stroke="#81C6FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h5 style={{ color: "#fff", fontWeight: 700, marginBottom: 8, fontSize: "1.1rem" }}>Account Created!</h5>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.88rem", marginBottom: 24 }}>
            Your <span style={{ color: "#81C6FF", fontWeight: 600 }}>{isAdmin ? "Admin" : "Employee"}</span> account has been registered.
          </p>
          <a href="/login" style={{ display: "block", padding: "12px", borderRadius: 10, background: "#81C6FF", color: "#0d2136", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", textAlign: "center" }}>
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  // ── Form ──
  return (
    <div style={pageWrap}>
      <div style={{ width: "100%", maxWidth: isAdmin ? 480 : 450 }}>
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.35)", fontSize: "0.83rem", background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: 20 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Back
        </button>

        <div style={card}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <img src={logo} alt="Logo" style={{ width: 80, height: 80, objectFit: "contain", marginBottom: 8 }} />
            <h5 style={{ color: "#fff", fontWeight: 700, margin: "0", fontSize: "1.05rem" }}>
              {isAdmin ? "Create Admin Account" : "Create Employee Account"}
            </h5>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Admin*/}
            {isAdmin ? (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                  <div>
                    <FloatingInput
                      id="username" label="Username" name="username" value={form.username}
                      onChange={handleChange} onBlur={handleBlur}
                      hasError={!!(touched.username && !form.username.trim())}
                      onKeyDown={focusNext(emailRef)}
                    />
                    {touched.username && !form.username.trim() && (
                      <div style={{ color: "#e74c3c", fontSize: "0.72rem", marginTop: 3 }}>Required</div>
                    )}
                  </div>
                  <div>
                    <FloatingInput
                      id="department" label="Department" name="department" value={form.department}
                      onChange={handleChange} onBlur={handleBlur}
                      hasError={!!(touched.department && !form.department.trim())}
                      inputRef={deptRef} onKeyDown={focusNext(passwordRef)}
                    />
                    {touched.department && !form.department.trim() && (
                      <div style={{ color: "#e74c3c", fontSize: "0.72rem", marginTop: 3 }}>Required</div>
                    )}
                  </div>
                </div>

                <div style={{ marginBottom: 10 }}>
                  <FloatingInput
                    id="email" label="Email address" type="email" name="email" value={form.email}
                    onChange={handleChange} onBlur={handleBlur}
                    hasError={!!(touched.email && !form.email.trim())}
                    inputRef={emailRef} onKeyDown={focusNext(deptRef)}
                  />
                  {touched.email && !form.email.trim() && (
                    <div style={{ color: "#e74c3c", fontSize: "0.72rem", marginTop: 3 }}>Required</div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div style={{ marginBottom: 10 }}>
                  <FloatingInput
                    id="username" label="Username" name="username" value={form.username}
                    onChange={handleChange} onBlur={handleBlur}
                    hasError={!!(touched.username && !form.username.trim())}
                    onKeyDown={focusNext(emailRef)}
                  />
                  {touched.username && !form.username.trim() && (
                    <div style={{ color: "#e74c3c", fontSize: "0.72rem", marginTop: 3 }}>Username is required.</div>
                  )}
                </div>

                <div style={{ marginBottom: 10 }}>
                  <FloatingInput
                    id="email" label="Email address" type="email" name="email" value={form.email}
                    onChange={handleChange} onBlur={handleBlur}
                    hasError={!!(touched.email && !form.email.trim())}
                    inputRef={emailRef} onKeyDown={focusNext(passwordRef)}
                  />
                  {touched.email && !form.email.trim() && (
                    <div style={{ color: "#e74c3c", fontSize: "0.72rem", marginTop: 3 }}>Email is required.</div>
                  )}
                </div>
              </>
            )}

            {/* Password */}
            <div style={{ marginBottom: 10 }}>
              <FloatingInput
                id="password" label="Password"
                type={showPass ? "text" : "password"} name="password" value={form.password}
                onChange={handleChange} onBlur={handleBlur}
                inputRef={passwordRef} onKeyDown={focusNext(confirmRef)}
                rightSlot={
                  <button type="button" onClick={() => setShowPass(v => !v)}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.35)", padding: 0, display: "flex", alignItems: "center" }}>
                    <EyeIcon open={showPass} />
                  </button>
                }
              />
              {/* Password rules — compact inline pills */}
              {form.password.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                  {ruleResults.map(rule => (
                    <span key={rule.id} style={{
                      display: "flex", alignItems: "center", gap: 4,
                      background: rule.passed ? "rgba(129,198,255,0.12)" : "rgba(220,53,69,0.1)",
                      border: `1px solid ${rule.passed ? "rgba(129,198,255,0.3)" : "rgba(220,53,69,0.25)"}`,
                      borderRadius: 20,
                      padding: "3px 9px",
                      fontSize: "0.7rem",
                      color: rule.passed ? "#81C6FF" : "#e74c3c",
                      fontWeight: 600,
                      transition: "all 0.2s",
                    }}>
                      {rule.passed ? "✓" : "✗"} {rule.label}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div style={{ marginBottom: 20 }}>
              <FloatingInput
                id="confirm" label="Confirm Password"
                type={showConfirm ? "text" : "password"} name="confirm" value={form.confirm}
                onChange={handleChange} onBlur={handleBlur}
                hasError={!!(touched.confirm && form.confirm && !passwordMatch)}
                inputRef={confirmRef} onKeyDown={focusSubmit}
                rightSlot={
                  <button type="button" onClick={() => setShowConfirm(v => !v)}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.35)", padding: 0, display: "flex", alignItems: "center" }}>
                    <EyeIcon open={showConfirm} />
                  </button>
                }
              />
              {touched.confirm && form.confirm && !passwordMatch && (
                <div style={{ color: "#e74c3c", fontSize: "0.72rem", marginTop: 3 }}>Passwords do not match.</div>
              )}
              {passwordMatch && (
                <div style={{ color: "#81C6FF", fontSize: "0.72rem", marginTop: 3 }}>✓ Passwords match.</div>
              )}
            </div>

            {/* Submit */}
            <button
              ref={submitRef}
              type="submit"
              disabled={!formValid || loading}
              onMouseDown={() => setBtnPressed(true)}
              onMouseUp={() => setBtnPressed(false)}
              onMouseLeave={() => setBtnPressed(false)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 10,
                border: "none",
                background: formValid ? "#81C6FF" : "rgba(129,198,255,0.15)",
                color: formValid ? "#0d2136" : "rgba(255,255,255,0.3)",
                fontWeight: 700,
                fontSize: "0.95rem",
                cursor: formValid ? "pointer" : "not-allowed",
                transition: "all 0.18s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transform: btnPressed && formValid ? "scale(0.97)" : "scale(1)",
                boxShadow: formValid && !btnPressed ? "0 4px 16px rgba(129,198,255,0.25)" : "none",
              }}
            >
              {loading
                ? <><span style={{ width: 16, height: 16, border: "2px solid currentColor", borderTopColor: "transparent", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} /> Creating account...</>
                : `Register as ${isAdmin ? "Admin" : "Employee"}`
              }
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: 16, marginBottom: 0, color: "rgba(255,255,255,0.4)", fontSize: "0.83rem" }}>
            Already have an account?{" "}
            <a href="/login" style={{ color: "#81C6FF", fontWeight: 700, textDecoration: "none" }}>Log in</a>
          </p>
        </div>
      </div>

      <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
          input::-ms-reveal, input::-ms-clear, input::-webkit-credentials-auto-fill-button, input::-webkit-textfield-decoration-container { display: none !important; }
          input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px rgba(13,33,54,0.9) inset !important;
          -webkit-text-fill-color: #fff !important;
        }
        @media (max-width: 480px) {
          .admin-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// ─── RegisterPage ──────────────────────────────────────────────────────────────
export default function RegisterPage() {
  const [role, setRole] = useState(null);
  return role === null
    ? <RoleSelection onSelect={setRole} />
    : <RegisterForm role={role} onBack={() => setRole(null)} />;
}