import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaFigma } from 'react-icons/fa';
import { FiExternalLink, FiX, FiArrowRight, FiGlobe, FiSmartphone, FiGrid, FiCpu } from 'react-icons/fi';

/* ── Asset imports ─────────────────────────────────────────────── */
import hassDevC from '../assets/Hass.dev Portfolio-card.png';
import hassDevP from '../assets/Hass.dev Portfolio-popup.png';
import parkifyC from '../assets/Parkify Website-card.png';
import parkifyP from '../assets/Parkify Website-popup.png';
import jarvisC from '../assets/JARVIS-card.jpg';
import jarvisP from '../assets/JARVIS.png';
import parkifyWC from '../assets/Parkify Mobile App-card.PNG';
import artC from '../assets/Living Art Gallery-card.png';
import artP from '../assets/Living Art Gallery-popup.png';
import schoolC from '../assets/NeoSchool-card.png';
import schoolP from '../assets/NeoSchool-popup.jpeg';
import ecoP from '../assets/EcoLeaf-popup.png';

/* ── Project data ──────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 1,
    category: 'website',
    title: 'Hass.dev Portfolio',
    tagline: 'Personal portfolio with 3D web experience',
    description: "My own portfolio site — the one you're looking at right now. Designed in Figma, built with React, Tailwind CSS, and a Spline 3D scene for the hero. The main challenge was keeping the 3D element performant while keeping the page fully accessible and mobile-responsive.",
    highlights: ['Lazy-loaded 3D scene with static fallback', 'Fully keyboard-accessible with focus management', 'Framer Motion scroll animations', 'Formspree contact form integration'],
    cardImg: hassDevC, popupImg: hassDevP,
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Spline'],
    github: 'https://github.com/IT24101654/Hass.dev',
    live: 'https://main.d1vv087i13in11.amplifyapp.com',
    accent: '#ec4899',
  },
  {
    id: 2,
    category: 'website',
    title: 'Parkify — Web',
    tagline: 'Smart parking management platform',
    description: 'A full-stack web app that lets drivers find, view, and book parking spots on an interactive Google Maps interface. Parking space owners get a dashboard to manage listings; admins oversee the whole platform. Built with the MERN stack and deployed on Render.',
    notice: 'Figma prototype may have glitches. Please start from the "Main Interface" screen. For the full experience, use the Live Website and register as a Driver/Parking Owner.',
    highlights: ['Google Maps integration with real-time availability', 'JWT authentication for three user roles', 'Owner dashboard with booking analytics', 'REST API consumed by both web and mobile clients'],
    cardImg: parkifyC, popupImg: parkifyP,
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Google Maps API', 'JWT'],
    github: 'https://github.com/IT24101654/Parkify---Parking-Management-System',
    live: 'https://parkify-frontend.onrender.com',
    figma: 'https://www.figma.com/design/MCInBg3XbLly5cgiezr8nS/Parkify-UI-Flow?node-id=25-147&t=3mSLBFmVPXkfaA9u-1',
    accent: '#3b82f6',
  },
  {
    id: 3,
    category: 'mobile',
    title: 'Parkify — Mobile',
    tagline: 'React Native parking app for iOS & Android',
    description: 'The mobile companion to Parkify Web. Drivers search for nearby parking, view real-time availability, and book a spot from their phone. The React Native Expo frontend talks to the same Node.js/MongoDB backend API, keeping data consistent across both platforms.',
    highlights: ['Cross-platform: iOS and Android via Expo', 'Shared backend API with the web platform', 'Location-based search and filtering', 'Booking confirmation with push notification support'],
    cardImg: parkifyWC, popupImg: parkifyWC,
    tech: ['React Native', 'Expo', 'Node.js', 'MongoDB', 'REST API'],
    github: 'https://github.com/IT24101654/Parkify-Frontend',
    live: null,
    accent: '#f97316',
  },
  {
    id: 4,
    category: 'other',
    title: 'J.A.R.V.I.S Assistant',
    tagline: 'Voice-controlled AI desktop assistant',
    description: "An Iron Man-inspired AI assistant for the desktop. You speak a command, it listens via Python's SpeechRecognition, parses intent, then executes: web search, weather lookups, app launching, time checks. The first project where I felt the real power of combining APIs with voice interfaces.",
    highlights: ['Speech recognition with real-time intent parsing', 'Pluggable command system — easy to extend', 'Integrates OpenWeatherMap and Wikipedia APIs', 'Text-to-speech responses with natural pacing'],
    cardImg: jarvisC, popupImg: jarvisP,
    tech: ['Python', 'SpeechRecognition', 'pyttsx3', 'OpenWeatherMap API', 'Wikipedia API'],
    github: 'https://github.com/IT24101654/J.A.R.V.I.S',
    live: null,
    page: '/jarvis',
    accent: '#06b6d4',
  },
  {
    id: 5,
    category: 'website',
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
    category: 'website',
    title: 'NeoSchool',
    tagline: 'School information management system',
    description: 'A web-based school management system handling student records, course enrolment, grade tracking, and teacher assignments. Built with MySQL, HTML, CSS, and JavaScript as an academic project — taught me relational database design and role-based access control.',
    highlights: ['Role-based access: admin, teacher, student', 'MySQL schema with normalised tables', 'CRUD for students, courses, and grades', 'Responsive admin dashboard'],
    cardImg: schoolC, popupImg: schoolP,
    tech: ['HTML', 'CSS', 'JavaScript', 'MySQL'],
    github: 'https://github.com/IT24101654/NeoSchool',
    live: null,
    accent: '#f59e0b',
  },
  {
    id: 7,
    category: 'other',
    title: 'EcoLeaf AI/ML',
    tagline: 'Plant disease detection with machine learning',
    description: 'A machine learning project that classifies plant leaf images to detect diseases. Trained a CNN on a public plant disease dataset using TensorFlow/Keras inside Jupyter notebooks. Achieved ~94% validation accuracy, covering the full ML workflow from data preprocessing to model evaluation.',
    highlights: ['~94% validation accuracy on plant disease dataset', 'CNN trained with TensorFlow and Keras', 'Data augmentation to reduce overfitting', 'Confusion matrix and precision/recall analysis'],
    cardImg: ecoP, popupImg: ecoP,
    tech: ['Python', 'TensorFlow', 'Keras', 'Jupyter', 'scikit-learn', 'Matplotlib'],
    github: 'https://github.com/IT24101654/EcoLeaf-AIML',
    live: null,
    accent: '#84cc16',
  },
];

const TABS = [
  { id: 'all', label: 'All Projects', icon: FiGrid },
  { id: 'website', label: 'Websites', icon: FiGlobe },
  { id: 'mobile', label: 'Mobile Apps', icon: FiSmartphone },
  { id: 'other', label: 'AI & Tools', icon: FiCpu },
];

/* ── Helpers ────────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
});

/* ── Phone Frame for Mobile App cards ──────────────────────────── */
function PhoneFrame({ img, alt }) {
  return (
    <div className="relative mx-auto" style={{ width: 180, height: 360 }}>
      {/* Phone shell */}
      <div className="absolute inset-0 rounded-[32px] border-[6px] border-white/20 bg-[#111] shadow-[0_0_40px_rgba(0,0,0,0.6)]" />
      {/* Side buttons */}
      <div className="absolute -right-[8px] top-[80px] w-[5px] h-[30px] rounded-r-md bg-white/10" />
      <div className="absolute -left-[8px] top-[60px] w-[5px] h-[20px] rounded-l-md bg-white/10" />
      <div className="absolute -left-[8px] top-[88px] w-[5px] h-[40px] rounded-l-md bg-white/10" />
      {/* Notch */}
      <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[60px] h-[14px] bg-black rounded-full z-10" />
      {/* Screen */}
      <div className="absolute inset-[6px] rounded-[26px] overflow-hidden bg-black">
        <img
          src={img}
          alt={alt}
          className="w-full h-full object-cover object-top"
        />
      </div>
    </div>
  );
}

