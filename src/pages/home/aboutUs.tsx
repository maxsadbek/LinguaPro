import { useState } from "react";

const navLinks = ["Home", "About Us", "Courses", "Pricing", "Contact"];

const StarRating = ({ rating = 5 }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className={`w-3 h-3 ${i < rating ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const principles = [
  {
    icon: (
      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Logic-Centred",
    desc: "We don't just teach words; we create experiences. Inspired in a mission-driven learning process powered by intelligible reasoning for the modern mind.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    title: "Edible Results",
    desc: "Secure and advanced test-prep strategies designed to build real-world confidence and measurable high-band results.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Brilliant Inclusion",
    desc: "Language is a human right. We build accessible systems that open doors to international education, travel, and opportunity.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "AI Synergy",
    desc: "Consistently connecting AI-powered insights with human-led instruction to deliver the fastest, most effective language mastery possible.",
  },
];

const milestones = [
  {
    year: "2019",
    side: "right",
    title: "Alpha Launch",
    desc: "LinguaPro started as a small beta platform offering guided IELTS study paths for ambitious learners.",
  },
  {
    year: "2021",
    side: "left",
    title: "Global Expansion",
    desc: "We welcomed learners from 30+ countries, scaling our educator base and AI systems to meet global demand.",
  },
  {
    year: "2022",
    side: "right",
    title: "Academic Excellence",
    desc: "Launched the Certified Educator Programme and partnered with leading academic institutions worldwide.",
  },
  {
    year: "2023",
    side: "left",
    title: "Evidence Focused",
    desc: "Introduced AI-powered adaptive learning paths, helping over 12,000 students achieve Band 7+ results.",
  },
];

export default function LinguaProAbout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-1">
            <span className="text-red-500 font-bold text-lg tracking-tight">Lingua</span>
            <span className="font-bold text-lg tracking-tight text-gray-900">Pro</span>
          </div>
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a key={link} href="#"
                className={`text-sm font-medium transition-colors ${
                  link === "About Us"
                    ? "text-red-500 border-b-2 border-red-500 pb-0.5"
                    : "text-gray-600 hover:text-gray-900"
                }`}>
                {link}
              </a>
            ))}
            <a href="#" className="text-sm font-semibold text-red-500 hover:underline">IELTS Certificate</a>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-1.5">Sign In</button>
            <button className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full transition-colors">Sign Up</button>
          </div>
          <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a key={link} href="#" className="text-sm text-gray-700 hover:text-red-500 font-medium">{link}</a>
            ))}
            <div className="flex gap-3 pt-2">
              <button className="text-sm font-medium text-gray-700 border border-gray-300 px-4 py-1.5 rounded-full">Sign In</button>
              <button className="bg-red-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full">Sign Up</button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO — Architecting the Future */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left text */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900 mb-5">
              Architecting the{" "}
              <span className="text-red-500 italic">Future</span>{" "}of
              <br />Fluency.
            </h1>
            <p className="text-gray-500 text-base leading-relaxed max-w-md">
              "To democratise top language education through targeted science and dedicated curation, making fluency an accessible art-form for every global citizen."
            </p>
          </div>
          {/* Right image */}
          <div className="rounded-2xl overflow-hidden h-56 sm:h-64 bg-gray-100 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-xs text-gray-400">Team Photo</p>
              </div>
            </div>
            {/* Floating rating badge */}
            <div className="absolute bottom-4 left-4 bg-white rounded-xl px-4 py-2 shadow-lg flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500 font-bold text-xs">SJ</div>
              <div>
                <p className="text-xs font-bold text-gray-800">Dr. Sarah Jenkins</p>
                <StarRating rating={5} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION + VISION */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-5">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-3">Our Mission</h3>
            <p className="text-gray-500 text-base leading-relaxed mb-5">
              To democratise top language education through targeted science and dedicated curation, making fluency an accessible art-form for every global citizen.
            </p>
            <a href="#" className="text-red-500 text-base font-semibold hover:underline flex items-center gap-1">
              Learn more
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Vision */}
          <div className="bg-red-500 rounded-2xl p-8 shadow-sm relative overflow-hidden">
            {/* decorative circle */}
            <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-red-400 opacity-40" />
            <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-red-400 opacity-30" />
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-5 relative">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-extrabold text-white mb-3 relative">Our Vision</h3>
            <p className="text-red-100 text-base leading-relaxed mb-5 relative">
              English isn't just a language — it's the key to your global future. Our vision is a world where every learner reaches their full potential, unlocking opportunities across borders, cultures, and careers.
            </p>
            <a href="#" className="text-white text-base font-semibold hover:underline flex items-center gap-1 relative">
              Learn more
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* STORY OF PRECISION */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden h-72 bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
              <svg className="w-20 h-20 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            {/* Floating stat */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl px-5 py-3 shadow-lg border border-gray-100">
              <p className="text-2xl font-extrabold text-gray-900">Band 9/10</p>
              <p className="text-xs text-gray-500 font-medium">Peak Score Achieved</p>
            </div>
          </div>

          {/* Right text */}
          <div>
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Our Story</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-5 leading-tight">
              A Story of{" "}
              <span className="text-red-500 italic">Precision.</span>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-4">
              LinguaPro started with a simple conviction: that language acquisition doesn't have to be, and never should be, aimless. Our founders had been students of language themselves — frustrated by a cycle of wasted hours on scattered content with no clear path forward.
            </p>
            <p className="text-gray-500 text-base leading-relaxed mb-6">
              Everything that exists at LinguaPro was built on the philosophy of removing that friction — finding what works with precision and creating the tools to help every aspiring learner achieve it faster, smarter, and with confidence.
            </p>
            <button className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors shadow-sm">
              Our Full Story →
            </button>
          </div>
        </div>
      </section>

      {/* CORE PRINCIPLES */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Our Core Principles</h2>
            <div className="w-10 h-1 bg-red-500 rounded-full mx-auto" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {principles.map((p) => (
              <div key={p.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                  {p.icon}
                </div>
                <p className="font-bold text-gray-900 text-sm">{p.title}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE MILESTONE ARC */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">The Milestone Arc</h2>
          <div className="w-10 h-1 bg-red-500 rounded-full mx-auto" />
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gray-200" />

          <div className="flex flex-col gap-12">
            {milestones.map((m, i) => (
              <div key={m.year} className={`relative flex items-start gap-8 ${m.side === "left" ? "flex-row-reverse" : "flex-row"}`}>
                {/* Content */}
                <div className={`w-[calc(50%-2rem)] ${m.side === "left" ? "text-right" : "text-left"}`}>
                  <div className={`inline-block bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2`}>
                    {m.year}
                  </div>
                  <h4 className="font-extrabold text-gray-900 text-base mb-1">{m.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                </div>

                {/* Center dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 border-4 border-white shadow z-10 top-1" />

                {/* Empty side */}
                <div className="w-[calc(50%-2rem)]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 pt-14 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-gray-800">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-1 mb-4">
                <span className="text-red-400 font-bold text-xl">Lingua</span>
                <span className="text-white font-bold text-xl">Pro</span>
              </div>
              <p className="text-sm leading-relaxed text-gray-500">
                The Digital Curator of Language Mastery. We provide high-performance education and resources for the global citizen.
              </p>
              <div className="flex gap-3 mt-5">
                {[{ label: "f" }, { label: "t" }, { label: "in" }].map((s) => (
                  <div key={s.label} className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center text-xs text-gray-400 hover:bg-red-500 hover:text-white cursor-pointer transition-colors font-bold">
                    {s.label}
                  </div>
                ))}
              </div>
            </div>
            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-widest">Quick Links</h4>
              <ul className="space-y-3">
                {["Privacy Policy", "Terms of Use", "Cookie Policy", "About Support"].map((l) => (
                  <li key={l} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-red-500 shrink-0" />
                    <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Courses */}
            <div>
              <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-widest">Courses</h4>
              <ul className="space-y-3">
                {["IELTS Academic", "IELTS General", "Business English", "Spoken English"].map((c) => (
                  <li key={c} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-red-500 shrink-0" />
                    <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">{c}</a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Location */}
            <div>
              <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-widest">Location</h4>
              <div className="w-full h-32 bg-gray-800 rounded-xl flex flex-col items-center justify-center gap-2 border border-gray-700">
                <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p className="text-xs text-gray-400 font-medium">Global Headquarters</p>
                <p className="text-xs text-gray-600">San Francisco, CA, USA</p>
              </div>
              <p className="mt-3 text-sm text-gray-500">
                📧 <a href="mailto:support@linguapro.com" className="hover:text-white transition-colors">support@linguapro.com</a>
              </p>
            </div>
          </div>
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-600">© 2024 LinguaPro. The Digital Curator of Language Mastery.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Privacy</a>
              <a href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Terms</a>
              <a href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
