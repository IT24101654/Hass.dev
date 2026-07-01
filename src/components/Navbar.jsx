import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiMail, FiDownload } from 'react-icons/fi';
import cvFile from '../assets/Yasith_Hasarinda_CV.pdf';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const scrollContainer = document.getElementById('snap-container');
    const sections = document.querySelectorAll('section[id]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: scrollContainer,
        threshold: 0.4,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo"><span>H</span>ass.dev</div>

      <ul className="nav-links">
        {[
          { id: 'home',     label: 'Home' },
          { id: 'about',    label: 'My Story' },
          { id: 'projects', label: 'Projects' },
          { id: 'skills',   label: 'My Toolkit' },
          { id: 'contact',  label: "Let's Connect" },
        ].map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={activeSection === id ? 'active' : ''}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-5">
        <a
          href="#contact"
          className="hidden xl:block bg-[#ff2a2a] hover:bg-red-600 text-white px-5 py-2 rounded-lg font-medium transition-colors text-sm shadow-[0_0_10px_rgba(255,42,42,0.3)] hover:shadow-[0_0_15px_rgba(255,42,42,0.5)]"
        >
          Hire Me
        </a>
        <a
          href={cvFile}
          download="Yasith_Hasarinda_CV.pdf"
          className="hidden xl:flex items-center gap-1.5 border border-white/20 hover:border-[#ff2a2a]/60 hover:text-[#ff2a2a] text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors text-sm"
          aria-label="Download CV"
        >
          <FiDownload size={14} />
          CV
        </a>
        <a href="https://github.com/IT24101654" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
          <FaGithub size={22} />
        </a>
        <a href="https://www.linkedin.com/in/yasithhasarinda" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
          <FaLinkedin size={22} />
        </a>
        <a href="mailto:yasith.hasarinda2003@gmail.com" className="text-gray-300 hover:text-white transition-colors">
          <FiMail size={24} />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
