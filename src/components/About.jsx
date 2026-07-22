import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import myImage from '../assets/My.png';

const SKILLS = [
  { label: 'Java / Spring', abbr: 'Jv', pct: 90, color: '#f89820' },
  { label: 'Python / AI', abbr: 'Py', pct: 80, color: '#3b82f6' },
  { label: 'React / JS', abbr: 'Js', pct: 85, color: '#61dafb' },
  { label: 'Photoshop', abbr: 'Ps', pct: 85, color: '#31a8ff' },
  { label: 'Illustrator', abbr: 'Ai', pct: 72, color: '#ff7c00' },
];

const TOTAL_DOTS = 15;

function SkillRow({ skill, visible, delay }) {
  const filled = Math.round((skill.pct / 100) * TOTAL_DOTS);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="flex items-center gap-1.5 sm:gap-2.5"
    >
      <div
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-[12px] sm:rounded-[16px] flex items-center justify-center text-[11px] sm:text-[14px] font-bold text-white flex-shrink-0"
        style={{ border: `2px solid ${skill.color}`, backgroundColor: 'transparent' }}
      >
        {skill.abbr}
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-white text-[10px] sm:text-[12px] font-bold tracking-wider whitespace-nowrap">{skill.label}</span>
        <div className="flex gap-[1.5px] sm:gap-[2px]">
          {Array.from({ length: TOTAL_DOTS }).map((_, i) => (
            <motion.div
              key={i}
              className="h-[4px] w-[5px] sm:h-[5px] sm:w-[8px] rounded-full flex-shrink-0"
              style={{ background: i < filled ? skill.color : 'rgba(255,255,255,0.2)' }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0a0a0a] min-h-screen pt-16 lg:pt-[60px] pb-8 flex flex-col justify-center"
    >
      {/* ── HUGE BACKGROUND TEXT ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={visible ? { opacity: 0.5, scale: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="whitespace-nowrap mt-12"
          style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(15rem, 35vw, 85rem)',
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '15px',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 85%)',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 65%)',
            background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'3\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.2\'/%3E%3C/svg%3E"), rgba(255, 255, 255, 0.04)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          2003
        </motion.div>
      </div>

      {/* ── Content Container ── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-12 flex flex-col">

        {/* ── TOP BLOCK ── */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-10 lg:gap-14 items-center justify-center mb-10">

          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={visible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="flex-shrink-0"
          >
            <div className="w-[220px] h-[300px] sm:w-[260px] sm:h-[340px] md:w-[280px] md:h-[360px] lg:w-[280px] lg:h-[360px] rounded-[35px] border-[1.5px] border-white/20 p-2">
              <div className="w-full h-full rounded-[25px] overflow-hidden bg-[#111]">
                <img
                  src={myImage}
                  alt="Yasith"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Bio & Intro */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center text-center lg:text-left mt-4 lg:mt-0 max-w-3xl"
          >
            <p className="text-white font-bold text-xl lg:text-2xl mb-1 italic">Yasith Lathika</p>
            <h2 className="text-white font-black text-[clamp(2.8rem,11.5vw,4.5rem)] lg:text-[6rem] leading-[0.85] tracking-tighter mb-4">
              HASARINDA
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 text-white text-lg font-bold italic mb-6">
              <span className="text-[#ff2a2a] text-xl">2003</span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="font-semibold text-gray-300 tracking-wide">Full Stack Developer</span>
            </div>

            <p className="text-gray-300 text-[14px] sm:text-[16px] lg:text-[17px] leading-relaxed max-w-3xl mx-auto lg:mx-0 px-2 sm:px-0">
              Hello, I'm Yasith - a software developer and designer passionate about building experiences that inspire. Born in 2003, I began my journey exploring the intersection of technology and creativity.              I'm currently a <strong className="text-white font-bold">BSc (Hons) IT</strong> undergraduate at SLIIT,
              passionate about <strong className="text-white font-bold">Full Stack Dev, AI, and Software Engineering</strong>.
              <br /><br />
              Beyond coding, I'm a graphic designer and pencil artist. I love building things that look great and work even better.
              Over my journey, I've honed my skills in both frontend and backend development to deliver high-quality digital experiences!
            </p>
          </motion.div>
        </div>

        {/* ── SKILLS BLOCK ── */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-items-center sm:justify-center gap-y-8 gap-x-2 sm:gap-8 lg:gap-12 mb-10 px-2 sm:px-4">
          {SKILLS.map((skill, i) => (
            <div
              key={skill.label}
              className={i === 2 ? "col-span-2 sm:col-span-1 flex justify-center w-full sm:w-auto" : "flex justify-center w-full sm:w-auto"}
            >
              <SkillRow skill={skill} visible={visible} delay={0.3 + i * 0.1} />
            </div>
          ))}
        </div>

        {/* ── BOTTOM BLOCK (3 Columns) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 px-4 max-w-[1200px] mx-auto w-full"
        >
          {/* EXPERIENCE */}
          <div>
            <h3 className="text-white font-black text-xl uppercase mb-5 tracking-widest">JOURNEY</h3>
            <div className="space-y-3">
              <p className="text-gray-200 text-[14px] font-medium">
                - Full Stack Developer <span className="text-gray-500 font-normal">( 2024 - Current )</span>
              </p>
              <p className="text-gray-200 text-[14px] font-medium">
                - Graphic Designer <span className="text-gray-500 font-normal">( 2023 - Current )</span>
              </p>
              <p className="text-gray-200 text-[14px] font-medium">
                - SLIIT Undergraduate <span className="text-gray-500 font-normal">( 2024 - Current )</span>
              </p>
            </div>
          </div>

          {/* PROFILE */}
          <div>
            <h3 className="text-white font-black text-xl uppercase mb-5 tracking-widest">Profile</h3>
            <div className="space-y-3">
              <p className="text-gray-200 text-[14px] font-medium">- Full Name - <span className="text-gray-400">Yasith Lathika Hasarinda</span></p>
              <p className="text-gray-200 text-[14px] font-medium">- Location - <span className="text-gray-400">Sri Lanka</span></p>
              <p className="text-gray-200 text-[14px] font-medium">- Degree - <span className="text-gray-400">BSc (Hons) IT</span></p>
            </div>
          </div>

          {/* CONTACTS */}
          <div>
            <h3 className="text-white font-black text-xl uppercase mb-5 tracking-widest">Contacts</h3>
            <div className="space-y-3">
              <a href="mailto:yasith.hasarinda2003@gmail.com" className="block text-gray-200 hover:text-[#ff2a2a] transition-colors text-[14px] font-medium">
                - yasith.hasarinda2003@gmail.com
              </a>
              <a href="https://github.com/IT24101654" target="_blank" rel="noopener noreferrer" className="block text-gray-200 hover:text-[#ff2a2a] transition-colors text-[14px] font-medium">
                - github.com/IT24101654
              </a>
              <a href="https://www.linkedin.com/in/yasithhasarinda" target="_blank" rel="noopener noreferrer" className="block text-gray-200 hover:text-[#ff2a2a] transition-colors text-[14px] font-medium">
                - linkedin.com/in/yasithhasarinda
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}