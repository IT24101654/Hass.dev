import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaFigma } from 'react-icons/fa';
import {
  FiMic, FiZap, FiCloud, FiCpu, FiArrowLeft,
  FiExternalLink, FiX, FiArrowRight, FiCode, FiTerminal,
} from 'react-icons/fi';
import ReactDOM from 'react-dom';

import jarvisImg  from '../assets/JARVIS.png';

/* ─── project assets ─────────────────────────────────────────── */
import hassDevC  from '../assets/Hass.dev Portfolio-card.png';
import hassDevP  from '../assets/Hass.dev Portfolio-popup.png';
import parkifyC  from '../assets/Parkify Website-card.png';
import parkifyP  from '../assets/Parkify Website-popup.png';
import parkifyWC from '../assets/Parkify Mobile App-card.PNG';
import parkifyWP from '../assets/Parkify Mobile App-popup.PNG';
import artC      from '../assets/Living Art Gallery-card.png';
import artP      from '../assets/Living Art Gallery-popup.png';
import schoolC   from '../assets/NeoSchool-card.png';
import schoolP   from '../assets/NeoSchool-popup.jpeg';
import ecoC      from '../assets/EcoLeaf-card.png';
import ecoP      from '../assets/EcoLeaf-popup.png';

/* ═══════════════════════════════════════════════════════════════ */
const FEATURES = [
  { icon: FiMic,      title: 'Voice Recognition',  desc: 'Listens to natural speech commands via Python SpeechRecognition — real-time.',  color: '#ff2a2a' },
  { icon: FiZap,      title: 'Intent Parsing',     desc: 'Pluggable command system — custom actions with just a few lines of code.',       color: '#f97316' },
  { icon: FiCloud,    title: 'API Integrations',   desc: 'Live weather from OpenWeatherMap, knowledge from Wikipedia, and more.',          color: '#3b82f6' },
  { icon: FiCpu,      title: 'Text-to-Speech',     desc: 'Natural, paced spoken responses via pyttsx3 — truly conversational.',           color: '#10b981' },
  { icon: FiCode,     title: 'Modular Design',     desc: 'Each command handler is its own module — drop one in and it just works.',       color: '#a855f7' },
  { icon: FiTerminal, title: 'CLI Fallback',       desc: 'Runs in any terminal without a GUI — perfect for headless systems.',            color: '#eab308' },
];

const TECH_DETAILS = [
  { name: 'Python 3.10',        desc: 'Core runtime' },
  { name: 'SpeechRecognition',  desc: 'Voice input' },
  { name: 'pyttsx3',            desc: 'Speech output' },
  { name: 'OpenWeatherMap API', desc: 'Weather data' },
  { name: 'Wikipedia API',      desc: 'Knowledge base' },
  { name: 'pyaudio',            desc: 'Microphone access' },
];

