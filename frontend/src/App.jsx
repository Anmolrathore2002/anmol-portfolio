import React, { useState } from "react";

/*
  IMPORTANT:
  - Set BACKEND_URL to your deployed backend base URL (e.g. https://your-backend.onrender.com)
  - RESUME endpoint will be: `${BACKEND_URL}/resume`
  - CONTACT endpoint: `${BACKEND_URL}/api/contact`
*/
const BACKEND_URL = "https://REPLACE_WITH_YOUR_BACKEND_URL";
const RESUME_URL = `${BACKEND_URL}/resume`;
const PHOTO_URL = "/me.jpg";

function Header() {
  return (
    <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold">Anmol Rathore</h1>
        <p className="text-sm text-slate-600 mt-1">Python Developer • Data & ML • Backend Engineer</p>
      </div>
      <nav className="flex gap-4 items-center">
        <a href="#projects" className="text-sm hover:underline">Projects</a>
        <a href="#experience" className="text-sm hover:underline">Experience</a>
        <a href={RESUME_URL} className="ml-3 inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm">Download Resume</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
      <div className="md:col-span-2">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight">Building reliable data products & backend tools</h2>
        <p className="mt-4 text-slate-600">I design and implement backend systems, automation scripts, and data-driven applications that deliver measurable results: maintainable, observable, and performant.</p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a href="#contact" className="w-full sm:w-auto px-4 py-3 bg-indigo-600 text-white rounded-md text-sm text-center">Hire / Contact</a>
          <a href="#projects" className="w-full sm:w-auto px-4 py-3 border rounded-md text-sm text-center">View Projects</a>
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Stat label="Location" value="Indore, India" />
          <Stat label="Email" value="anmolrathore083@gmail.com" />
          <Stat label="Phone" value="+91 9977821604" />
        </div>
      </div>

      <aside className="flex flex-col items-center text-center">
        <img src={PHOTO_URL} alt="Anmol Rathore" className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover shadow-md" />
        <div className="mt-4 w-full">
          <div className="text-sm text-slate-500">Quick Stats</div>
          <div className="mt-2 text-sm text-slate-700">Python • FastAPI • PowerBI • ML</div>
          <div className="mt-4 flex justify-center gap-4">
            <a href="https://github.com/Anmolrathore2002" target="_blank" rel="noreferrer" className="text-sm underline">GitHub</a>
            <a href="https://linkedin.com/in/anmol03" target="_blank" rel="noreferrer" className="text-sm underline">LinkedIn</a>
          </div>
        </div>
      </aside>
    </section>
  );
}

const Stat = ({ label, value }) => (
  <div className="p-3 bg-slate-50 rounded-md text-sm">
    <div className="text-xs text-slate-500">{label}</div>
    <div className="font-medium">{value}</div>
  </div>
);

function Skills({ items }) {
  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 mt-8">
      <h3 className="text-xl font-semibold">Skills</h3>
      <p className="text-sm text-slate-600 mt-2">Key technical skills — clear and recruiter-focused.</p>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {items.map(s => <div key={s} className="p-3 bg-white border rounded-md text-center text-sm font-medium">{s}</div>)}
      </div>
    </section>
  );
}

function Projects({ items }) {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 mt-10">
      <h3 className="text-xl font-semibold">Selected Projects</h3>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(p => (
          <article key={p.title} className="p-4 bg-white border rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-semibold">{p.title}</h4>
                <p className="text-sm text-slate-600 mt-1">{p.desc}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                  {p.tags.map(t => <span key={t} className="px-2 py-1 border rounded">{t}</span>)}
                </div>
              </div>
              <div className="text-xs text-slate-400">Demo / Repo</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Experience({ items }) {
  return (
    <section id="experience" className="max-w-6xl mx-auto px-6 mt-10">
      <h3 className="text-xl font-semibold">Experience</h3>
      <div className="mt-4 space-y-4">
        {items.map(e => (
          <div key={e.org} className="p-4 bg-white border rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-lg font-medium">{e.role}</div>
                <div className="text-sm text-slate-500">{e.org} • <span className="italic">{e.date}</span></div>
              </div>
            </div>
            <ul className="mt-3 list-disc list-inside text-sm text-slate-600">
              {e.bullets.map((b,i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactForm() {
  const [status, setStatus] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  async function submit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(`${BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Network error");
      setForm({ name: "", email: "", subject: "", message: "" });
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 mt-10 mb-12">
      <div className="p-6 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold">Contact</h3>
        <p className="text-sm text-slate-600 mt-2">Send me a message — I usually reply within 48 hours.</p>

        <form onSubmit={submit} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name" className="p-3 border rounded-md" />
          <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Your email" className="p-3 border rounded-md" />
          <input value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} placeholder="Subject (optional)" className="p-3 border rounded-md md:col-span-2" />
          <textarea required value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Your message" className="p-3 border rounded-md md:col-span-2" rows="5" />
          <div className="md:col-span-2 flex gap-3 items-center">
            <button type="submit" className="px-4 py-3 bg-indigo-600 text-white rounded-md">Send Message</button>
            <a href={RESUME_URL} className="px-4 py-3 border rounded-md">Download Resume</a>
            <div className="text-sm text-slate-500">
              {status === "loading" && "Sending..."}
              {status === "success" && "Message sent — thanks!"}
              {status === "error" && "Failed to send. Try again later."}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-6 text-center text-sm text-slate-500">Built with care • Available for hire • © Anmol Rathore</footer>
  );
}

export default function App() {
  const skills = ["Python","SQL","FastAPI","Django","Machine Learning","Scikit-learn","NLP","Power BI","Elastic Stack","Kibana","Git","Docker"];
  const projects = [
    { title: "Audio Transcription & Translation", desc: "Multilingual audio → English transcription pipeline (Whisper + FFmpeg)", tags: ["Python","Whisper","FFmpeg"] },
    { title: "Fake News Detection System", desc: "NLP pipeline using TF-IDF + classical ML models for high precision", tags: ["NLP","ML"] },
    { title: "Supermarket Sales Dashboard", desc: "Power BI dashboard with DAX measures and drill-downs", tags: ["Power BI","DAX"] }
  ];
  const experience = [
    { role: "Python Developer", org: "Tectum Technologies, Indore", date: "Mar 2025 - Present", bullets: ["Built backend utilities and automated workflows.","Implemented Kibana dashboards for monitoring.","Collaborated using Git-based workflows."] },
    { role: "Commissioning Researcher", org: "Kylient Software Solutions", date: "Sep 2024 - Nov 2024", bullets: ["Delivered Excel-driven reports.","Improved pipeline reliability."] }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900 antialiased">
      <Header />
      <main>
        <Hero />
        <Skills items={skills} />
        <Projects items={projects} />
        <Experience items={experience} />
        <ContactForm />
      </main>
      <Footer />
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 500ms ease both; }
      `}</style>
    </div>
  );
}
