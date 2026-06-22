import React, { useEffect, useRef, useState } from 'react';
import hassDevImageP from '../assets/Hass.dev Portfolio-popup.png';
import hassDevImageC from '../assets/Hass.dev Portfolio-card.png';
import parkifyImageP from '../assets/Parkify Website-popup.png';
import parkifyImageC from '../assets/Parkify Website-card.png';
import JARVISImageP from '../assets/JARVIS.png';
import JARVISImageC from '../assets/JARVIS-card.jpg';



const PROJECTS = [
    {
        id: 7,
        title: 'Hass.dev Portfolio',
        description: 'Personal portfolio website showcasing projects, technical skills, and journey. Built with React and 3D elements.',
        cardImage: hassDevImageC,
        popupImage: hassDevImageP,
        imagePosition: '50% 50%',
        imageSize: 'cover',
        gradient: 'from-[#ec4899] to-[#a855f7]',
        tech: ['React', 'Tailwind', '3D UI'],
        github: 'https://github.com/IT24101654/Hass.dev',
        live: null,
    },
    {
        id: 1,
        title: 'Parkify Website',
        description: 'Smart Parking Management System helping drivers find and book parking via Google Maps, with owner dashboards and admin controls.',
        cardImage: parkifyImageC,
        popupImage: parkifyImageP,
        imagePosition: '47% 60%',
        imageSize: '160%',
        gradient: 'from-[#06b6d4] to-[#3b82f6]',
        tech: ['React', 'Node.js', 'Express', 'MongoDB'],
        github: 'https://github.com/IT24101654/Parkify---Parking-Management-System',
        live: 'https://parkify-frontend.onrender.com',
    },
    {
        id: 8,
        title: 'Parkify Mobile App',
        description: 'Mobile application for parking discovery. Features a React Native Expo frontend and a secure Node.js/MongoDB backend API.',
        cardImage: null,
        popupImage: null,
        gradient: 'from-[#ef4444] to-[#f97316]',
        tech: ['React Native', 'Expo', 'Node.js', 'MongoDB'],
        github: 'https://github.com/IT24101654/Parkify-Frontend',
        live: null,
    },
    {
        id: 2,
        title: 'J.A.R.V.I.S Assistant',
        description: 'AI-powered desktop assistant inspired by Iron Man, featuring voice commands, web search, and intelligent task execution.',
        cardImage: JARVISImageC,
        popupImage: JARVISImageP,
        imagePosition: '0% 0%',
        imageSize: '100%',
        gradient: 'from-[#ff2a2a] to-[#ff6b6b]',
        tech: ['Python', 'AI', 'Voice Recognition'],
        github: 'https://github.com/IT24101654/J.A.R.V.I.S',
        live: null,
    },
    {
        id: 3,
        title: 'Living Art Gallery',
        description: 'High-quality hand-drawn pencil portrait gallery showcasing facial details, shading, and real emotions.',
        cardImage: null,
        popupImage: null,
        gradient: 'from-[#10b981] to-[#059669]',
        tech: ['HTML', 'CSS', 'JavaScript'],
        github: 'https://github.com/IT24101654/Living-Art-by-Hasarinda',
        live: null,
    },
    {
        id: 4,
        title: 'NeoSchool',
        description: 'Web-based School Information Management System for handling student data, courses, and administrative workflows.',
        cardImage: null,
        popupImage: null,
        gradient: 'from-[#f59e0b] to-[#ef4444]',
        tech: ['HTML', 'CSS', 'JavaScript', 'PHP'],
        github: 'https://github.com/IT24101654/NeoSchool',
        live: null,
    },
    {
        id: 5,
        title: 'EcoLeaf AI/ML',
        description: 'Machine Learning project using Jupyter Notebooks to detect plant diseases from leaf images with high accuracy.',
        cardImage: null,
        popupImage: null,
        gradient: 'from-[#84cc16] to-[#16a34a]',
        tech: ['Python', 'Machine Learning', 'Jupyter'],
        github: 'https://github.com/IT24101654/EcoLeaf-AIML',
        live: null,
    },
    {
        id: 6,
        title: 'SkillDrive',
        description: 'A platform designed to streamline skills learning and driver education with intuitive resource management.',
        cardImage: null,
        popupImage: null,
        gradient: 'from-[#6366f1] to-[#8b5cf6]',
        tech: ['React', 'Node.js', 'Tailwind CSS'],
        github: 'https://github.com/IT24101654/SkillDrive',
        live: null,
    },
];

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const sliderRef = useRef(null);
    const carouselContainerRef = useRef(null);
    const isPaused = useRef(false);
    const angleRef = useRef(0);
    const velocityRef = useRef(0);
    const modalOpenRef = useRef(false);
    const [activeCard, setActiveCard] = useState(null);

    modalOpenRef.current = !!selectedProject;

    useEffect(() => {
        const slider = sliderRef.current;
        const container = carouselContainerRef.current;
        if (!slider || !container) return;

        const autoSpeed = 0.05;
        let isScrolling = false;
        let idleTimer = null;
        const FRICTION = 0.92;
        const SENSITIVITY = 0.003;
        let animationFrameId;

        slider.style.animation = 'none';

        const tick = () => {
            if (modalOpenRef.current) {
                velocityRef.current = 0;
            } else {
                if (isScrolling) {
                    velocityRef.current *= FRICTION;
                    if (Math.abs(velocityRef.current) < 0.01) isScrolling = false;
                } else if (isPaused.current) {
                    velocityRef.current *= 0.85;
                } else {
                    velocityRef.current += (autoSpeed - velocityRef.current) * 0.018;
                }
            }
            angleRef.current += velocityRef.current;
            slider.style.transform = `perspective(1200px) rotateX(-4deg) rotateY(${angleRef.current}deg)`;
            animationFrameId = requestAnimationFrame(tick);
        };

        tick();

        const handleWheel = (e) => {
            if (modalOpenRef.current) return;
            e.preventDefault();
            velocityRef.current += e.deltaY * SENSITIVITY;
            isScrolling = true;
            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => { isScrolling = false; }, 2000);
        };

        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            cancelAnimationFrame(animationFrameId);
            container.removeEventListener('wheel', handleWheel);
            clearTimeout(idleTimer);
        };
    }, []);

    return (
        <section id="projects" className="min-h-screen py-8 md:py-20 flex flex-col justify-center w-full relative z-10">
            <div className="max-w-7xl mx-auto px-4 w-full">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-8">
                    <span className="text-[#ff2a2a] font-mono text-lg md:text-2xl block mb-1 md:mb-2">02.</span>
                    My Projects
                </h2>
            </div>

            <div
                ref={carouselContainerRef}
                className="w-full h-[60vh] md:h-[50vh] flex items-center justify-center mb-32 md:mb-64"
            >
                <div
                    className="slider relative w-[160px] h-[220px] md:w-[180px] md:h-[250px] [transform-style:preserve-3d]"
                    style={{ '--quantity': PROJECTS.length }}
                    ref={sliderRef}
                >
                    {PROJECTS.map((project) => (
                        <div
                            key={project.id}
                            className="item group absolute inset-0 rounded-[16px] overflow-hidden cursor-pointer"
                            style={{ '--position': project.id }}
                            onClick={() => setSelectedProject(project)}
                            onMouseEnter={() => { isPaused.current = true; setActiveCard(project.id); }}
                            onMouseLeave={() => { isPaused.current = false; setActiveCard(null); }}
                        >
                            {project.cardImage ? (
                                <div
                                    className="w-full h-full"
                                    style={{
                                        backgroundImage: `url("${project.cardImage}")`,
                                        backgroundPosition: project.imagePosition || 'center',
                                        backgroundSize: project.imageSize || 'cover',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                />
                            ) : (
                                <div className={`w-full h-full bg-gradient-to-br ${project.gradient}`} />
                            )}

                            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/80 to-transparent p-3 z-10">
                                <h3 className="text-white font-bold text-[14px] md:text-[13px] leading-tight mb-1">
                                    {project.title}
                                </h3>
                                <p className="text-gray-300 text-[9px] md:text-[7px] leading-snug mb-2 line-clamp-3">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-1 mb-2">
                                    {project.tech.map((t) => (
                                        <span
                                            key={t}
                                            className="text-[7px] md:text-[5px] bg-white/10 text-white/80 border border-white/20 rounded-full px-2 py-0.5"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 bg-white text-black text-[8px] md:text-[5px] font-semibold rounded-full px-2 py-1 hover:bg-gray-200 transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                                        </svg>
                                        GitHub
                                    </a>
                                    {project.live && (
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 bg-[#ff2a2a] text-white text-[8px] md:text-[10px] font-semibold rounded-full px-2 py-1 hover:bg-red-400 transition-colors"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            ↗ Live
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div
                                className="absolute top-0 -left-[75%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-[20deg] z-[3] pointer-events-none animate-shimmer"
                                style={{ animationDelay: `${project.id * 0.3}s` }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Project Details Modal ── */}
            {selectedProject && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-md transition-opacity" onClick={() => setSelectedProject(null)}>
                    <div
                        className="relative w-full max-w-3xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] p-6 md:p-8 overflow-y-auto max-h-[95vh] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white/80 hover:text-white transition-all rounded-full p-2"
                            onClick={() => setSelectedProject(null)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>

                        {/* Image Header */}
                        <div className="w-full h-48 md:h-72 rounded-2xl mb-6 overflow-hidden relative shadow-lg">
                            {(selectedProject.popupImage || selectedProject.cardImage) ? (
                                <img src={selectedProject.popupImage || selectedProject.cardImage} alt={selectedProject.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className={`w-full h-full bg-gradient-to-br ${selectedProject.gradient} flex items-center justify-center`}>
                                    <span className="text-white/60 font-bold text-2xl md:text-4xl tracking-widest uppercase text-center px-4">{selectedProject.title}</span>
                                </div>
                            )}
                        </div>

                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">{selectedProject.title}</h2>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {selectedProject.tech.map((t) => (
                                <span key={t} className="text-[10px] md:text-xs bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full px-4 py-1.5 font-bold tracking-wider shadow-sm">
                                    {t}
                                </span>
                            ))}
                        </div>

                        <p className="text-gray-200 text-sm md:text-lg leading-relaxed mb-8 font-light">
                            {selectedProject.description}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            {selectedProject.github && (
                                <a
                                    href={selectedProject.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white font-semibold rounded-full px-6 py-3 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
                                    View GitHub
                                </a>
                            )}
                            {selectedProject.live && (
                                <a
                                    href={selectedProject.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-[#ff2a2a] text-white font-bold rounded-full px-6 py-3 hover:bg-[#ff4a4a] shadow-[0_0_20px_rgba(255,42,42,0.4)] transition-all"
                                >
                                    ↗ Live Demo
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Projects;
