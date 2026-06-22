import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="min-h-[100svh] py-6 md:py-32 flex flex-col justify-center w-full">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-2xl md:text-5xl font-bold text-white mb-6 md:mb-16 tracking-wider">
                    <span className="text-[#ff2a2a] font-mono text-base md:text-2xl block mb-1 md:mb-4">01.</span>
                    About Me
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="glass p-5 md:p-8"
                    >
                        <h3 className="text-lg md:text-2xl font-bold tracking-wide text-white mb-3 md:mb-4 border-l-4 border-[#ff2a2a] pl-3 md:pl-4">Who I Am</h3>
                        <p className="text-gray-300 font-light tracking-wide text-[12px] sm:text-[13px] md:text-base leading-[1.7] md:leading-relaxed mb-3 md:mb-4">
                            I am <strong className="text-white font-semibold">Yasith Lathika Hasarinda</strong>, a passionate and dedicated <strong className="text-white font-semibold">BSc (Hons) Information Technology Undergraduate</strong> with a strong interest in <strong className="text-white font-semibold">Full Stack Development, Artificial Intelligence, and Software Engineering</strong>. I enjoy transforming ideas into modern, scalable, and user-friendly web applications that solve real-world problems.
                        </p>
                        <p className="text-gray-300 font-light tracking-wide text-[12px] sm:text-[13px] md:text-base leading-[1.7] md:leading-relaxed mb-2 md:mb-4">
                            My journey in technology is driven by continuous learning and hands-on development. I have experience building projects using <strong className="text-white font-semibold">Java, Spring Boot, React, JavaScript, MERN Stack, MySQL, and modern web technologies</strong>, while constantly exploring emerging trends in AI and software architecture.
                        </p>

                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="glass p-5 md:p-8"
                    >
                        <h3 className="text-lg md:text-2xl font-bold tracking-wide text-white mb-4 md:mb-6 border-l-4 border-[#ff2a2a] pl-3 md:pl-4">Education & Timeline</h3>
                        <div className="space-y-5 md:space-y-8">
                            <div className="relative pl-4 md:pl-8 border-l-2 border-[#ff2a2a]/30">
                                <div className="absolute w-3 h-3 md:w-4 md:h-4 bg-[#ff2a2a] rounded-full -left-[7px] md:-left-[9px] top-1 shadow-[0_0_10px_rgba(255,42,42,0.8)]"></div>
                                <h4 className="text-[14px] md:text-xl font-semibold tracking-wide text-white">BSc (Hons) Information Technology</h4>
                                <p className="text-[#ff2a2a] font-mono text-[10px] md:text-sm mb-1 md:mb-2">2024 – Present</p>
                                <p className="text-gray-400 font-light tracking-wide text-[11px] sm:text-[12px] md:text-base leading-[1.7] md:leading-normal">Currently pursuing a Bachelor's degree in Information Technology, focusing on <strong className="text-gray-200 font-medium">Software Engineering, Full Stack Development, Artificial Intelligence, Data Structures & Algorithms, and Modern Web Technologies</strong>.</p>
                            </div>
                            <div className="relative pl-4 md:pl-8 border-l-2 border-[#ff2a2a]/30">
                                <div className="absolute w-3 h-3 md:w-4 md:h-4 bg-gray-600 rounded-full -left-[7px] md:-left-[9px] top-1"></div>
                                <h4 className="text-[14px] md:text-xl font-semibold tracking-wide text-white">Full Stack Developer</h4>
                                <p className="text-[#ff2a2a] font-mono text-[10px] md:text-sm mb-1 md:mb-2">Self-Learning & Project Development</p>
                                <p className="text-gray-400 font-light tracking-wide text-[11px] sm:text-[12px] md:text-base leading-[1.7] md:leading-normal">Developed practical experience through academic and personal projects using <strong className="text-gray-200 font-medium">Java, Spring Boot, React, HTML, CSS, JavaScript, MERN Stack, MySQL, and REST APIs</strong>, with a strong focus on building scalable and efficient web applications.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