const RELATED = [
  {
    id: 10, title: 'Hass.dev Portfolio', tagline: 'Personal portfolio with 3D web experience',
    description: "My own portfolio site. Built with React, Tailwind CSS, and a Spline 3D hero.",
    highlights: ['Lazy-loaded 3D scene', 'Framer Motion animations', 'Formspree contact form'],
    cardImg: hassDevC, popupImg: hassDevP,
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Spline'],
    github: 'https://github.com/IT24101654/Hass.dev',
    live: 'https://main.d1vv087i13in11.amplifyapp.com',
    accent: '#ec4899',
  },
  {
    id: 11, title: 'Parkify — Web', tagline: 'Smart parking management platform',
    description: 'Full-stack web app: find, view, and book parking spots on Google Maps.',
    highlights: ['Google Maps integration', 'JWT auth for three roles', 'Owner dashboard analytics'],
    cardImg: parkifyC, popupImg: parkifyP,
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Google Maps API'],
    github: 'https://github.com/IT24101654/Parkify---Parking-Management-System',
    live: 'https://parkify-frontend.onrender.com',
    figma: 'https://www.figma.com/design/MCInBg3XbLly5cgiezr8nS/Parkify-UI-Flow?node-id=25-147',
    accent: '#3b82f6',
  },
  {
    id: 12, title: 'Parkify — Mobile', tagline: 'React Native parking app for iOS & Android',
    description: 'Mobile companion to Parkify Web. Same backend, cross-platform via Expo.',
    highlights: ['Cross-platform via Expo', 'Shared backend API', 'Location-based search'],
    cardImg: parkifyWC, popupImg: parkifyWP,
    tech: ['React Native', 'Expo', 'Node.js', 'MongoDB'],
    github: 'https://github.com/IT24101654/Parkify-Frontend',
    live: null,
    accent: '#f97316',
    isMobile: true,
  },
  {
    id: 13, title: 'Living Art Gallery', tagline: 'Online gallery for pencil portraits',
    description: 'Clean gallery for pencil portrait work — custom lightbox, zero dependencies.',
    highlights: ['CSS grid masonry', 'Zero-dependency lightbox', 'Mobile-first design'],
    cardImg: artC, popupImg: artP,
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/IT24101654/Living-Art-by-Hasarinda',
    live: null,
    accent: '#10b981',
  },
  {
    id: 14, title: 'NeoSchool', tagline: 'School information management system',
    description: 'Student records, course enrolment, grade tracking — role-based PHP/MySQL system.',
    highlights: ['Admin/teacher/student roles', 'MySQL normalised schema', 'CRUD operations'],
    cardImg: schoolC, popupImg: schoolP,
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    github: 'https://github.com/IT24101654/NeoSchool',
    live: null,
    accent: '#f59e0b',
  },
  {
    id: 15, title: 'EcoLeaf AI/ML', tagline: 'Plant disease detection with machine learning',
    description: '~94% accuracy CNN trained on plant disease dataset using TensorFlow/Keras.',
    highlights: ['~94% validation accuracy', 'TensorFlow/Keras CNN', 'Data augmentation'],
    cardImg: ecoC, popupImg: ecoP,
    tech: ['Python', 'TensorFlow', 'Keras', 'Jupyter', 'scikit-learn'],
    github: 'https://github.com/IT24101654/EcoLeaf-AIML',
    live: null,
    accent: '#84cc16',
  },
];

/* ═══════════════════════════════════════════════════════════════ */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: 'easeOut' },
});

/* ── Phone Frame ─────────────────────────────────────────────── */
function PhoneFrame({ img, alt }) {
  return (
    <div className="relative mx-auto" style={{ width: 160, height: 320 }}>
      <div className="absolute inset-0 rounded-[32px] border-[6px] border-white/20 bg-[#111]" />
      <div className="absolute -right-[8px] top-[70px] w-[5px] h-[28px] rounded-r-md bg-white/10" />
      <div className="absolute -left-[8px] top-[54px] w-[5px] h-[18px] rounded-l-md bg-white/10" />
      <div className="absolute -left-[8px] top-[80px] w-[5px] h-[36px] rounded-l-md bg-white/10" />
      <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[52px] h-[12px] bg-black rounded-full z-10" />
      <div className="absolute inset-[6px] rounded-[26px] overflow-hidden bg-black">
        <img src={img} alt={alt} className="w-full h-full object-cover object-top" loading="lazy" />
      </div>
    </div>
  );
}