/* ── Layout Helper ──────────────────────────────────────────────── */
const getGridLayout = (index) => {
  const isWideMD = (index % 3 === 2);
  const isWideXL = (index % 4 === 3);

  const mdSpan = isWideMD ? 'md:col-span-2' : 'md:col-span-1';
  const xlSpan = isWideXL ? 'xl:col-span-3' : 'xl:col-span-1';

  return {
    spanClass: `${mdSpan} ${xlSpan}`,
    isWideMD,
    isWideXL
  };
};

/* ── Project Card ───────────────────────────────────────────────── */
function Card({ project, onOpen, index, layout }) {
  const { spanClass, isWideMD, isWideXL } = layout;
  const isMobile = project.category === 'mobile';

  // Compute responsive classes cleanly to prevent 'md' styles leaking into 'xl' when layout changes
  const flexDirClass = `flex-col ${isWideMD ? 'md:flex-row' : 'md:flex-col'} ${isWideXL ? 'xl:flex-row' : 'xl:flex-col'}`;
  const imgContainerClass = `${isWideMD ? 'md:w-[45%] md:h-auto' : 'md:w-full md:h-[240px]'} ${isWideXL ? 'xl:w-[40%] xl:h-auto' : 'xl:w-full xl:h-[190px]'}`;
  const imgGradientClass = `${isWideMD ? 'md:bg-gradient-to-r md:from-transparent md:via-[#0a0a0a]/40 md:to-[#0a0a0a]' : 'md:bg-gradient-to-t md:from-[#0a0a0a] md:via-[#0a0a0a]/40 md:to-transparent'} ${isWideXL ? 'xl:bg-gradient-to-r xl:from-transparent xl:via-[#0a0a0a]/40 xl:to-[#0a0a0a]' : 'xl:bg-gradient-to-t xl:from-[#0a0a0a] xl:via-[#0a0a0a]/40 xl:to-transparent'}`;
  const phoneFrameClass = `transform scale-[0.7] origin-center transition-transform duration-300 group-hover:scale-[0.75] ${isWideMD ? 'md:mt-0' : 'mt-12'} ${isWideXL ? 'xl:mt-0' : 'xl:mt-12'}`;
  const contentPaddingClass = `p-6 md:p-8 ${isWideMD ? 'md:mt-0 md:justify-center md:pl-6' : '-mt-10 sm:-mt-12 md:-mt-12 md:pl-8'} ${isWideXL ? 'xl:mt-0 xl:justify-center xl:px-10' : 'xl:-mt-12 xl:px-8 xl:justify-start'}`;
  const titleClass = `${isWideMD ? 'md:text-3xl' : 'md:text-2xl'} ${isWideXL ? 'xl:text-3xl xl:mb-3' : 'xl:text-2xl xl:mb-2'}`;
  const descClass = `${isWideMD ? 'md:line-clamp-none md:text-base' : 'line-clamp-4 md:text-sm'} ${isWideXL ? 'xl:line-clamp-5 xl:text-base xl:mb-6' : 'xl:line-clamp-4 xl:text-sm xl:mb-6'}`;

  return (
    <motion.article
      {...fadeUp(index * 0.05)}
      className={`group relative rounded-[2rem] overflow-hidden flex ${flexDirClass} bg-[#0a0a0a] border border-white/[0.04] hover:border-white/[0.09] transition-[border-color,transform,box-shadow] duration-300 ${spanClass}`}
      style={{
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.02), 0 10px 40px -10px rgba(0,0,0,0.5)',
        contain: 'layout',
        willChange: 'transform',
      }}
      whileHover={{ y: -3 }}
    >
      {/* Dynamic gradient background on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${project.accent}10, transparent 70%)`
        }}
      />

      {/* Image Container */}
      <div className={`relative flex-shrink-0 bg-[#000] flex items-center justify-center overflow-hidden w-full aspect-[4/3] sm:aspect-auto sm:h-[260px] ${imgContainerClass}`}>
        {isMobile ? (
          <>
            <div className="absolute inset-0 opacity-50" style={{ background: `radial-gradient(circle at 50% 50%, ${project.accent}30, transparent 70%)` }} />
            <div className={phoneFrameClass}>
              <PhoneFrame img={project.cardImg} alt={project.title} />
            </div>
          </>
        ) : (
          <>
            <img
              src={project.cardImg}
              alt={`${project.title} screenshot`}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className={`absolute inset-0 opacity-90 transition-opacity duration-500 group-hover:opacity-70 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent ${imgGradientClass}`} aria-hidden="true" />
          </>
        )}
      </div>

      {/* Content */}
      <div className={`relative flex flex-col flex-1 z-10 ${contentPaddingClass}`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="w-2 h-2 rounded-full shadow-lg" style={{ backgroundColor: project.accent, boxShadow: `0 0 12px ${project.accent}` }} />
          <p className="font-mono text-[10px] sm:text-xs tracking-widest text-gray-400 uppercase">
            {project.category}
          </p>
        </div>

        <h3 className={`text-white font-bold text-xl sm:text-2xl mb-2 flex items-center gap-3 ${titleClass}`}>
          {project.title}
        </h3>

        <p className={`text-gray-400 text-sm leading-relaxed mb-6 font-light ${descClass}`}>
          {project.description}
        </p>

        {/* Footer: Tech & Actions */}
        <div className="flex flex-col gap-4 mt-auto pt-4 border-t border-white/[0.05]">
          {/* Tech Stack Layer */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="text-[10px] sm:text-xs font-medium text-gray-300 bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>

          {/* Links & Actions Layer */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2 flex-shrink-0">
              {project.github && (
                <a
                  href={project.github} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-white/[0.02] border border-white/[0.05] text-white hover:bg-white/[0.1] hover:border-white/[0.2] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="View on GitHub"
                  title="GitHub Repository"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaGithub size={16} />
                </a>
              )}
              {project.figma && (
                <a
                  href={project.figma} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-white/[0.02] border border-white/[0.05] text-[#A259FF] hover:bg-[#A259FF]/10 hover:border-[#A259FF]/30 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A259FF]"
                  aria-label="View Figma Design"
                  title="Figma Design"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaFigma size={16} />
                </a>
              )}
              {project.live && (
                <a
                  href={project.live} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.1] hover:border-white/[0.2] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2"
                  style={{ color: project.accent }}
                  aria-label="Open live demo"
                  title="Live Demo"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FiExternalLink size={16} />
                </a>
              )}
            </div>

            <button
              onClick={() => onOpen(project)}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/[0.03] border border-white/[0.08] hover:bg-white hover:text-black transition-all duration-300 text-white group-hover:scale-110 ml-auto"
              aria-label="View project details"
            >
              <FiArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Modal ──────────────────────────────────────────────────────── */
function Modal({ project, onClose }) {
  const closeBtn = useRef(null);
  const panel = useRef(null);
  const isMobile = project.category === 'mobile';

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
          style={{ boxShadow: `0 0 60px ${project.accent}20` }}
        >
          {/* Header image / phone */}
          {isMobile ? (
            <div className="relative flex items-center justify-center py-4 md:py-6 flex-shrink-0" style={{ background: `linear-gradient(135deg, #0a0a0a, ${project.accent}15)` }}>
              <div className="transform scale-[0.6] sm:scale-[0.65] origin-center -my-14 sm:-my-12">
                <PhoneFrame img={project.popupImg || project.cardImg} alt={project.title} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: project.accent }} />
              <button
                ref={closeBtn} onClick={onClose}
                className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white z-10"
                aria-label="Close dialog"
              >
                <FiX size={16} />
              </button>
            </div>
          ) : (
            <div className="relative h-32 sm:h-40 md:h-48 flex-shrink-0">
              <img
                src={project.popupImg || project.cardImg}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111]/90 via-[#111]/20 to-transparent" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: project.accent }} aria-hidden="true" />
              <button
                ref={closeBtn} onClick={onClose}
                className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white z-10"
                aria-label="Close dialog"
              >
                <FiX size={16} />
              </button>
            </div>
          )}

          {/* Scrollable content */}
          <div className="overflow-y-auto flex-1 p-4 sm:p-5 md:p-6">
            <p className="font-mono text-[13px] tracking-wider mb-1" style={{ color: project.accent }}>
              {project.tagline}
            </p>
            <h2 id="modal-title" className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">
              {project.title}
            </h2>
            <p className="text-gray-400 text-xs sm:text-[13px] leading-relaxed mb-4 md:mb-5">
              {project.description}
            </p>

            {/* Split Layout: Highlights & Links */}
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 mb-5 md:mb-6">
              {/* Highlights (Left Side) */}
              <div className="flex-1">
                <h3 className="text-[10px] sm:text-xs font-semibold text-white uppercase tracking-wider mb-2">Key highlights</h3>
                <ul className="space-y-1.5">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs sm:text-[13px] text-gray-400">
                      <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: project.accent }} aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Links (Right Side) */}
              <div className="sm:w-44 flex-shrink-0 flex flex-col gap-2">
                <h3 className="hidden sm:block text-[10px] sm:text-xs font-semibold text-white uppercase tracking-wider mb-0 sm:mb-2">Links</h3>
                {project.github && (
                  <a
                    href={project.github} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 sm:py-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-white text-xs font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2a2a] w-full"
                  >
                    <FaGithub size={13} /> View on GitHub
                  </a>
                )}
                {project.figma && (
                  <a
                    href={project.figma} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 sm:py-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-white text-xs font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2a2a] w-full"
                  >
                    <FaFigma size={13} /> View UI Flow
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 sm:py-2 text-white text-xs font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2a2a] w-full"
                    style={{ background: project.accent }}
                  >
                    <FiExternalLink size={13} /> Live demo
                  </a>
                )}
              </div>
            </div>

            {/* Tech stack */}
            <div className="mb-2">
              <h3 className="text-[10px] sm:text-xs font-semibold text-white uppercase tracking-wider mb-2">Tech stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="text-[11px] sm:text-[12px] font-medium text-gray-300 bg-white/[0.06] border border-white/10 px-2.5 sm:px-3 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Notice (if any) */}
            {project.notice && (
              <div className="mt-3 md:mt-4 bg-orange-500/10 border border-orange-500/20 rounded-lg p-2 sm:p-3">
                <div className="flex items-start gap-2">
                  <span className="text-orange-500 text-sm mt-0.5" aria-hidden="true">⚠️</span>
                  <p className="text-orange-400 text-[11px] sm:text-xs leading-relaxed">
                    <strong className="text-orange-500 font-semibold">Note:</strong> {project.notice}
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

/* ── Section ────────────────────────────────────────────────────── */
export default function Projects() {
  const [activeTab, setActiveTab] = useState('all');
  const [selected, setSelected] = useState(null);
  const open = useCallback((p) => setSelected(p), []);
  const close = useCallback(() => setSelected(null), []);

  const filtered = activeTab === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === activeTab);

  return (
    <section
      id="projects"
      className="has-noise relative z-10 h-full flex flex-col pt-16 sm:pt-24 overflow-hidden"
    >
      {/* ── HUGE BACKGROUND TEXT (Commented out per user request) ── */}
      {/* 
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 left-0 whitespace-nowrap"
          style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(25rem, 35vw, 65rem)',
            fontWeight: 900,
            lineHeight: 0.8,
            letterSpacing: '15px',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 85%)',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 65%)',
            background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'3\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.01\'/%3E%3C/svg%3E"), rgba(255, 255, 255, 0.04)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            transform: 'translate(-5%, -10%)',
          }}
        >
          MY
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute bottom-0 right-0 whitespace-nowrap"
          style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(25rem, 35vw, 65rem)',
            fontWeight: 900,
            lineHeight: 0.8,
            letterSpacing: '15px',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 35%)',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 65%)',
            background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'3\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.01\'/%3E%3C/svg%3E"), rgba(255, 255, 255, 0.04)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            transform: 'translate(5%, 10%)',
          }}
        >
          WORK
        </motion.div>
      </div>
      */}

      <div className="max-w-[1500px] mx-auto px-3 sm:px-8 lg:px-14 flex flex-col flex-1 min-h-0 w-full pb-4 sm:pb-6 relative z-10">

        {/* Heading */}
        <motion.div {...fadeUp()} className="mb-4 sm:mb-5 flex-shrink-0">
          <h2 className="font-black text-white uppercase leading-none tracking-tight mt-1"
            style={{ fontSize: 'clamp(2.5rem,3.5vw,5rem)', lineHeight: 0.88 }}>Things I've Built</h2>
        </motion.div>

        {/* Tabs */}
        <motion.div {...fadeUp(0.1)} className="flex items-center gap-1 sm:gap-2 mb-5 sm:mb-7 flex-shrink-0">
          <div className="flex items-center bg-white/[0.04] border border-white/[0.08] rounded-[10px] sm:rounded-xl p-0.5 sm:p-1 gap-0.5 sm:gap-1">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-[8px] sm:rounded-lg text-[11px] sm:text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2a2a]"
                  style={{
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.45)',
                    background: isActive ? 'rgba(255,42,42,0.15)' : 'transparent',
                    borderColor: isActive ? 'rgba(255,42,42,0.3)' : 'transparent',
                    border: isActive ? '1px solid rgba(255,42,42,0.3)' : '1px solid transparent',
                  }}
                >
                  <Icon className="w-3 h-3 sm:w-[13px] sm:h-[13px]" aria-hidden="true" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="inline sm:hidden">{tab.id === 'all' ? 'All' : tab.id === 'website' ? 'Web' : 'Apps'}</span>
                  {isActive && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute inset-0 rounded-[8px] sm:rounded-lg"
                      style={{ background: 'rgba(255,42,42,0.08)' }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
          <span className="text-gray-600 text-[10px] sm:text-xs font-mono ml-1 sm:ml-2">
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          </span>
        </motion.div>

        {/* Scrollable card grid */}
        <div
          className="projects-grid-scroll flex-1 min-h-0 pb-4 pr-1"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#ff2a2a transparent',
            willChange: 'scroll-position',
            overflowAnchor: 'none',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 grid-flow-row-dense"
            >
              {filtered.map((p, i) => (
                <Card key={p.id} project={p} onOpen={open} index={i} layout={getGridLayout(i)} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {selected && <Modal project={selected} onClose={close} />}
    </section>
  );
}
