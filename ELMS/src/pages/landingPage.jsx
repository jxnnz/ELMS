import { useEffect, useRef } from "react";
import logo from "../assets/LOGO.png";

function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const PARTICLE_COUNT = 55;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:     Math.random() * window.innerWidth,
      y:     Math.random() * window.innerHeight,
      r:     Math.random() * 3 + 1,
      dx:    (Math.random() - 0.5) * 0.5,
      dy:    (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(129,198,255,${0.12 * (1 - dist / 140)})`;
            ctx.lineWidth   = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(129,198,255,${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
    />
  );
}

export default function LandingPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0a1a2e 0%, #0d2136 50%, #0f2d4a 100%)",
        position: "relative",
        padding: "24px 16px",
      }}
    >
      <AnimatedBackground />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        {/* Logo placeholder */}
        <div>
          <img
            src={logo}
            alt="Leave Management Logo"
            style={{
              width: "200px",
              height: "200px",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Title */}
        <h1
          style={{
            color: "#ffffff",
            fontSize: "clamp(1.4rem, 5vw, 2rem)",
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: 4,
            letterSpacing: "-0.02em",
          }}
        >
        Leave
        </h1>
        <h1
          style={{
            color: "#81C6FF",
            fontSize: "clamp(1.4rem, 5vw, 2rem)",
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: 16,
            letterSpacing: "-0.02em",
          }}
        >
          Management System
        </h1>

        {/* Subtitle */}
        <p
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: "clamp(0.85rem, 2.5vw, 0.95rem)",
            lineHeight: 1.7,
            marginBottom: 40,
            maxWidth: 320,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Manage leave requests, approvals, and employee records — all in one place.
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <a
            href="/login"
            style={{
              display: "block",
              width: "100%",
              padding: "14px",
              borderRadius: 10,
              background: "#81C6FF",
              color: "#0d2136",
              fontWeight: 700,
              fontSize: "1rem",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            Log In
          </a>
          {/* TODO (teammate): replace href with <Link to="/register"> */}
          <a
            href="/register"
            style={{
              display: "block",
              width: "100%",
              padding: "14px",
              borderRadius: 10,
              background: "transparent",
              color: "#81C6FF",
              fontWeight: 700,
              fontSize: "1rem",
              textDecoration: "none",
              textAlign: "center",
              border: "2px solid rgba(129,198,255,0.4)",
            }}
          >
            Register
          </a>
        </div>

        {/* Footer */}
        <p style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.72rem", marginTop: 40 }}>
          © 2025 Employee Leave Management System
        </p>
      </div>
    </div>
  );
}