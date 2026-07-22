import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const RED = '#ff2a2a';

/* ─── Skill data ──────────────────────────────────────────────────── */
const CATEGORIES = [
  {
    id: 'languages',
    label: 'Languages',
    emoji: '💻',
    skills: [
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    ],
  },
  {
    id: 'frameworks',
    label: 'Frameworks & Libraries',
    emoji: '⚙️',
    skills: [
      { name: 'Spring', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    emoji: '🗄️',
    skills: [
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Platforms',
    emoji: '🛠️',
    skills: [
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
      { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
      { name: 'Expo', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/expo/expo-original.svg' },
      { name: 'Jupyter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' },
    ],

  },
  {
    id: 'design',
    label: 'Design Tools',
    emoji: '🎨',
    skills: [
      { name: 'Photoshop', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg' },
      { name: 'Illustrator', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-original.svg' },
      { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    ],
  },
];

const SkillChip = ({ skill, index }) => {
  const [hovered, setHovered] = useState(false);
  const invert = skill.name === 'Express' || skill.name === 'GitHub' || skill.name === 'Expo';

  return (
    <div
      className="sk-chip"
      style={{ animationDelay: `${index * 50}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="sk-chip-inner"
        style={{
          boxShadow: hovered ? `0 0 5px ${RED}66, 0 6px 24px rgba(0,0,0,0.5)` : '0 2px 10px rgba(0,0,0,0.35)',
          transform: hovered ? 'translateY(-6px) scale(1)' : 'translateY(0) scale(1)',
          background: hovered ? `rgba(255,42,42,0.01)` : 'rgba(255,255,255,0.04)',
        }}
      >
        <img
          src={skill.icon}
          alt={skill.name}
          className="sk-icon"
          style={{
            filter: invert ? 'invert(1)' : 'none',
            transform: hovered ? 'scale(1.2) rotate(-5deg)' : 'scale(1) rotate(0deg)',
          }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <span className="sk-name" style={{ color: hovered ? 'white' : 'rgba(255,255,255,0.7)' }}>
          {skill.name}
        </span>
      </div>
    </div>
  );
};

/* ─── Category block ──────────────────────────────────────────────── */
const CategoryBlock = ({ category, visible, delay }) => (
  <div
    className="sk-cat"
    style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(28px)',
      transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
    }}
  >
    <div className="sk-cat-header">
      <span className="sk-cat-emoji">{category.emoji}</span>
      <span className="sk-cat-label">{category.label}</span>
      <div className="sk-cat-line" />
    </div>
    <div className="sk-chips-row">
      {category.skills.map((skill, i) => (
        <SkillChip key={skill.name} skill={skill} index={i} />
      ))}
    </div>
  </div>
);

const Skills = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
                .skills-section {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 3rem 0;
                    position: relative;
                    z-index: 10;
                    overflow: hidden;
                }
                @media (max-width: 768px) {
                    .skills-section {
                        padding-top: 5rem;
                        padding-bottom: 3rem;
                        justify-content: flex-start;
                    }
                }
                .sk-inner {
                    width: 100%;
                    margin: 0 auto;
                    padding: 0 clamp(1rem, 8vw, 13rem);
                    box-sizing: border-box;
                }
                @media (max-width: 480px) {
                    .sk-inner { padding: 0 1rem; }
                }

                .sk-heading {
                    margin-bottom: 1.6rem;
                    transition: opacity 0.5s ease, transform 0.5s ease;
                }
                .sk-num {
                    color: #ff2a2a;
                    font-family: 'Fira Code', monospace;
                    font-size: 1.125rem;
                    display: block;
                    margin-bottom: 0.15rem;
                }
                .sk-title {
                    font-size: 3rem;
                    font-weight: 800;
                    color: #fff;
                    line-height: 1;
                }

                .sk-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.4rem 4rem;
                }
                @media (max-width: 768px) {
                    .sk-grid { gap: 1.2rem 1.5rem; }
                    .sk-title { font-size: 2.25rem; }
                }
                @media (max-width: 480px) {
                    .sk-grid { grid-template-columns: 1fr; gap: 1.25rem; }
                    .sk-title { font-size: 1.75rem; }
                    .sk-num { font-size: 0.9rem; }
                }

                .sk-cat { }

                .sk-cat-header {
                    display: flex;
                    align-items: center;
                    gap: 0.45rem;
                    margin-bottom: 0.65rem;
                }
                .sk-cat-emoji { font-size: 0.95rem; }
                .sk-cat-label {
                    font-size: 0.72rem;
                    font-weight: 700;
                    letter-spacing: 0.09em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.6);
                    white-space: nowrap;
                }
                .sk-cat-line {
                    flex: 1;
                    height: 1px;
                    background: linear-gradient(to right, rgba(255,42,42,0.4), transparent);
                }

                .sk-chips-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }

                @keyframes skChipIn {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .sk-chip {
                    animation: skChipIn 0.4s ease both;
                    contain: layout;
                }
                .sk-chip-inner {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 0.4rem;
                    width: 92px;
                    height: 96px;
                    border-radius: 16px;
                    /* Reduced blur: 6px vs 10px — half the GPU cost, no visible difference */
                    backdrop-filter: blur(6px);
                    -webkit-backdrop-filter: blur(6px);
                    cursor: default;
                    /* Promote to compositor layer so blur/hover don't cause page repaints */
                    transform: translateZ(0);
                    will-change: transform;
                    backface-visibility: hidden;
                    transition:
                        transform    0.22s cubic-bezier(0.34,1.56,0.64,1),
                        box-shadow   0.22s ease,
                        background   0.22s ease,
                        opacity      0.22s ease;
                }
                .sk-icon {
                    width: 36px;
                    height: 36px;
                    object-fit: contain;
                    transition: transform 0.22s ease;
                }
                .sk-name {
                    font-size: 0.65rem;
                    font-weight: 600;
                    letter-spacing: 0.03em;
                    text-align: center;
                    white-space: nowrap;
                    transition: color 0.22s ease;
                }

                .sk-chips-row { gap: 0.65rem; }

                @media (max-width: 768px) {
                    .sk-chip-inner { width: 76px; height: 80px; }
                    .sk-icon { width: 30px; height: 30px; }
                }

                @media (max-width: 480px) {
                    .sk-chips-row { gap: 0.5rem; }
                    .sk-chip-inner { width: 60px; height: 66px; border-radius: 10px; gap: 0.35rem; }
                    .sk-icon { width: 22px; height: 22px; }
                    .sk-name { font-size: 0.5rem; }
                }
            `}</style>

      <section id="skills" className="skills-section has-noise bg-[#0a0a0a]" ref={sectionRef}>

        {/* ── HUGE BACKGROUND TEXT ── */}
        <div className="absolute bottom-0 right-0 left-0 pointer-events-none select-none z-0 overflow-hidden flex justify-end items-end pb-4 pr-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="whitespace-normal md:whitespace-nowrap text-right"
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(5.5rem, 17vw, 28rem)',
              fontWeight: 900,
              lineHeight: 0.8,
              letterSpacing: '10px',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 90%)',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 90%)',
              background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'3\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.02\'/%3E%3C/svg%3E"), rgba(255, 255, 255, 0.04)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              transform: 'translate(2%, 10%)',
            }}
          >
            MY <br className="block md:hidden" /> TOOLKIT
          </motion.div>
        </div>

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(circle, rgba(255,42,42,0.04) 0%, transparent 60%)' }} />

        <div className="sk-inner relative z-10">
          <div
            className="sk-heading"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <h2 className="font-black text-white uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.5rem,3.5vw,5rem)', lineHeight: 0.88 }}>Skills</h2>
          </div>

          <div className="sk-grid">
            {CATEGORIES.map((cat, idx) => (
              <CategoryBlock
                key={cat.id}
                category={cat}
                visible={visible}
                delay={idx * 90}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Skills;
