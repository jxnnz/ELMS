import { useState, useRef } from "react";
import logo from "../../assets/LOGO.png";

// ─── Floating Label Input ──────────────────────────────────────────────────────
function FloatingInput({ id, label, type = "text", name, value, onChange, hasError, rightSlot, inputRef, onKeyDown }) {
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
          hasError
            ? "rgba(220,53,69,0.6)"
            : focused
            ? "#81C6FF"
            : "rgba(129,198,255,0.2)"
        }`,
        transition: "border-color 0.2s, box-shadow 0.2s",
        boxShadow: focused ? "0 0 0 3px rgba(129,198,255,0.1)" : "none",
        boxSizing: "border-box",
      }}
    >
      {/* Floating label */}
      <label
        htmlFor={id}
        style={{
          position: "absolute",
          left: 14,
          top: lifted ? 8 : "50%",
          transform: lifted ? "translateY(0) scale(0.78)" : "translateY(-50%) scale(1)",
          transformOrigin: "left center",
          color: lifted
            ? hasError
              ? "#e74c3c"
              : focused
              ? "#81C6FF"
              : "rgba(255,255,255,0.45)"
            : "rgba(255,255,255,0.4)",
          fontSize: "0.9rem",
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
        onBlur={() => setFocused(false)}
        onKeyDown={onKeyDown}
        autoComplete="off"
        style={{
          width: "100%",
          padding: lifted ? `22px ${rightSlot ? 44 : 14}px 7px 14px` : `15px ${rightSlot ? 44 : 14}px 15px 14px`,
          background: "transparent",
          border: "none",
          outline: "none",
          color: "#fff",
          fontSize: "0.92rem",
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

// ─── LoginPage ─────────────────────────────────────────────────────────────────
export default function LoginPage() {
  const [form, setForm]               = useState({ identifier: "", password: "" });
  const [error, setError]             = useState("");
  const [loading, setLoading]         = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [btnPressed, setBtnPressed]   = useState(false);

  const passwordRef = useRef(null);
  const submitRef   = useRef(null);

  const formValid = form.identifier.trim() && form.password.trim();

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    if (e?.preventDefault) e.preventDefault();
    if (!formValid || loading) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setError("not_registered"); }, 800);
  };

  // Keyboard: Enter moves focus forward
  const handleKeyDown = (next) => (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (next === "password") passwordRef.current?.focus();
      if (next === "submit")   { submitRef.current?.focus(); handleSubmit(); }
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #0a1a2e 0%, #0d2136 50%, #0f2d4a 100%)",
      padding: "24px 16px",
      boxSizing: "border-box",
    }}>
      <div style={{ width: "100%", maxWidth: 420 }}>

        {/* Back link */}
        <a href="/"
          style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.35)", fontSize: "0.83rem", textDecoration: "none", marginBottom: 20 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to home
        </a>

        {/* Card */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(129,198,255,0.2)",
          borderRadius: 18,
          padding: "clamp(24px, 5vw, 40px)",
          boxSizing: "border-box",
          width: "100%",
        }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <img src={logo} alt="Logo" style={{ width: 72, height: 72, objectFit: "contain", marginBottom: 12 }} />
            <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: 4, fontSize: "1.2rem", margin: "0 0 4px" }}>Welcome back</h4>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.82rem", margin: 0 }}>Employee Leave Management System</p>
          </div>

          {/* Error alert */}
          {(error === "not_registered" || error === "wrong_password") && (
            <div style={{
              background: "rgba(220,53,69,0.1)",
              border: "1px solid rgba(220,53,69,0.3)",
              borderRadius: 10,
              padding: "12px 14px",
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              marginBottom: 20,
              animation: "fadeIn 0.25s ease",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }}>
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span style={{ color: "#e74c3c", fontSize: "0.82rem", fontWeight: 600 }}>
                {error === "not_registered"
                  ? "User not registered. Please create an account first."
                  : "Incorrect password. Please try again."}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Identifier (email or username) */}
            <div style={{ marginBottom: 14 }}>
              <FloatingInput
                id="identifier"
                label="Email address or Username"
                name="identifier"
                value={form.identifier}
                onChange={handleChange}
                hasError={!!error}
                onKeyDown={handleKeyDown("password")}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 6 }}>
              <FloatingInput
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                hasError={error === "wrong_password"}
                inputRef={passwordRef}
                onKeyDown={handleKeyDown("submit")}
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.35)", padding: 0, display: "flex", alignItems: "center" }}
                  >
                    {showPassword
                      ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    }
                  </button>
                }
              />
            </div>

            {/* Forgot password */}
            <div style={{ textAlign: "right", marginBottom: 22 }}>
              <a href="#" style={{ color: "#81C6FF", fontSize: "0.78rem", textDecoration: "none" }}>Forgot password?</a>
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
                padding: "13px",
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
                ? <><span style={{ width: 16, height: 16, border: "2px solid currentColor", borderTopColor: "transparent", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} /> Logging in...</>
                : "Log In"
              }
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: 24, marginBottom: 0, color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>
            Don't have an account?{" "}
            <a href="/register" style={{ color: "#81C6FF", fontWeight: 700, textDecoration: "none" }}>Register here</a>
          </p>
        </div>
      </div>

      <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
          input::-ms-reveal, input::-ms-clear, input::-webkit-credentials-auto-fill-button, input::-webkit-textfield-decoration-container { display: none !important; }
          input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px rgba(13,33,54,0.9) inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      `}</style>
    </div>
  );
}