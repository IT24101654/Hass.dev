import React, { useState, useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiMail, FiDownload, FiMenu, FiX } from 'react-icons/fi';
import cvFile from '../assets/Yasith_Hasarinda_CV.pdf';

/* ══════════════════════════════════════════════════════════════════
   LIQUID GLASS NAVBAR — Full-width, maximum glass quality
   
   Glass technique (inspired by iyinchao/liquid-glass-studio):
   ┌─────────────────────────────────────────────────────────────┐
   │ Layer 1 (bottom): ::before — SVG displacement-map shimmer   │
   │   Applied ONLY to a decorative pseudo-element, never text   │
   │ Layer 2: backdrop-filter blur + saturate on the bar itself  │
   │ Layer 3: ::after — animated liquid edge highlight           │
   │ Layer 4 (top): content — logo, links, buttons (no filter)   │
   └─────────────────────────────────────────────────────────────┘
   The trick: filter on ::before warps the light refraction layer
   independently from the readable text layer above it.
══════════════════════════════════════════════════════════════════ */

const STYLES = `
  /* ── Hidden SVG filter definition ── */
  .lg-svg-filters { position: absolute; width: 0; height: 0; pointer-events: none; overflow: hidden; }

  /* ══ Outer wrapper ══ */
  .lg-outer {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 200;
    pointer-events: none;
    transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1),
                transform 0.7s cubic-bezier(0.16,1,0.3,1);
  }
  .lg-outer.hidden { opacity: 0; transform: translateY(-100%); }
  .lg-outer.visible { opacity: 1; transform: translateY(0); }

  /* ══ The bar itself ══ */
  .lg-bar {
    pointer-events: auto;
    position: relative;
    display: flex;
    align-items: center;
    height: 62px;
    padding: 0 32px;

    /* Very transparent — so the background scene shows through the glass */
    background: rgba(15, 15, 20, 0.18);
    backdrop-filter: blur(40px) saturate(300%) brightness(1.20) contrast(1.05);
    -webkit-backdrop-filter: blur(40px) saturate(300%) brightness(1.20) contrast(1.05);
    border: none;
    overflow: hidden;
    clip-path: inset(0);

    /* Bottom glow line = the KEY glass bevel:
       light refracts through the bottom edge of glass and glows */
    box-shadow:
      0 1px 0 rgba(255,255,255,0.22),
      0 20px 60px rgba(0,0,0,0.35),
      0 4px 20px rgba(0,0,0,0.20);

    transition: background 0.5s ease, box-shadow 0.5s ease, backdrop-filter 0.5s ease;
  }

  .lg-bar.scrolled {
    background: rgba(10, 10, 14, 0.40);
    backdrop-filter: blur(56px) saturate(340%) brightness(1.14) contrast(1.08);
    -webkit-backdrop-filter: blur(56px) saturate(340%) brightness(1.14) contrast(1.08);
    clip-path: inset(0);
    box-shadow:
      0 1px 0 rgba(255,255,255,0.18),
      0 28px 80px rgba(0,0,0,0.55),
      0 6px 24px rgba(0,0,0,0.35);
  }

  /* ── Glass interior shimmer ──
     A multi-layer gradient that simulates the interior of thick glass.
     NO SVG filter (that caused bleeding). clip-path contains everything. */
  .lg-bar::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background:
      /* Inner glass body — cool tinted frosted surface */
      linear-gradient(
        180deg,
        rgba(255,255,255,0.055) 0%,
        rgba(200,210,255,0.018) 40%,
        rgba(255,255,255,0.008) 70%,
        rgba(0,0,0,0.06) 100%
      ),
      /* Left-side inner refraction glow */
      radial-gradient(
        ellipse 30% 100% at 0% 50%,
        rgba(255,255,255,0.07) 0%,
        transparent 70%
      ),
      /* Right-side inner refraction glow */
      radial-gradient(
        ellipse 30% 100% at 100% 50%,
        rgba(255,255,255,0.05) 0%,
        transparent 70%
      ),
      /* Centre inner highlight — the "glass lens" look */
      radial-gradient(
        ellipse 60% 100% at 50% 0%,
        rgba(255,255,255,0.04) 0%,
        transparent 65%
      );
    opacity: 1;
  }

  /* ── Animated liquid light orb ──
     Drifts left→right, creating the floating light-through-glass
     colour shift visible in the liquidGL reference.             */
  .lg-bar::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background:
      /* Moving bright orb */
      radial-gradient(
        ellipse 25% 220% at 25% 50%,
        rgba(255,255,255,0.10) 0%,
        rgba(255,255,255,0.03) 40%,
        transparent 70%
      ),
      /* Subtle red liquid tint from below */
      radial-gradient(
        ellipse 40% 80% at 50% 140%,
        rgba(255,60,60,0.08) 0%,
        transparent 65%
      );
    animation: lg-orb 10s ease-in-out infinite alternate;
  }

  @keyframes lg-orb {
    0%   { opacity: 0.65; transform: translateX(-10%) scaleX(0.9); }
    33%  { opacity: 1.00; transform: translateX(5%)  scaleX(1.1); }
    66%  { opacity: 0.80; transform: translateX(18%) scaleX(0.95); }
    100% { opacity: 1.00; transform: translateX(30%) scaleX(1.05); }
  }


  /* ── Content layer: 3-column grid — logo | CENTER links | actions ── */
  .lg-content {
    position: relative;
    z-index: 10;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    width: 100%;
    gap: 0;
  }

  /* Logo stays left */
  .lg-logo-wrap { display: flex; align-items: center; }

  /* Links stay perfectly centered */
  .lg-center { display: flex; align-items: center; justify-content: center; }

  /* Actions pushed to the right */
  .lg-actions { display: flex; align-items: center; gap: 6px; justify-content: flex-end; }

  /* ── Logo ── */
  .lg-logo {
    font-family: 'Inter', sans-serif;
    font-weight: 800;
    font-size: 30px;
    color: #fff;
    text-decoration: none;
    letter-spacing: -0.5px;
    white-space: nowrap;
    flex-shrink: 0;
    transition: opacity 0.2s;
  }
  .lg-logo:hover { opacity: 0.85; }
  .lg-logo em { color: #ff2a2a; font-style: normal; }

  /* ── Divider (only used between right-side items) ── */
  .lg-div {
    width: 1px;
    height: 18px;
    background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.18) 40%, rgba(255,255,255,0.18) 60%, transparent);
    flex-shrink: 0;
    margin: 0 10px;
  }

  /* ── Nav links ── */
  .lg-links {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 2px;
  }

  .lg-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 16px;
    border-radius: 8px;
    font-size: 14.5px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.60);
    text-decoration: none;
    transition: color 0.2s, background 0.2s;
    white-space: nowrap;
    position: relative;
    border: 1px solid transparent;
  }

  .lg-link:hover {
    color: rgba(255, 255, 255, 0.90);
    background: rgba(255, 255, 255, 0.07);
  }

  .lg-link.active {
    color: #ff2a2a;
    font-weight: 600;
    background: transparent;
    border-color: transparent;
  }

  /* Active pulsing dot */
  .lg-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #ff2a2a;
    box-shadow: 0 0 6px #ff2a2a, 0 0 14px rgba(255,42,42,0.5);
    flex-shrink: 0;
    animation: lg-pulse 2.2s ease-in-out infinite;
  }
  @keyframes lg-pulse {
    0%, 100% { box-shadow: 0 0 6px #ff2a2a, 0 0 14px rgba(255,42,42,0.55); }
    50%       { box-shadow: 0 0 3px #ff2a2a, 0 0 6px rgba(255,42,42,0.25); }
  }

  /* ── Right-side actions (defined in grid section above) ── */

  /* Icon button */
  .lg-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.09);
    background: rgba(255,255,255,0.04);
    color: rgba(255,255,255,0.55);
    text-decoration: none;
    cursor: pointer;
    transition: color 0.2s, background 0.2s, border-color 0.2s, transform 0.2s;
    flex-shrink: 0;
  }
  .lg-icon:hover {
    color: #fff;
    background: rgba(255,255,255,0.10);
    border-color: rgba(255,255,255,0.18);
    transform: translateY(-1px);
  }

  /* CV button */
  .lg-cv {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 16px;
    border-radius: 14px;
    font-size: 14px;
    font-weight: 600;
    color: rgba(255,255,255,0.72);
    text-decoration: none;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    transition: all 0.22s ease;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .lg-cv:hover {
    color: #ff2a2a;
    border-color: rgba(255,42,42,0.35);
    background: rgba(255,42,42,0.07);
    transform: translateY(-1px);
  }

  /* Hire Me — glass pill with red glow */
  .lg-hire {
    display: inline-flex;
    align-items: center;
    padding: 8px 22px;
    border-radius: 14px;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    text-decoration: none;
    background: linear-gradient(135deg, #ff2a2a 0%, #c41b1b 100%);
    border: 1px solid rgba(255,80,80,0.40);
    box-shadow:
      0 0 20px rgba(255,42,42,0.45),
      0 4px 12px rgba(0,0,0,0.35),
      inset 0 1px 0 rgba(255,110,110,0.35);
    transition: all 0.22s ease;
    white-space: nowrap;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
  }
  /* Shine sweep on hover */
  .lg-hire::after {
    content: '';
    position: absolute;
    top: 0; left: -100%; right: 0; bottom: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%);
    transition: left 0.4s ease;
    pointer-events: none;
  }
  .lg-hire:hover::after { left: 100%; }
  .lg-hire:hover {
    background: linear-gradient(135deg, #ff4040 0%, #d92020 100%);
    box-shadow: 0 0 32px rgba(255,42,42,0.65), 0 6px 16px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,130,130,0.35);
    transform: translateY(-1px);
  }

  /* Hamburger */
  .lg-burger {
    display: none;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.05);
    color: #fff;
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.2s;
  }
  .lg-burger:hover { background: rgba(255,255,255,0.10); }

  /* ══ Responsive ══ */
  @media (max-width: 1100px) {
    .lg-links { display: none !important; }
    .lg-center { display: none !important; }
    .lg-socials { display: none !important; }
    .lg-cv { display: none !important; }
    /* Collapse to 2-col when links are hidden */
    .lg-content { grid-template-columns: 1fr auto; }
  }
  @media (max-width: 720px) {
    .lg-bar { padding: 0 16px; height: 52px; }
    .lg-hire { display: none !important; }
    .lg-burger { display: inline-flex !important; }
  }

  /* ══ Mobile Drawer ══ */
  .lg-backdrop {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.72);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    z-index: 998;
  }
  .lg-backdrop.open { display: block; }

  .lg-drawer {
    position: fixed;
    top: 0; right: 0;
    width: min(320px, 86vw);
    height: 100vh;
    background: linear-gradient(160deg, rgba(14,14,16,0.98) 0%, rgba(8,8,10,0.99) 100%);
    border-left: 1px solid rgba(255,255,255,0.09);
    z-index: 999;
    display: flex;
    flex-direction: column;
    padding: 28px 28px 40px;
    transform: translateX(100%);
    transition: transform 0.34s cubic-bezier(0.32,0,0.15,1);
    box-shadow: -24px 0 72px rgba(0,0,0,0.6);
  }
  .lg-drawer.open { transform: translateX(0); }

  .lg-drawer-close {
    align-self: flex-end;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.10);
    color: #fff;
    border-radius: 10px;
    width: 38px; height: 38px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
    margin-bottom: 28px;
  }
  .lg-drawer-close:hover { background: rgba(255,42,42,0.14); color: #ff2a2a; }

  .lg-drawer-logo {
    font-size: 22px; font-weight: 800;
    color: #fff; letter-spacing: -0.5px;
    margin-bottom: 32px;
    font-family: 'Inter', sans-serif;
  }
  .lg-drawer-logo em { color: #ff2a2a; font-style: normal; }

  .lg-drawer-nav { display: flex; flex-direction: column; gap: 3px; flex: 1; }

  .lg-drawer-a {
    text-decoration: none;
    color: rgba(255,255,255,0.6);
    font-size: 15px; font-weight: 500;
    padding: 11px 14px; border-radius: 10px;
    border-left: 2px solid transparent;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
  }
  .lg-drawer-a:hover { background: rgba(255,255,255,0.05); color: #fff; }
  .lg-drawer-a.active { color: #ff2a2a; border-left-color: #ff2a2a; background: rgba(255,42,42,0.06); }

  .lg-drawer-footer { margin-top: 28px; display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }

  .lg-d-hire {
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, #ff2a2a, #c41b1b);
    color: #fff; font-weight: 700; font-size: 14px;
    padding: 13px; border-radius: 10px; text-decoration: none;
    box-shadow: 0 0 18px rgba(255,42,42,0.3);
    transition: box-shadow 0.2s, background 0.2s;
  }
  .lg-d-hire:hover { background: linear-gradient(135deg, #ff4040, #d92020); box-shadow: 0 0 28px rgba(255,42,42,0.5); }

  .lg-d-cv {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    border: 1px solid rgba(255,255,255,0.16);
    color: rgba(255,255,255,0.72); font-weight: 500; font-size: 14px;
    padding: 13px; border-radius: 10px; text-decoration: none;
    transition: border-color 0.2s, color 0.2s;
  }
  .lg-d-cv:hover { border-color: rgba(255,42,42,0.4); color: #ff2a2a; }

  .lg-d-socials { display: flex; gap: 14px; justify-content: center; }
  .lg-d-socials a { color: rgba(255,255,255,0.45); transition: color 0.2s; text-decoration: none; }
  .lg-d-socials a:hover { color: #ff2a2a; }
`;

