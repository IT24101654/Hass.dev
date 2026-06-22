import React, { useEffect, useRef, useState } from 'react';

// ─── Replace with your REAL project data ─────────────────────────────────────
const PROJECTS = [
    {
        id: 1,
        title: 'Hass.dev Portfolio',
        description: 'Personal portfolio website built with React, Spline 3D, and Framer Motion. Features smooth scroll snapping, animated 3D robot, and a glass-morphism design.',
        image: null, // replace with: import img1 from '../assets/projects/portfolio.png'
        gradient: 'from-[#ff2a2a] to-[#ff6b6b]',
        tech: ['React', 'Tailwind CSS', 'Spline', 'Framer Motion'],
        github: 'https://github.com/yourusername/portfolio',
        live: null,
    },
    {
        id: 2,
        title: 'Spring Boot API',
        description: 'RESTful API backend built with Spring Boot and MySQL. Implements JWT authentication, role-based access control, and full CRUD operations.',
        image: null,
        gradient: 'from-[#6366f1] to-[#8b5cf6]',
        tech: ['Java', 'Spring Boot', 'MySQL', 'JWT'],
        github: 'https://github.com/yourusername/spring-api',
        live: null,
    },
    {
        id: 3,
        title: 'MERN Stack App',
        description: 'Full-stack web application using MongoDB, Express, React, and Node.js. Includes real-time updates and a responsive modern UI.',
        image: null,
        gradient: 'from-[#06b6d4] to-[#3b82f6]',
        tech: ['MongoDB', 'Express', 'React', 'Node.js'],
        github: 'https://github.com/yourusername/mern-app',
        live: null,
    },
    {
        id: 4,
        title: 'AI Chat App',
        description: 'AI-powered chat application integrating Gemini API for intelligent responses. Features a clean conversational UI and context-aware replies.',
        image: null,
        gradient: 'from-[#f59e0b] to-[#ef4444]',
        tech: ['React', 'Gemini API', 'Node.js', 'CSS'],
        github: 'https://github.com/yourusername/ai-chat',
        live: null,
    },
    {
        id: 5,
        title: 'E-Commerce Platform',
        description: 'Online shopping platform with product listings, cart management, and order processing. Built with Java Spring Boot backend and React frontend.',
        image: null,
        gradient: 'from-[#10b981] to-[#059669]',
        tech: ['Java', 'Spring Boot', 'React', 'MySQL'],
        github: 'https://github.com/yourusername/ecommerce',
        live: null,
    },
    {
        id: 6,
        title: 'Task Manager',
        description: 'Productivity app for managing tasks with drag-and-drop Kanban boards, deadline tracking, and priority flags.',
        image: null,
        gradient: 'from-[#0ea5e9] to-[#6366f1]',
        tech: ['React', 'Node.js', 'MongoDB', 'REST API'],
        github: 'https://github.com/yourusername/task-manager',
        live: null,
    },
    {
        id: 7,
        title: 'Social Media Dashboard',
        description: 'Analytics dashboard visualizing social media metrics with interactive charts, dark mode, and live data refresh.',
        image: null,
        gradient: 'from-[#ec4899] to-[#a855f7]',
        tech: ['React', 'Chart.js', 'REST APIs', 'CSS'],
        github: 'https://github.com/yourusername/social-dashboard',
        live: null,
    },
    {
        id: 8,
        title: 'Weather App',
        description: 'Real-time weather application with location search, 5-day forecast, and animated weather icons using OpenWeatherMap API.',
        image: null,
        gradient: 'from-[#84cc16] to-[#16a34a]',
        tech: ['React', 'OpenWeatherMap', 'CSS Animations'],
        github: 'https://github.com/yourusername/weather-app',
        live: null,
    },
    {
        id: 9,
        title: 'Library Management System',
        description: 'Full-featured library management system with book inventory, member management, and borrowing/returning workflows.',
        image: null,
        gradient: 'from-[#ef4444] to-[#f97316]',
        tech: ['Java', 'Spring Boot', 'MySQL', 'Thymeleaf'],
        github: 'https://github.com/yourusername/library-system',
        live: null,
    },
    {
        id: 10,
        title: 'Portfolio v1',
        description: 'First version of my personal portfolio. A simple static site showcasing early projects and skills.',
        image: null,
        gradient: 'from-[#3b82f6] to-[#7c3aed]',
        tech: ['HTML', 'CSS', 'JavaScript'],
        github: 'https://github.com/yourusername/portfolio-v1',
        live: null,
    },
];

const Projects = () => {
    const sliderRef = useRef(null);
    const carouselContainerRef = useRef(null);
    const isPaused = useRef(false);
    const angleRef = useRef(0);
    const velocityRef = useRef(0);
    const [activeCard, setActiveCard] = useState(null);

    useEffect(() => {
        const slider = sliderRef.current;
        const container = carouselContainerRef.current;
        if (!slider || !container) return;

        const autoSpeed = 0.05;
        let isScrolling = false;
        let idleTimer = null;
        const FRICTION = 0.92;
        const SENSITIVITY = 0.003; // Slower scroll rotation
        let animationFrameId;

        slider.style.animation = 'none';

        const tick = () => {
            if (isScrolling) {
                velocityRef.current *= FRICTION;
                if (Math.abs(velocityRef.current) < 0.01) isScrolling = false;
            } else if (isPaused.current) {
                velocityRef.current *= 0.85;
            } else {
                velocityRef.current += (autoSpeed - velocityRef.current) * 0.018;
            }
            angleRef.current += velocityRef.current;
            slider.style.transform = `perspective(1200px) rotateX(-4deg) rotateY(${angleRef.current}deg)`;
            animationFrameId = requestAnimationFrame(tick);
        };

        tick();

        const handleWheel = (e) => {
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
                            onMouseEnter={() => { isPaused.current = true; setActiveCard(project.id); }}
                            onMouseLeave={() => { isPaused.current = false; setActiveCard(null); }}
                        >
                            {/* ── Card face: gradient or image ── */}
                            {project.image ? (
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover block"
                                />
                            ) : (
                                <div className={`w-full h-full bg-gradient-to-br ${project.gradient}`} />
                            )}

                            {/* ── Overlay: details always visible ── */}
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

                            {/* Border removed as requested */}

                            {/* ── Shimmer sweep ── */}
                            <div
                                className="absolute top-0 -left-[75%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-[20deg] z-[3] pointer-events-none animate-shimmer"
                                style={{ animationDelay: `${project.id * 0.3}s` }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