/* ── Related Card ────────────────────────────────────────────── */
function RelatedCard({ project, onOpen, index }) {
  return (
    <motion.article
      {...fadeUp(index * 0.05)}
      className="group relative rounded-2xl overflow-hidden flex flex-col"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', transition: 'border-color 0.3s, box-shadow 0.3s' }}
      whileHover={{ borderColor: `${project.accent}40`, boxShadow: `0 0 30px ${project.accent}18` }}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }} />

      {project.isMobile ? (
        <div className="relative flex items-center justify-center py-6 overflow-hidden flex-shrink-0"
          style={{ background: 'rgba(0,0,0,0.3)', minHeight: 220 }}>
          <div className="absolute inset-0"
            style={{ background: `radial-gradient(circle at 50% 50%, ${project.accent}15, transparent 70%)` }} />
          <PhoneFrame img={project.cardImg} alt={project.title} />
        </div>
      ) : (
        <div className="relative h-40 sm:h-44 overflow-hidden flex-shrink-0">
          <img src={project.cardImg} alt={`${project.title} screenshot`} loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: project.accent, opacity: 0.7 }} />
        </div>
      )}

      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <p className="font-mono text-[10px] tracking-wider mb-1" style={{ color: project.accent }}>{project.tagline}</p>
        <h3 className="text-white font-semibold text-base mb-1.5">{project.title}</h3>
        <p className="text-gray-400 text-xs leading-relaxed mb-3 line-clamp-3 flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tech.slice(0, 3).map(t => (
            <span key={t} className="text-[10px] font-medium text-gray-400 bg-white/[0.05] border border-white/[0.08] px-2 py-0.5 rounded-full">{t}</span>
          ))}
          {project.tech.length > 3 && <span className="text-[10px] text-gray-500 px-1.5 py-0.5">+{project.tech.length - 3}</span>}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => onOpen(project)}
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium text-white border border-white/20 hover:border-white/40 rounded-lg py-1.5 transition-colors">
            Details <FiArrowRight size={12} />
          </button>
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-white border border-white/10 hover:border-white/30 rounded-lg transition-colors">
            <FaGithub size={14} />
          </a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white border border-white/10 hover:border-white/30 rounded-lg transition-colors">
              <FiExternalLink size={14} />
            </a>
          )}
          {project.figma && (
            <a href={project.figma} target="_blank" rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white border border-white/10 hover:border-white/30 rounded-lg transition-colors">
              <FaFigma size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ── Modal ───────────────────────────────────────────────────── */
function Modal({ project, onClose }) {
  const closeBtn = useRef(null);
  const panel    = useRef(null);

  useEffect(() => {
    const prev = document.activeElement;
    closeBtn.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; prev?.focus(); };
  }, [onClose]);

  if (!project) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div key="backdrop"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
        role="dialog" aria-modal="true" ref={panel}>
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
        <motion.div key="panel"
          initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }} transition={{ duration: 0.25 }}
          className="relative z-10 w-full max-w-2xl bg-[#111] border border-white/[0.09] rounded-2xl overflow-hidden max-h-[92vh] flex flex-col"
          style={{ boxShadow: `0 0 60px ${project.accent}20` }}>
          {project.isMobile ? (
            <div className="relative flex items-center justify-center py-10 flex-shrink-0"
              style={{ background: `linear-gradient(135deg, #0a0a0a, ${project.accent}15)` }}>
              <PhoneFrame img={project.popupImg || project.cardImg} alt={project.title} />
              <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: project.accent }} />
              <button ref={closeBtn} onClick={onClose}
                className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors">
                <FiX size={16} />
              </button>
            </div>
          ) : (
            <div className="relative h-52 md:h-60 flex-shrink-0">
              <img src={project.popupImg || project.cardImg} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111]/90 via-[#111]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: project.accent }} />
              <button ref={closeBtn} onClick={onClose}
                className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors">
                <FiX size={16} />
              </button>
            </div>
          )}
          <div className="overflow-y-auto flex-1 p-6 md:p-8">
            <p className="font-mono text-xs tracking-wider mb-1" style={{ color: project.accent }}>{project.tagline}</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{project.title}</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">{project.description}</p>
            <div className="mb-5">
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Key highlights</h3>
              <ul className="space-y-2">
                {project.highlights.map(h => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-gray-400">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: project.accent }} />{h}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Tech stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span key={t} className="text-xs font-medium text-gray-300 bg-white/[0.06] border border-white/10 px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white text-sm font-medium rounded-lg transition-colors">
                <FaGithub size={15} /> View on GitHub
              </a>
              {project.figma && (
                <a href={project.figma} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white text-sm font-medium rounded-lg transition-colors">
                  <FaFigma size={15} /> View UI Flow
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-lg transition-colors"
                  style={{ background: project.accent }}>
                  <FiExternalLink size={15} /> Live demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*  Main JarvisPage                                                */
/* ═══════════════════════════════════════════════════════════════ */
export default function JarvisPage() {
  const [pulse, setPulse]     = useState(0);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'J.A.R.V.I.S — Hass.Dev';
    return () => { document.title = 'Hass.Dev'; };
  }, []);

  useEffect(() => {
    const t = setInterval(() => setPulse(p => (p + 1) % 3), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: 'Inter, sans-serif' }}>

      <style>{`
        @keyframes jSpin  { from{transform:rotate(0deg)}   to{transform:rotate(360deg)}  }
        @keyframes jSpinR { from{transform:rotate(360deg)} to{transform:rotate(0deg)}    }
        @keyframes jPulse { 0%,100%{opacity:.12;transform:scale(1)} 50%{opacity:.35;transform:scale(1.05)} }
        @keyframes jScan  { 0%{top:0%;opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{top:100%;opacity:0} }
        @keyframes jFloat { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-12px)} }
        .jr1{animation:jSpin  8s linear infinite}
        .jr2{animation:jSpinR 12s linear infinite}
        .jr3{animation:jSpin  5s linear infinite}
        .jp {animation:jPulse 3s ease-in-out infinite}
        .js {animation:jScan  4s ease-in-out infinite}
        .jf {animation:jFloat 6s ease-in-out infinite}
      `}</style>

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 py-4"
        style={{ background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium group">
          <FiArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Portfolio
        </Link>
        <div className="font-black text-white text-lg tracking-tight">
          <span style={{ color: '#ff2a2a' }}>H</span>ass.Dev
        </div>
        <a href="https://github.com/IT24101654/J.A.R.V.I.S" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-medium text-gray-300 hover:text-white border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-lg transition-colors">
          <FaGithub size={14} /> GitHub
        </a>
      </nav>

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden>
          <span className="font-black text-white uppercase whitespace-nowrap"
            style={{ fontSize: '18vw', opacity: 0.025, letterSpacing: '0.08em' }}>J.A.R.V.I.S</span>
        </div>
        <div className="absolute top-1/2 left-[35%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none" aria-hidden
          style={{ background: 'radial-gradient(circle, rgba(255,42,42,0.09) 0%, transparent 70%)' }} />

        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* HUD orb */}
            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }} className="relative flex items-center justify-center jf" style={{ minHeight: 380 }}>
              {[380, 300, 220].map((sz, i) => (
                <div key={i} className={`absolute rounded-full ${i === 0 ? 'jr1' : i === 1 ? 'jr2' : 'jr3'}`}
                  style={{ width: sz, height: sz, border: `1px solid rgba(255,42,42,${0.15 - i * 0.04})`, borderTop: `2px solid rgba(255,42,42,${0.55 - i * 0.12})` }} />
              ))}
              {[440, 380, 300].map((sz, i) => (
                <div key={`p${i}`} className="jp absolute rounded-full"
                  style={{ width: sz, height: sz, border: '1px solid rgba(255,42,42,0.06)', animationDelay: `${i}s` }} />
              ))}
              <div className="relative z-10 w-48 h-48 rounded-full overflow-hidden border-2 border-[#ff2a2a]/50 shadow-[0_0_100px_rgba(255,42,42,0.45)]">
                <img src={jarvisImg} alt="J.A.R.V.I.S" className="w-full h-full object-cover" />
                <div className="js absolute left-0 w-full h-[2px]"
                  style={{ background: 'linear-gradient(90deg,transparent,rgba(255,42,42,0.7),transparent)' }} />
              </div>
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="absolute"
                  style={{ width: 2, height: i % 3 === 0 ? 16 : 8, background: i % 3 === 0 ? 'rgba(255,42,42,0.55)' : 'rgba(255,42,42,0.2)', top: '50%', left: '50%', transformOrigin: '1px 215px', transform: `translateX(-1px) translateY(-215px) rotate(${i * 30}deg) translateY(-100%)` }} />
              ))}
              <div className="absolute top-4 right-2 flex flex-col gap-2">
                {['ONLINE', 'READY', 'ACTIVE'].map((s, i) => (
                  <motion.div key={s} animate={{ opacity: pulse === i ? 1 : 0.28 }} transition={{ duration: 0.4 }}
                    className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest" style={{ color: '#ff2a2a' }}>
                    <div className="w-1.5 h-1.5 rounded-full"
                      style={{ background: '#ff2a2a', boxShadow: pulse === i ? '0 0 8px #ff2a2a' : 'none' }} />{s}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Info */}
            <div className="flex flex-col gap-6">
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.15 }}>
                <span className="text-[#ff2a2a] font-mono text-sm tracking-wider">Featured Project</span>
                <h1 className="font-black text-white tracking-tight leading-none mt-2"
                  style={{ fontSize: 'clamp(2.8rem,6.5vw,6.5rem)' }}>J.A.R.V.I.S</h1>
                <p className="text-gray-500 font-mono text-xs mt-2 tracking-[0.2em] uppercase">Just A Rather Very Intelligent System</p>
              </motion.div>
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
                className="text-gray-300 text-base sm:text-lg leading-relaxed">
                An <strong className="text-white">Iron Man–inspired AI desktop assistant</strong> built with Python.
                Speak a command and JARVIS listens, understands, and acts — opening apps, fetching weather, answering questions.
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
                className="text-gray-500 text-sm leading-relaxed">
                A self-learning exploration into AI/ML and Python scripting — where voice interfaces meet real-world APIs.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap gap-3">
                <a href="https://github.com/IT24101654/J.A.R.V.I.S" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold text-sm rounded-xl transition-all duration-200 hover:scale-105"
                  style={{ background: 'linear-gradient(135deg,#ff2a2a,#cc1a1a)', boxShadow: '0 0 24px rgba(255,42,42,0.35)' }}>
                  <FaGithub size={16} /> View on GitHub
                </a>
                <Link to="/#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 text-gray-300 hover:text-white font-medium text-sm rounded-xl border border-white/10 hover:border-white/25 transition-colors">
                  All Projects <FiArrowRight size={14} />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ FEATURES ══════════════════ */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <motion.div {...fadeUp()} className="mb-12 text-center">
            <span className="text-[#ff2a2a] font-mono text-sm tracking-wider">Capabilities</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">What JARVIS Can Do</h2>
            <p className="text-gray-500 text-sm mt-3 max-w-xl mx-auto">Built with a modular plugin architecture — each capability is a self-contained Python module.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.title} {...fadeUp(i * 0.08)}
                  className="group flex gap-4 p-5 sm:p-6 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                  whileHover={{ borderColor: `${f.color}35`, boxShadow: `0 0 24px ${f.color}12`, y: -4 }}>
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}>
                    <Icon size={18} style={{ color: f.color }} />
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-semibold mb-1">{f.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════ TECH STACK ══════════════════ */}
      <section className="relative py-16 sm:py-24"
        style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(255,42,42,0.04) 50%, transparent 100%)' }}>
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <motion.div {...fadeUp()} className="mb-12 text-center">
            <span className="text-[#ff2a2a] font-mono text-sm tracking-wider">Stack</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">Tech Stack</h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {TECH_DETAILS.map((t, i) => (
              <motion.div key={t.name} {...fadeUp(i * 0.06)}
                className="flex flex-col items-center text-center p-4 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                whileHover={{ borderColor: 'rgba(255,42,42,0.3)', boxShadow: '0 0 20px rgba(255,42,42,0.1)', y: -4 }}>
                <div className="w-10 h-10 rounded-xl bg-[#ff2a2a]/10 border border-[#ff2a2a]/20 flex items-center justify-center mb-3">
                  <FiTerminal size={16} style={{ color: '#ff2a2a' }} />
                </div>
                <p className="text-white text-xs font-semibold mb-0.5">{t.name}</p>
                <p className="text-gray-600 text-[10px]">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ OTHER PROJECTS ══════════════════ */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div {...fadeUp()} className="mb-10">
            <span className="text-[#ff2a2a] font-mono text-sm tracking-wider">More Work</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">Other Projects</h2>
            <p className="text-gray-500 text-sm mt-2">More things I've built — from full-stack web apps to machine learning experiments.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {RELATED.map((p, i) => (
              <RelatedCard key={p.id} project={p} onOpen={setSelected} index={i} />
            ))}
          </div>
          <motion.div {...fadeUp(0.3)} className="mt-12 text-center">
            <Link to="/#projects"
              className="inline-flex items-center gap-2 px-8 py-3 text-white font-semibold text-sm rounded-xl border border-white/15 hover:border-[#ff2a2a]/40 hover:text-[#ff2a2a] transition-colors">
              View All Projects <FiArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <div className="py-8 text-center border-t border-white/[0.06]">
        <p className="text-gray-600 text-xs">
          © 2025 Yasith Hasarinda · <Link to="/" className="text-[#ff2a2a] hover:underline">Hass.Dev</Link>
        </p>
      </div>

      {selected && <Modal project={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
