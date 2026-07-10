import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiMail, FiDownload, FiMenu, FiX } from 'react-icons/fi';
import cvFile from '../assets/Yasith_Hasarinda_CV.pdf';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll detection on snap-container
  useEffect(() => {
    const container = document.getElementById('snap-container');
    if (!container) return;
    const onScroll = () => setIsScrolled(container.scrollTop > 10);
    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const container = document.getElementById('snap-container');
    const sections = document.querySelectorAll('section[id]');
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            setIsScrolled(entry.target.id !== 'home');
          }
        });
      },
      { root: container, threshold: 0.5 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { id: 'home',         label: 'Home' },
    { id: 'hero-details', label: 'Details' },
    { id: 'about',        label: 'My Story' },
    { id: 'projects',     label: 'Projects' },
    { id: 'skills',       label: 'My Toolkit' },
    { id: 'contact',      label: "Let's Connect" },
  ];

  return (
    <>
      <nav className={`navbar${isScrolled ? ' scrolled' : ''}`}>
        <div className="logo"><span>H</span>ass.dev</div>

        <ul className="nav-links">
          {navLinks.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} className={activeSection === id ? 'active' : ''}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <a href="#contact" className="hidden xl:block bg-[#ff2a2a] hover:bg-red-600 text-white px-5 py-2 rounded-lg font-medium transition-colors text-sm shadow-[0_0_10px_rgba(255,42,42,0.3)]">
            Hire Me
          </a>
          <a href={cvFile} download="Yasith_Hasarinda_CV.pdf" className="hidden xl:flex items-center gap-1.5 border border-white/20 hover:border-[#ff2a2a]/60 hover:text-[#ff2a2a] text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors text-sm">
            <FiDownload size={14} /> CV
          </a>
          <a href="https://github.com/IT24101654" target="_blank" rel="noopener noreferrer" className="hidden md:block text-gray-300 hover:text-white transition-colors">
            <FaGithub size={22} />
          </a>
          <a href="https://www.linkedin.com/in/yasithhasarinda" target="_blank" rel="noopener noreferrer" className="hidden md:block text-gray-300 hover:text-white transition-colors">
            <FaLinkedin size={22} />
          </a>
          <a href="mailto:yasith.hasarinda2003@gmail.com" className="hidden md:block text-gray-300 hover:text-white transition-colors">
            <FiMail size={24} />
          </a>
          <button className="md:hidden text-white p-1" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <FiMenu size={26} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer-backdrop ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)} aria-hidden="true" />
      <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`} role="dialog" aria-label="Navigation menu">
        <button className="mobile-drawer-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
          <FiX size={24} />
        </button>
        <div className="mobile-drawer-logo"><span>H</span>ass.dev</div>
        <nav className="mobile-drawer-nav">
          {navLinks.map(({ id, label }) => (
            <a key={id} href={`#${id}`} className={`mobile-drawer-link ${activeSection === id ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <div className="mobile-drawer-actions">
          <a href="#contact" className="mobile-drawer-cta" onClick={() => setMobileOpen(false)}>Hire Me</a>
          <a href={cvFile} download="Yasith_Hasarinda_CV.pdf" className="mobile-drawer-cv" onClick={() => setMobileOpen(false)}>
            <FiDownload size={14} /> Download CV
          </a>
        </div>
        <div className="mobile-drawer-socials">
          <a href="https://github.com/IT24101654" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub size={22} /></a>
          <a href="https://www.linkedin.com/in/yasithhasarinda" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin size={22} /></a>
          <a href="mailto:yasith.hasarinda2003@gmail.com" aria-label="Email"><FiMail size={22} /></a>
        </div>
      </div>
    </>
  );
}

export default Navbar;
