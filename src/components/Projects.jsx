import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink, FiX, FiArrowRight } from 'react-icons/fi';

/* ── Asset imports ─────────────────────────────────────────────── */
import hassDevC from '../assets/Hass.dev Portfolio-card.png';
import hassDevP from '../assets/Hass.dev Portfolio-popup.png';
import parkifyC from '../assets/Parkify Website-card.png';
import parkifyP from '../assets/Parkify Website-popup.png';
import jarvisC from '../assets/JARVIS-card.jpg';
import jarvisP from '../assets/JARVIS.png';
import parkifyWC from '../assets/Parkify Mobile App-card.PNG';
import parkifyWP from '../assets/Parkify Mobile App-popup.PNG';
import artC from '../assets/Living Art Gallery-card.png';
import artP from '../assets/Living Art Gallery-popup.png';
import schoolC from '../assets/NeoSchool-card.png';
import schoolP from '../assets/NeoSchool-popup.jpeg';
import ecoC from '../assets/EcoLeaf-card.png';
import ecoP from '../assets/EcoLeaf-popup.png';

/* ── Project data ──────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 1,
    title: 'Hass.dev Portfolio',
    tagline: 'Personal portfolio with 3D web experience',
    description: "My own portfolio site — the one you're looking at right now. Designed in Figma, built with React, Tailwind CSS, and a Spline 3D scene for the hero. The main challenge was keeping the 3D element performant while keeping the page fully accessible and mobile-responsive.",
    highlights: ['Lazy-loaded 3D scene with static fallback', 'Fully keyboard-accessible with focus management', 'Framer Motion scroll animations', 'Formspree contact form integration'],
    cardImg: hassDevC, popupImg: hassDevP,
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Spline'],
    github: 'https://github.com/IT24101654/Hass.dev',
    live: null,
    accent: '#ec4899',
  },
  {
    id: 2,
    title: 'Parkify — Web',
    tagline: 'Smart parking management platform',
    description: 'A full-stack web app that lets drivers find, view, and book parking spots on an interactive Google Maps interface. Parking space owners get a dashboard to manage listings; admins oversee the whole platform. Built with the MERN stack and deployed on Render.',
    highlights: ['Google Maps integration with real-time availability', 'JWT authentication for three user roles', 'Owner dashboard with booking analytics', 'REST API consumed by both web and mobile clients'],
    cardImg: parkifyC, popupImg: parkifyP,
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Google Maps API', 'JWT'],
    github: 'https://github.com/IT24101654/Parkify---Parking-Management-System',
    live: 'https://parkify-frontend.onrender.com',
    accent: '#3b82f6',
  },
  {
    id: 3,
    title: 'Parkify — Mobile',
    tagline: 'React Native parking app for iOS and Android',
    description: 'The mobile companion to Parkify Web. Drivers search for nearby parking, view real-time availability, and book a spot from their phone. The React Native Expo frontend talks to the same Node.js/MongoDB backend API, keeping data consistent across both platforms.',
    highlights: ['Cross-platform: iOS and Android via Expo', 'Shared backend API with the web platform', 'Location-based search and filtering', 'Booking confirmation with push notification support'],
    cardImg: parkifyWC, popupImg: parkifyWP,
    tech: ['React Native', 'Expo', 'Node.js', 'MongoDB', 'REST API'],
    github: 'https://github.com/IT24101654/Parkify-Frontend',
    live: null,
    accent: '#f97316',
  },
  {
    id: 4,
    title: 'J.A.R.V.I.S Assistant',
    tagline: 'Voice-controlled AI desktop assistant',
    description: "An Iron Man-inspired AI assistant for the desktop. You speak a command, it listens via Python's SpeechRecognition, parses intent, then executes: web search, weather lookups, app launching, time checks. The first project where I felt the real power of combining APIs with voice interfaces.",
    highlights: ['Speech recognition with real-time intent parsing', 'Pluggable command system — easy to extend', 'Integrates OpenWeatherMap and Wikipedia APIs', 'Text-to-speech responses with natural pacing'],
    cardImg: jarvisC, popupImg: jarvisP,
    tech: ['Python', 'SpeechRecognition', 'pyttsx3', 'OpenWeatherMap API', 'Wikipedia API'],
    github: 'https://github.com/IT24101654/J.A.R.V.I.S',
    live: null,
    accent: '#ff2a2a',
  },
  {
    id: 5,
    title: 'Living Art Gallery',
    tagline: 'Online gallery for hand-drawn pencil portraits',
    description: 'A clean gallery site showcasing my pencil portrait work. Built with vanilla HTML, CSS, and JavaScript — no frameworks — for full layout control and minimal load times on image-heavy pages. Portraits open in a custom lightbox.',
    highlights: ['Custom CSS grid masonry layout', 'Zero-dependency lightbox in ~80 lines of JS', 'Optimised image loading with lazy attribute', 'Mobile-first responsive design'],
    cardImg: artC, popupImg: artP,
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/IT24101654/Living-Art-by-Hasarinda',
    live: null,
    accent: '#10b981',
  },
  {
    id: 6,
    title: 'NeoSchool',
    tagline: 'School information management system',
    description: 'A web-based school management system handling student records, course enrolment, grade tracking, and teacher assignments. Built with PHP, MySQL, HTML, CSS, and JavaScript as an academic project — taught me relational database design and role-based access control.',
    highlights: ['Role-based access: admin, teacher, student', 'MySQL schema with normalised tables', 'CRUD for students, courses, and grades', 'Responsive admin dashboard'],
    cardImg: schoolC, popupImg: schoolP,
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    github: 'https://github.com/IT24101654/NeoSchool',
    live: null,
    accent: '#f59e0b',
  },
  {
    id: 7,
    title: 'EcoLeaf AI/ML',
    tagline: 'Plant disease detection with machine learning',
    description: 'A machine learning project that classifies plant leaf images to detect diseases. Trained a CNN on a public plant disease dataset using TensorFlow/Keras inside Jupyter notebooks. Achieved ~94% validation accuracy, covering the full ML workflow from data preprocessing to model evaluation.',
    highlights: ['~94% validation accuracy on plant disease dataset', 'CNN trained with TensorFlow and Keras', 'Data augmentation to reduce overfitting', 'Confusion matrix and precision/recall analysis'],
    cardImg: ecoC, popupImg: ecoP,
    tech: ['Python', 'TensorFlow', 'Keras', 'Jupyter', 'scikit-learn', 'Matplotlib'],
    github: 'https://github.com/IT24101654/EcoLeaf-AIML',
    live: null,
    accent: '#84cc16',
  },
];

/* ── Helpers ────────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: 'easeOut' },
});

/* ── Project Card ───────────────────────────────────────────────── */
function Card({ project, onOpen, index }) {
  return (
    <motion.article
      {...fadeUp(index * 0.05)}
      className="group relative bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/[0.13] transition-colors duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-44 sm:h-48 md:h-52 overflow-hidden flex-shrink-0">
        <img
          src={project.cardImg}
          alt={`${project.title} screenshot`}
          loading="lazy"
          width={600} height={400}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: project.accent, opacity: 0.7 }} aria-hidden="true" />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 md:p-6">
        <p className="font-mono text-[10px] sm:text-xs tracking-wider mb-1" style={{ color: project.accent }}>
          {project.tagline}
        </p>
        <h3 className="text-white font-semibold text-base sm:text-lg mb-2">{project.title}</h3>
        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} className="text-[10px] sm:text-xs font-medium text-gray-400 bg-white/[0.05] border border-white/[0.08] px-2 py-0.5 rounded-full">
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="text-[10px] sm:text-xs text-gray-500 px-1.5 py-0.5">
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpen(project)}
            className="flex-1 flex items-center justify-center gap-1.5 text-xs sm:text-sm font-medium text-white border border-white/20 hover:border-white/40 rounded-lg py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2a2a]"
          >
            Details <FiArrowRight size={13} aria-hidden="true" />
          </button>
          <a
            href={project.github}
            target="_blank" rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-white border border-white/10 hover:border-white/30 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2a2a]"
            aria-label={`View ${project.title} on GitHub`}
          >
            <FaGithub size={15} />
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank" rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white border border-white/10 hover:border-white/30 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2a2a]"
              aria-label={`Open ${project.title} live demo`}
            >
              <FiExternalLink size={15} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ── Modal ──────────────────────────────────────────────────────── */