/* ── Hidden SVG filters (defined once, referenced via CSS filter:url()) ──
   The feTurbulence creates an organic noise field.
   feDisplacementMap uses that noise to warp the source pixels.
   IMPORTANT: this filter is only referenced on .lg-bar::before (decorative).
   The text content layer sits above with z-index:10 and zero filter applied. */
function NavFilters() {
  return (
    <svg className="lg-svg-filters" aria-hidden="true" focusable="false">
      <defs>
        <filter id="lg-nav-filter" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
          {/* Slow-animating turbulence field */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.008"
            numOctaves="3"
            seed="42"
            result="noise"
          />
          {/* Warp the refraction layer along the noise — scale 6 is subtle but visible */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="7"
            xChannelSelector="R"
            yChannelSelector="G"
            result="warped"
          />
          {/* Soft edge so the warp doesn't look clipped */}
          <feGaussianBlur in="warped" stdDeviation="0.5" />
        </filter>
      </defs>
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = document.getElementById('snap-container');
    if (!el) return;
    const fn = () => setScrolled(el.scrollTop > 8);
    el.addEventListener('scroll', fn, { passive: true });
    return () => el.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const container = document.getElementById('snap-container');
    const sections = document.querySelectorAll('section[id]');
    if (!container) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          setActive(e.target.id);
          setScrolled(e.target.id !== 'home');
          const h = '#' + e.target.id;
          if (window.location.hash !== h) window.history.replaceState(null, '', h);
        }
      }),
      { root: container, threshold: 0.5 }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'photoshop', label: 'Graphics' },
    { id: 'hobby', label: 'Hobby' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <style>{STYLES}</style>
      <NavFilters />

      {/* ══ Full-width liquid glass bar ══ */}
      <nav
        aria-label="Main navigation"
        className={`lg-outer ${ready ? 'visible' : 'hidden'}`}
      >
        <div className={`lg-bar ${scrolled ? 'scrolled' : ''}`}>
          <div className="lg-content">

            {/* Column 1 — Logo (left) */}
            <div className="lg-logo-wrap">
              <a href="#home" className="lg-logo">
                <em>H</em>ass.Dev
              </a>
            </div>

            {/* Column 2 — Nav links (perfectly centered) */}
            <div className="lg-center">
              <ul className="lg-links" role="list">
                {links.map(({ id, label }) => {
                  const isActive = active === id;
                  return (
                    <li key={id}>
                      <a href={`#${id}`} className={`lg-link ${isActive ? 'active' : ''}`}>
                        {isActive && <span className="lg-dot" aria-hidden="true" />}
                        {label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Right actions */}
            <div className="lg-actions">
              {/* Social icons */}
              <div className="lg-socials" style={{ display: 'flex', gap: 4 }}>
                <a href="https://github.com/IT24101654" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="lg-icon">
                  <FaGithub size={17} />
                </a>
                <a href="https://www.linkedin.com/in/yasithhasarinda" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="lg-icon">
                  <FaLinkedin size={17} />
                </a>
                <a href="mailto:yasith.hasarinda2003@gmail.com" aria-label="Email" className="lg-icon">
                  <FiMail size={17} />
                </a>
              </div>

              <div className="lg-div" style={{ margin: '0 8px' }} />

              {/* CV */}
              <a href={cvFile} download="Yasith_Hasarinda_CV.pdf" className="lg-cv">
                <FiDownload size={14} /> CV
              </a>

              {/* Hire Me */}
              <a href="#contact" className="lg-hire">Hire Me</a>

              {/* Hamburger */}
              <button className="lg-burger" onClick={() => setOpen(true)} aria-label="Open menu">
                <FiMenu size={17} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ══ Mobile Drawer ══ */}
      <div className={`lg-backdrop ${open ? 'open' : ''}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <div className={`lg-drawer ${open ? 'open' : ''}`} role="dialog" aria-label="Navigation menu">
        <button className="lg-drawer-close" onClick={() => setOpen(false)} aria-label="Close menu">
          <FiX size={18} />
        </button>
        <div className="lg-drawer-logo"><em>H</em>ass.dev</div>
        <nav className="lg-drawer-nav">
          {links.map(({ id, label }) => (
            <a key={id} href={`#${id}`}
              className={`lg-drawer-a ${active === id ? 'active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="lg-drawer-footer">
          <a href="#contact" className="lg-d-hire" onClick={() => setOpen(false)}>Hire Me</a>
          <a href={cvFile} download="Yasith_Hasarinda_CV.pdf" className="lg-d-cv" onClick={() => setOpen(false)}>
            <FiDownload size={14} /> Download CV
          </a>
        </div>
        <div className="lg-d-socials">
          <a href="https://github.com/IT24101654" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub size={20} /></a>
          <a href="https://www.linkedin.com/in/yasithhasarinda" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin size={20} /></a>
          <a href="mailto:yasith.hasarinda2003@gmail.com" aria-label="Email"><FiMail size={20} /></a>
        </div>
      </div>
    </>
  );
}
