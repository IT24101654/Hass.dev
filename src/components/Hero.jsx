import React, { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = ({ isLoading }) => {
    const { scrollY } = useScroll();

    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = windowWidth < 768;
    const isTablet = windowWidth >= 768 && windowWidth <= 1024;

    const initialScale = isMobile ? 1.2 : isTablet ? 0.8 : 1.5;
    const finalScale = isMobile ? 1.5 : isTablet ? 1.8 : 4.5;

    const scale = useTransform(scrollY, [0, 900], [initialScale, finalScale]);

    const y = useTransform(scrollY, [0, 900], [0, -250]);

    return (
        <section id="home" className="relative w-full h-screen overflow-hidden flex items-center justify-center">

            <motion.div
                style={{ scale, y }}
                className="absolute top-[-45vh] md:top-[-90vh] xl:top-[-55%] left-1/2 xl:left-[0%] -translate-x-1/2 xl:translate-x-0 w-[300vw] xl:w-[150%] h-[300vw] xl:h-[150%] z-0 pointer-events-auto origin-center ml-[50vw] md:ml-[25vw] xl:ml-0"
            >
                <motion.div
                    initial={{ scale: 1.8, opacity: 0 }}
                    animate={isLoading ? { scale: 1.8, opacity: 0 } : { scale: 1, opacity: 1 }}
                    transition={{ duration: 2.5, ease: "easeOut" }}
                    className="w-full h-full"
                >
                    <Spline
                        scene="https://prod.spline.design/1exYaNclVVLtii4g/scene.splinecode"
                        className="drop-shadow-[1px_1px_1px_rgba(255,42,42,0.1)]"
                    />
                </motion.div>
            </motion.div>

            <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start justify-end pb-32 md:justify-center md:pb-0 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="max-w-2xl"
                >
                    <h2 className="text-xl md:text-2xl text-[#ff2a2a] font-mono mb-2">Hi, I'm</h2>
                    <h1 className="text-5xl md:text-7xl font-bold font-sans text-white mb-4 tracking-tight drop-shadow-lg">
                        Hass Dev
                    </h1>
                    <h3 className="text-2xl md:text-4xl font-semibold text-gray-300 mb-6 drop-shadow-md">
                        I'm a <span className="text-gradient">Full Stack Developer</span>
                    </h3>
                    <p className="text-lg text-gray-400 mb-3 max-w-lg drop-shadow-md">
                        BSc (Hons) IT Undergraduate
                    </p>
                    <p className="text-lg text-gray-400 mb-3 max-w-lg drop-shadow-md">
                        Java Developer
                    </p>
                    <p className="text-lg text-gray-400 mb-3 max-w-lg drop-shadow-md">
                        Spring Boot Enthusiast
                    </p>
                    <p className="text-lg text-gray-400 mb-8 max-w-lg drop-shadow-md">
                        AI Explorer
                    </p>
                    <div className="flex gap-4 pointer-events-auto">
                        <a href="#contact" className="px-8 py-3 bg-[#ff2a2a] hover:bg-red-600 text-white rounded-full font-medium transition-all shadow-[0_0_20px_rgba(255,42,42,0.4)] hover:shadow-[0_0_30px_rgba(255,42,42,0.6)]">
                            Hire Me
                        </a>
                        <a href="#projects" className="px-8 py-3 bg-transparent border border-white/20 hover:border-white/50 text-white rounded-full font-medium backdrop-blur-sm transition-all">
                            View Work
                        </a>
                    </div>
                </motion.div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce z-10 pointer-events-none">
                <span className="text-xs text-gray-400 uppercase tracking-widest mb-2 font-mono">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-[#ff2a2a] to-transparent"></div>
            </div>
        </section>
    );
};

export default Hero;