function Modal({ project, onClose }) {
  const closeBtn = useRef(null);
  const panel = useRef(null);

  useEffect(() => {
    const prev = document.activeElement;
    closeBtn.current?.focus();
    document.body.style.overflow = 'hidden';

    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab') return;
      const focusable = panel.current?.querySelectorAll(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable?.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prev?.focus();
    };
  }, [onClose]);

  if (!project) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 md:p-8"
        role="dialog" aria-modal="true" aria-labelledby="modal-title"
        ref={panel}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

        {/* Panel */}
        <motion.div
          key="modal-panel"
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-lg md:max-w-2xl bg-[#111] border border-white/[0.09] rounded-2xl overflow-hidden max-h-[92vh] flex flex-col"
        >
          {/* Header image */}
          <div className="relative h-44 sm:h-52 md:h-60 flex-shrink-0">
            <img
              src={project.popupImg || project.cardImg}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111]/90 via-[#111]/20 to-transparent" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: project.accent }} aria-hidden="true" />
            <button
              ref={closeBtn} onClick={onClose}
              className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close dialog"
            >
              <FiX size={16} />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto flex-1 p-5 sm:p-6 md:p-8">
            <p className="font-mono text-[10px] sm:text-xs tracking-wider mb-1" style={{ color: project.accent }}>
              {project.tagline}
            </p>
            <h2 id="modal-title" className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">
              {project.title}
            </h2>
            <p className="text-gray-400 text-sm sm:text-[15px] leading-relaxed mb-5 md:mb-6">
              {project.description}
            </p>

            {/* Highlights */}
            <div className="mb-5 md:mb-6">
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Key highlights</h3>
              <ul className="space-y-2">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-400">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: project.accent }} aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech stack */}
            <div className="mb-6 md:mb-8">
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Tech stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="text-[11px] sm:text-xs font-medium text-gray-300 bg-white/[0.06] border border-white/10 px-2.5 sm:px-3 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              <a
                href={project.github} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2a2a]"
              >
                <FaGithub size={15} /> View on GitHub
              </a>
              {project.live && (
                <a
                  href={project.live} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2a2a]"
                  style={{ background: project.accent }}
                >
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

/* ── Section ────────────────────────────────────────────────────── */
export default function Projects() {
  const [selected, setSelected] = useState(null);
  const open = useCallback((p) => setSelected(p), []);
  const close = useCallback(() => setSelected(null), []);

  return (
    <section
      id="projects"
      className="relative z-10 h-screen flex flex-col pt-24"
    >
      {/* flex-1 min-h-0 — correctly fills remaining height inside a flex-col parent */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-14 flex flex-col flex-1 min-h-0 w-full">

        {/* Heading — pinned, never scrolls */}
        <motion.div {...fadeUp()} className="mb-5 md:mb-7 flex-shrink-0">
          <p className="font-mono text-[#ff2a2a] text-xs sm:text-sm tracking-[0.15em] uppercase mb-2">
            02 — Projects
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Things I've built</h2>
        </motion.div>

        {/* Scrollable card grid — takes all remaining space */}
        <div
          className="overflow-y-auto flex-1 min-h-0 pb-6 pr-1"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#ff2a2a transparent' }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {PROJECTS.map((p, i) => (
              <Card key={p.id} project={p} onOpen={open} index={i} />
            ))}
          </div>
        </div>

      </div>

      {selected && <Modal project={selected} onClose={close} />}
    </section>
  );
}
