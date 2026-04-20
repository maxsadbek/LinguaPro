<<<<<<< HEAD
import { useState } from "react";
=======
>>>>>>> e4e6188fc2b57c18cc21d47d5bb6f4a900ccc006

/* ─── SHARED DESIGN TOKENS ─── */
// Font: Poppins (display) + Inter (body) — loaded via @import in style tag below
// Colors: red-500 (#EF4444), gray-900, gray-500, white, gray-50

/* ─── GLOBAL STYLE ─── */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,600;0,700;0,800;1,700;1,800&family=Inter:wght@400;500;600&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', sans-serif; }
    .font-display { font-family: 'Poppins', sans-serif; }
  `}</style>
);

/* ─── REUSABLE ─── */
const Stars = ({ n = 5 }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="11" height="11" viewBox="0 0 20 20" fill={i < n ? "#FACC15" : "#D1D5DB"}>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const NAV_LINKS = ["Home", "About Us", "Courses", "Pricing", "Contact"];

const Navbar = ({ active = "Home" }) => {
  const [open, setOpen] = useState(false);
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "#fff", borderBottom: "1px solid #f1f5f9", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
        {/* Logo */}
        <div className="font-display" style={{ display: "flex", alignItems: "center" }}>
          <span style={{ color: "#EF4444", fontWeight: 800, fontSize: 20, letterSpacing: -0.5 }}>Lingua</span>
          <span style={{ color: "#111827", fontWeight: 800, fontSize: 20, letterSpacing: -0.5 }}>Pro</span>
        </div>
        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }} className="desktop-nav">
          {NAV_LINKS.map(l => (
            <a key={l} href="#" style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: l === active ? "#EF4444" : "#6B7280",
              textDecoration: "none",
              borderBottom: l === active ? "2px solid #EF4444" : "none",
              paddingBottom: l === active ? 2 : 0,
              transition: "color .2s"
            }}>{l}</a>
          ))}
          <a href="#" style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 700, color: "#EF4444", textDecoration: "none" }}>IELTS Certificate</a>
        </div>
        {/* Auth */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }} className="desktop-nav">
          <button style={{ background: "none", border: "none", fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500, color: "#374151", cursor: "pointer" }}>Sign In</button>
          <button style={{ background: "#EF4444", border: "none", borderRadius: 999, padding: "7px 18px", fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer" }}>Sign Up</button>
        </div>
        {/* Hamburger */}
        <button onClick={() => setOpen(!open)} style={{ display: "none", background: "none", border: "none", cursor: "pointer" }} className="hamburger">
          <svg width="22" height="22" fill="none" stroke="#374151" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      <style>{`
        @media(max-width:768px){
          .desktop-nav{display:none!important;}
          .hamburger{display:block!important;}
        }
      `}</style>
      {open && (
        <div style={{ background: "#fff", borderTop: "1px solid #f1f5f9", padding: "12px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
          {NAV_LINKS.map(l => <a key={l} href="#" style={{ fontSize: 14, color: "#374151", textDecoration: "none", fontWeight: 500 }}>{l}</a>)}
          <div style={{ display: "flex", gap: 10, paddingTop: 8 }}>
            <button style={{ fontSize: 13, border: "1px solid #D1D5DB", borderRadius: 999, padding: "6px 16px", background: "none", cursor: "pointer" }}>Sign In</button>
            <button style={{ fontSize: 13, background: "#EF4444", color: "#fff", border: "none", borderRadius: 999, padding: "6px 16px", fontWeight: 700, cursor: "pointer" }}>Sign Up</button>
          </div>
        </div>
      )}
    </nav>
  );
};

/* ─── FOOTER ─── */
const Footer = () => (
  <footer style={{ background: "#111827", color: "#9CA3AF", paddingTop: 56, paddingBottom: 32 }}>
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 40, paddingBottom: 40, borderBottom: "1px solid #1F2937" }}>
        {/* Brand */}
        <div>
          <div className="font-display" style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
            <span style={{ color: "#F87171", fontWeight: 800, fontSize: 20 }}>Lingua</span>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 20 }}>Pro</span>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: "#6B7280", maxWidth: 220 }}>
            The Digital Curator of Language Mastery. We provide high-performance education and resources for the global citizen.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            {["f", "t", "in"].map(s => (
              <div key={s} style={{ width: 34, height: 34, borderRadius: "50%", background: "#1F2937", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#9CA3AF", cursor: "pointer" }}>{s}</div>
            ))}
          </div>
        </div>
        {/* Quick Links */}
        <div>
          <h4 style={{ color: "#fff", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 2, marginBottom: 20 }}>Quick Links</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
            {["Privacy Policy", "Terms of Use", "Cookie Policy", "About Support"].map(l => (
              <li key={l} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#EF4444", flexShrink: 0 }} />
                <a href="#" style={{ fontSize: 13, color: "#6B7280", textDecoration: "none" }}>{l}</a>
              </li>
            ))}
          </ul>
        </div>
        {/* Courses */}
        <div>
          <h4 style={{ color: "#fff", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 2, marginBottom: 20 }}>Courses</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
            {["IELTS Academic", "IELTS General", "Business English", "Spoken English"].map(c => (
              <li key={c} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#EF4444", flexShrink: 0 }} />
                <a href="#" style={{ fontSize: 13, color: "#6B7280", textDecoration: "none" }}>{c}</a>
              </li>
            ))}
          </ul>
        </div>
        {/* Location */}
        <div>
          <h4 style={{ color: "#fff", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 2, marginBottom: 20 }}>Location</h4>
          <div style={{ background: "#1F2937", borderRadius: 12, height: 120, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, border: "1px solid #374151" }}>
            <svg width="28" height="28" fill="#EF4444" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <p style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 500 }}>Global Headquarters</p>
            <p style={{ fontSize: 11, color: "#4B5563" }}>San Francisco, CA, USA</p>
          </div>
          <p style={{ marginTop: 12, fontSize: 13, color: "#6B7280" }}>📧 support@linguapro.com</p>
        </div>
      </div>
      <div style={{ paddingTop: 24, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <p style={{ fontSize: 12, color: "#4B5563" }}>© 2024 LinguaPro. The Digital Curator of Language Mastery.</p>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacy", "Terms", "Cookies"].map(l => (
            <a key={l} href="#" style={{ fontSize: 12, color: "#4B5563", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

/* ══════════════════════════════════════
   HOME PAGE
══════════════════════════════════════ */
const EDUCATORS = [
  { name: "James Wilson",    sub: "Oxford-groomed academic excelling in literature and advanced writing.",     initials: "JW", bg: "#FEE2E2", color: "#DC2626", badge: "IELTS",      badgeBg: "#D1FAE5", badgeColor: "#065F46" },
  { name: "Elena Rodriguez", sub: "Helps over 300 students achieve Band 8.5+ in speaking.",                    initials: "ER", bg: "#DBEAFE", color: "#1D4ED8", badge: "ADVANCED",  badgeBg: "#DBEAFE", badgeColor: "#1E40AF" },
  { name: "David Chen",      sub: "Master of listening and reading techniques for high scorers.",              initials: "DC", bg: "#FEF3C7", color: "#D97706", badge: "MASTER",    badgeBg: "#EDE9FE", badgeColor: "#5B21B6" },
  { name: "Sophie Turner",   sub: "Expert in band 9 compositions and pedagogical innovation.",                 initials: "ST", bg: "#D1FAE5", color: "#059669", badge: "CERTIFIED", badgeBg: "#D1FAE5", badgeColor: "#065F46" },
];

const TESTIMONIALS = [
  { name: "Amara K.", initials: "AK", before: "5.5", after: "8.5", bg: "#FEE2E2", color: "#DC2626" },
  { name: "Leo V.",   initials: "LV", before: "5.5", after: "7.5", bg: "#DBEAFE", color: "#1D4ED8" },
];

export function HomePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "'Inter', sans-serif" }}>
      <GlobalStyle />
      <Navbar active="Home" />

      {/* ── HERO ── */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "56px 24px 72px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          {/* Left */}
          <div>
            <span style={{ display: "inline-block", background: "#FEF2F2", color: "#EF4444", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, padding: "4px 14px", borderRadius: 999, marginBottom: 20 }}>
              The Digital Curator
            </span>
            <h1 className="font-display" style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.1, color: "#111827", marginBottom: 18 }}>
              Learn IELTS{" "}
              <em style={{ color: "#EF4444", fontStyle: "italic" }}>faster</em>
              <br />and more<br />effectively.
            </h1>
            <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.75, maxWidth: 360, marginBottom: 32 }}>
              Master English with LinguaPro's AI-enhanced learning environment. We curate professional pathways for ambitious global citizens.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button style={{ background: "#EF4444", color: "#fff", border: "none", borderRadius: 999, padding: "12px 28px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>
                Get Started
              </button>
              <button style={{ background: "none", color: "#374151", border: "1.5px solid #D1D5DB", borderRadius: 999, padding: "12px 28px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>
                Free Trial
              </button>
            </div>
          </div>

          {/* Right — teacher card */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", background: "#F9FAFB", borderRadius: 24, padding: 20, width: 280, boxShadow: "0 8px 32px rgba(0,0,0,0.10)", border: "1px solid #E5E7EB" }}>
              {/* Photo area */}
              <div style={{ background: "linear-gradient(135deg,#FCE7F3,#FEE2E2)", borderRadius: 16, height: 170, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, overflow: "hidden" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#FDA4AF,#EF4444)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 22, fontFamily: "'Poppins',sans-serif", boxShadow: "0 4px 12px rgba(239,68,68,.35)" }}>
                    SJ
                  </div>
                  <div style={{ background: "#fff", borderRadius: 12, padding: "8px 14px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#111827", marginBottom: 3 }}>Dr. Sarah Jenkins</p>
                    <Stars n={5} />
                    <p style={{ fontSize: 10, color: "#6B7280", marginTop: 4, maxWidth: 150, lineHeight: 1.5 }}>
                      "English is the key to your global future. Let's unlock it together!"
                    </p>
                  </div>
                </div>
              </div>
              {/* Band score badge */}
              <div style={{ position: "absolute", bottom: -14, left: -14, background: "#EF4444", borderRadius: 16, padding: "10px 14px", boxShadow: "0 4px 16px rgba(239,68,68,.4)", textAlign: "center", minWidth: 64 }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", lineHeight: 1, fontFamily: "'Poppins',sans-serif" }}>9.0</div>
                <div style={{ fontSize: 9, fontWeight: 700, color: "#FCA5A5", textTransform: "uppercase", letterSpacing: 1, marginTop: 2 }}>Band Score</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCATORS ── */}
      <section style={{ background: "#F9FAFB", padding: "64px 0" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
            <div>
              <h2 className="font-display" style={{ fontSize: 30, fontWeight: 800, color: "#111827", marginBottom: 6 }}>Our Master Educators</h2>
              <div style={{ width: 40, height: 4, background: "#EF4444", borderRadius: 999 }} />
            </div>
            <p style={{ fontSize: 13, color: "#6B7280", maxWidth: 280, lineHeight: 1.6 }}>
              Each LinguaPro leader is vetted for academic excellence and pedagogical innovation.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {EDUCATORS.map(e => (
              <div key={e.name} style={{ background: "#fff", borderRadius: 20, padding: "24px 18px", border: "1px solid #F3F4F6", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textAlign: "center", transition: "box-shadow .2s" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: e.bg, color: e.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 18, fontFamily: "'Poppins',sans-serif" }}>
                  {e.initials}
                </div>
                <span style={{ background: e.badgeBg, color: e.badgeColor, fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, padding: "3px 10px", borderRadius: 999 }}>
                  {e.badge}
                </span>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{e.name}</p>
                <p style={{ fontSize: 11, color: "#6B7280", lineHeight: 1.6 }}>{e.sub}</p>
                <Stars n={5} />
              </div>
            ))}
          </div>

          {/* Dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 24 }}>
            {[0,1,2,3].map(i => (
              <div key={i} style={{ height: 6, width: i === 0 ? 20 : 6, borderRadius: 999, background: i === 0 ? "#EF4444" : "#E5E7EB" }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: "#EF4444", padding: "56px 0" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 className="font-display" style={{ fontSize: 36, fontWeight: 800, color: "#fff" }}>Real Results. Proven Growth.</h2>
            <p style={{ fontSize: 13, color: "#FCA5A5", marginTop: 8 }}>Thousands of students have transformed their futures with us.</p>
          </div>
          {/* Numbers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginBottom: 40, textAlign: "center" }}>
            {[["12k+","Active Students"],["8.5","Avg. Band Score"],["98%","Success Rate"]].map(([v,l]) => (
              <div key={l}>
                <div className="font-display" style={{ fontSize: 52, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#FCA5A5", textTransform: "uppercase", letterSpacing: 2, marginTop: 6 }}>{l}</div>
              </div>
            ))}
          </div>
          {/* Testimonials */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {TESTIMONIALS.map(t => (
              <div key={t.name} style={{ background: "#fff", borderRadius: 20, padding: "18px 20px", display: "flex", alignItems: "center", gap: 16, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
                <div style={{ width: 46, height: 46, borderRadius: "50%", background: t.bg, color: t.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, flexShrink: 0, fontFamily: "'Poppins',sans-serif" }}>
                  {t.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#111827", marginBottom: 6 }}>{t.name}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ background: "#F3F4F6", borderRadius: 8, padding: "4px 10px", textAlign: "center" }}>
                      <div style={{ fontSize: 9, color: "#9CA3AF", fontWeight: 600, textTransform: "uppercase" }}>Before</div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: "#374151", fontFamily: "'Poppins',sans-serif" }}>{t.before}</div>
                    </div>
                    <svg width="14" height="14" fill="none" stroke="#EF4444" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                    <div style={{ background: "#FEF2F2", borderRadius: 8, padding: "4px 10px", textAlign: "center" }}>
                      <div style={{ fontSize: 9, color: "#FCA5A5", fontWeight: 600, textTransform: "uppercase" }}>After</div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: "#EF4444", fontFamily: "'Poppins',sans-serif" }}>{t.after}</div>
                    </div>
                  </div>
                </div>
                <button style={{ background: "#EF4444", color: "#fff", border: "none", borderRadius: 999, padding: "7px 14px", fontSize: 11, fontWeight: 700, cursor: "pointer", flexShrink: 0, fontFamily: "'Inter',sans-serif" }}>
                  Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ══════════════════════════════════════
   ABOUT PAGE
══════════════════════════════════════ */
const PRINCIPLES = [
  { icon: "📚", title: "Logic-Centred",      desc: "We don't just teach words; we create experiences powered by intelligible reasoning for the modern mind." },
  { icon: "✏️", title: "Edible Results",     desc: "Advanced test-prep strategies designed to build real-world confidence and measurable high-band results." },
  { icon: "💡", title: "Brilliant Inclusion", desc: "Language is a human right. We build accessible systems that open doors to international education and opportunity." },
  { icon: "⚡", title: "AI Synergy",          desc: "Connecting AI-powered insights with human-led instruction to deliver the fastest language mastery possible." },
];

const MILESTONES = [
  { year: "2019", side: "right", title: "Alpha Launch",        desc: "LinguaPro started as a small beta platform offering guided IELTS study paths for ambitious learners." },
  { year: "2021", side: "left",  title: "Global Expansion",    desc: "We welcomed learners from 30+ countries, scaling our educator base and AI systems to meet global demand." },
  { year: "2022", side: "right", title: "Academic Excellence", desc: "Launched the Certified Educator Programme and partnered with leading academic institutions worldwide." },
  { year: "2023", side: "left",  title: "Evidence Focused",    desc: "Introduced AI-powered adaptive learning paths, helping over 12,000 students achieve Band 7+ results." },
];

export function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "'Inter', sans-serif" }}>
      <GlobalStyle />
      <Navbar active="About Us" />

      {/* ── HERO ── */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "56px 24px 64px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <h1 className="font-display" style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.1, color: "#111827", marginBottom: 20 }}>
              Architecting the{" "}
              <em style={{ color: "#EF4444", fontStyle: "italic" }}>Future</em>
              {" "}of<br />Fluency.
            </h1>
            <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.75, maxWidth: 400 }}>
              "To democratise top language education through targeted science and dedicated curation, making fluency an accessible art-form for every global citizen."
            </p>
          </div>
          {/* Image placeholder */}
          <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", height: 240, background: "linear-gradient(135deg,#E5E7EB,#D1D5DB)" }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="56" height="56" fill="none" stroke="#9CA3AF" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            {/* Floating badge */}
            <div style={{ position: "absolute", bottom: 14, left: 14, background: "#fff", borderRadius: 12, padding: "8px 14px", boxShadow: "0 4px 16px rgba(0,0,0,0.12)", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#FEE2E2", color: "#DC2626", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 10, fontFamily: "'Poppins',sans-serif" }}>SJ</div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#111827" }}>Dr. Sarah Jenkins</p>
                <Stars n={5} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION + VISION ── */}
      <section style={{ background: "#F9FAFB", padding: "64px 0" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* Mission */}
          <div style={{ background: "#fff", borderRadius: 20, padding: 36, border: "1px solid #F3F4F6", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
              <svg width="20" height="20" fill="none" stroke="#EF4444" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 className="font-display" style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 12 }}>Our Mission</h3>
            <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.75, marginBottom: 20 }}>
              To democratise top language education through targeted science and dedicated curation, making fluency an accessible art-form for every global citizen.
            </p>
            <a href="#" style={{ fontSize: 13, fontWeight: 700, color: "#EF4444", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
              Learn more <span>→</span>
            </a>
          </div>
          {/* Vision */}
          <div style={{ background: "#EF4444", borderRadius: 20, padding: 36, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "#DC2626", opacity: 0.4 }} />
            <div style={{ position: "absolute", bottom: 16, right: 16, width: 60, height: 60, borderRadius: "50%", background: "#DC2626", opacity: 0.3 }} />
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, position: "relative" }}>
              <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            </div>
            <h3 className="font-display" style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 12, position: "relative" }}>Our Vision</h3>
            <p style={{ fontSize: 14, color: "#FECACA", lineHeight: 1.75, marginBottom: 20, position: "relative" }}>
              English isn't just a language — it's the key to your global future. Our vision is a world where every learner reaches their full potential, unlocking opportunities across borders and cultures.
            </p>
            <a href="#" style={{ fontSize: 13, fontWeight: 700, color: "#fff", textDecoration: "none", display: "flex", alignItems: "center", gap: 4, position: "relative" }}>
              Learn more <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── STORY OF PRECISION ── */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "72px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          {/* Image */}
          <div style={{ position: "relative" }}>
            <div style={{ borderRadius: 20, height: 280, background: "linear-gradient(135deg,#FEF3C7,#FDE68A)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              <svg width="72" height="72" fill="none" stroke="#D97706" strokeWidth="1" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
              </svg>
            </div>
            <div style={{ position: "absolute", bottom: -16, right: -16, background: "#fff", borderRadius: 20, padding: "12px 20px", boxShadow: "0 6px 24px rgba(0,0,0,0.10)", border: "1px solid #F3F4F6" }}>
              <div className="font-display" style={{ fontSize: 22, fontWeight: 800, color: "#111827" }}>Band 9/10</div>
              <div style={{ fontSize: 11, color: "#6B7280", fontWeight: 500 }}>Peak Score Achieved</div>
            </div>
          </div>
          {/* Text */}
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#EF4444", textTransform: "uppercase", letterSpacing: 3 }}>Our Story</span>
            <h2 className="font-display" style={{ fontSize: 36, fontWeight: 800, color: "#111827", marginTop: 8, marginBottom: 20, lineHeight: 1.15 }}>
              A Story of{" "}<em style={{ color: "#EF4444", fontStyle: "italic" }}>Precision.</em>
            </h2>
            <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.75, marginBottom: 16 }}>
              LinguaPro started with a simple conviction: that language acquisition doesn't have to be aimless. Our founders had been students of language themselves — frustrated by wasted hours on scattered content with no clear path forward.
            </p>
            <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.75, marginBottom: 28 }}>
              Everything at LinguaPro was built on the philosophy of removing that friction — finding what works with precision and creating the tools to help every aspiring learner achieve it faster and smarter.
            </p>
            <button style={{ background: "#EF4444", color: "#fff", border: "none", borderRadius: 999, padding: "12px 28px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>
              Our Full Story →
            </button>
          </div>
        </div>
      </section>

      {/* ── CORE PRINCIPLES ── */}
      <section style={{ background: "#F9FAFB", padding: "64px 0" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="font-display" style={{ fontSize: 30, fontWeight: 800, color: "#111827", marginBottom: 8 }}>Our Core Principles</h2>
            <div style={{ width: 40, height: 4, background: "#EF4444", borderRadius: 999, margin: "0 auto" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {PRINCIPLES.map(p => (
              <div key={p.title} style={{ background: "#fff", borderRadius: 20, padding: "24px 20px", border: "1px solid #F3F4F6", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                  {p.icon}
                </div>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{p.title}</p>
                <p style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MILESTONE ARC ── */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 className="font-display" style={{ fontSize: 30, fontWeight: 800, color: "#111827", marginBottom: 8 }}>The Milestone Arc</h2>
          <div style={{ width: 40, height: 4, background: "#EF4444", borderRadius: 999, margin: "0 auto" }} />
        </div>
        <div style={{ position: "relative" }}>
          {/* Center line */}
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "#E5E7EB", transform: "translateX(-50%)" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {MILESTONES.map((m) => (
              <div key={m.year} style={{ position: "relative", display: "flex", flexDirection: m.side === "left" ? "row-reverse" : "row", alignItems: "flex-start", gap: 0 }}>
                {/* Content */}
                <div style={{ width: "calc(50% - 32px)", textAlign: m.side === "left" ? "right" : "left", paddingLeft: m.side === "right" ? 0 : 0, paddingRight: 0 }}>
                  <span style={{ display: "inline-block", background: "#EF4444", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 12px", borderRadius: 999, marginBottom: 8, fontFamily: "'Poppins',sans-serif" }}>
                    {m.year}
                  </span>
                  <h4 className="font-display" style={{ fontSize: 16, fontWeight: 800, color: "#111827", marginBottom: 6 }}>{m.title}</h4>
                  <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.65 }}>{m.desc}</p>
                </div>
                {/* Center dot */}
                <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", width: 16, height: 16, borderRadius: "50%", background: "#EF4444", border: "4px solid #fff", boxShadow: "0 0 0 2px #EF4444", zIndex: 1, top: 4 }} />
                {/* Empty side */}
                <div style={{ width: "calc(50% - 32px)" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ══════════════════════════════════════
   APP — page switcher
══════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");
  return (
    <div>
      {/* Dev switcher */}
      <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999, display: "flex", gap: 8 }}>
        <button onClick={() => setPage("home")} style={{ background: page === "home" ? "#EF4444" : "#fff", color: page === "home" ? "#fff" : "#374151", border: "1px solid #E5E7EB", borderRadius: 999, padding: "6px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.12)", fontFamily: "'Inter',sans-serif" }}>
          Home
        </button>
        <button onClick={() => setPage("about")} style={{ background: page === "about" ? "#EF4444" : "#fff", color: page === "about" ? "#fff" : "#374151", border: "1px solid #E5E7EB", borderRadius: 999, padding: "6px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.12)", fontFamily: "'Inter',sans-serif" }}>
          About
        </button>
      </div>
      {page === "home" ? <HomePage /> : <AboutPage />}
    </div>
  );
}
