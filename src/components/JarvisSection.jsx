import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { FiMic, FiZap, FiCloud, FiCpu, FiArrowRight } from 'react-icons/fi';
import jarvisImg from '../assets/JARVIS.png';

const FEATURES = [
  { icon: FiMic, title: 'Voice Recognition', desc: 'Listens to natural speech commands via Python SpeechRecognition — real-time.', color: '#ff2a2a' },
  { icon: FiZap, title: 'Intent Parsing', desc: 'Pluggable command system — custom actions with just a few lines of code.', color: '#f97316' },
  { icon: FiCloud, title: 'API Integrations', desc: 'Live weather from OpenWeatherMap, knowledge from Wikipedia, and more.', color: '#3b82f6' },
  { icon: FiCpu, title: 'Text-to-Speech', desc: 'Natural, paced spoken responses via pyttsx3 — truly conversational.', color: '#10b981' },
];

const TECH = ['Python', 'SpeechRecognition', 'pyttsx3', 'OpenWeatherMap API', 'Wikipedia API'];

export default function JarvisSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setInterval(() => setPulse(p => (p + 1) % 3), 2000);
    return () => clearInterval(t);
  }, [visible]);

  return (
    <>
      <style>{`
        @keyframes jSpin  { from{transform:rotate(0deg)}   to{transform:rotate(360deg)}  }
        @keyframes jSpinR { from{transform:rotate(360deg)} to{transform:rotate(0deg)}    }
        @keyframes jPulse { 0%,100%{opacity:.12;transform:scale(1)} 50%{opacity:.35;transform:scale(1.05)} }
        @keyframes jScan  { 0%{top:0%;opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{top:100%;opacity:0} }
        .jr1{animation:jSpin  8s linear infinite}
        .jr2{animation:jSpinR 12s linear infinite}
        .jr3{animation:jSpin  5s linear infinite}
        .jp {animation:jPulse 3s ease-in-out infinite}
        .js {animation:jScan  4s ease-in-out infinite}
      `}</style>

      <section
        id="jarvis"
        ref={sectionRef}
        className="relative h-screen flex items-center overflow-hidden bg-[#0a0a0a]"
      >
        {/* Giant ghost text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
          <span className="font-black text-white uppercase tracking-widest whitespace-nowrap"
            style={{ fontSize: '18vw', opacity: 0.03, letterSpacing: '0.1em' }}>
            J.A.R.V.I.S
          </span>
        </div>

        {/* Red centre glow */}
        <div className="absolute top-1/2 left-[35%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(circle, rgba(255,42,42,0.1) 0%, transparent 70%)' }} />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-14 w-full relative z-10">

          {/* Label */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-6">
            <span className="text-[#ff2a2a] font-mono text-sm tracking-wider">04.</span>
            <h2 className="font-black text-white tracking-tight leading-none" style={{ fontSize: 'clamp(2.5rem,6vw,6rem)' }}>
              J.A.R.V.I.S
            </h2>
            <p className="text-gray-500 font-mono text-xs mt-2 tracking-[0.2em] uppercase">
              Just A Rather Very Intelligent System
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">

            {/* LEFT — HUD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }} animate={visible ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.9, ease: 'easeOut' }}
              className="relative flex items-center justify-center" style={{ minHeight: 340 }}
            >
              {[340, 270, 200].map((sz, i) => (
                <div key={i} className={`absolute rounded-full ${i === 0 ? 'jr1' : i === 1 ? 'jr2' : 'jr3'}`}
                  style={{ width: sz, height: sz, border: `1px solid rgba(255,42,42,${0.15 - i * 0.04})`, borderTop: `2px solid rgba(255,42,42,${0.55 - i * 0.12})` }} />
              ))}
              {[400, 340, 270].map((sz, i) => (
                <div key={`p${i}`} className="jp absolute rounded-full"
                  style={{ width: sz, height: sz, border: '1px solid rgba(255,42,42,0.07)', animationDelay: `${i}s` }} />
              ))}
              <div className="relative z-10 w-40 h-40 rounded-full overflow-hidden border-2 border-[#ff2a2a]/50 shadow-[0_0_80px_rgba(255,42,42,0.4)]">
                <img src={jarvisImg} alt="J.A.R.V.I.S" className="w-full h-full object-cover" />
                <div className="js absolute left-0 w-full h-[2px]"
                  style={{ background: 'linear-gradient(90deg,transparent,rgba(255,42,42,0.7),transparent)' }} />
              </div>
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="absolute"
                  style={{
                    width: 2, height: i % 3 === 0 ? 14 : 7, background: i % 3 === 0 ? 'rgba(255,42,42,0.55)' : 'rgba(255,42,42,0.2)', top: '50%', left: '50%',
                    transformOrigin: '1px 192px', transform: `translateX(-1px) translateY(-192px) rotate(${i * 30}deg) translateY(-100%)`
                  }} />
              ))}
              <div className="absolute top-3 right-0 flex flex-col gap-2">
                {['ONLINE', 'READY', 'ACTIVE'].map((s, i) => (
                  <motion.div key={s} animate={{ opacity: pulse === i ? 1 : 0.28 }} transition={{ duration: 0.4 }}
                    className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest" style={{ color: '#ff2a2a' }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#ff2a2a', boxShadow: pulse === i ? '0 0 8px #ff2a2a' : 'none' }} />
                    {s}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT — content */}
            <div className="flex flex-col gap-4">
              <motion.div initial={{ opacity: 0, x: 30 }} animate={visible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
                <p className="text-gray-300 text-base leading-relaxed mb-2">
                  An <strong className="text-white">Iron Man–inspired AI desktop assistant</strong> built with Python. Speak a command and JARVIS listens, understands, and acts — opening apps, fetching weather, answering questions, and more.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A self-learning exploration into AI/ML and Python scripting — where voice interfaces meet real-world APIs.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {FEATURES.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <motion.div key={f.title} initial={{ opacity: 0, y: 16 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.35 + i * 0.08 }}
                      className="flex gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}>
                        <Icon size={14} style={{ color: f.color }} />
                      </div>
                      <div>
                        <h4 className="text-white text-sm font-semibold mb-0.5">{f.title}</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5 }} className="flex flex-wrap gap-1.5">
                {TECH.map(t => (
                  <span key={t} className="text-xs font-medium text-gray-300 bg-white/[0.05] border border-white/10 px-3 py-1 rounded-full">{t}</span>
                ))}
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.6 }} className="flex flex-wrap gap-3">
                <a href="https://github.com/IT24101654/J.A.R.V.I.S" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-white font-semibold text-sm rounded-xl transition-all duration-200 hover:scale-105"
                  style={{ background: 'linear-gradient(135deg,#ff2a2a,#cc1a1a)', boxShadow: '0 0 24px rgba(255,42,42,0.35)' }}>
                  <FaGithub size={16} /> View on GitHub
                </a>
                <a href="#projects" className="inline-flex items-center gap-2 px-6 py-2.5 text-gray-300 hover:text-white font-medium text-sm rounded-xl border border-white/10 hover:border-white/25 transition-colors">
                  All Projects <FiArrowRight size={14} />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
