import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="min-h-screen py-8 md:py-32 flex flex-col justify-center w-full">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 md:mb-16">
                    <span className="text-[#ff2a2a] font-mono text-lg md:text-2xl block mb-1 md:mb-4">01.</span>
                    About Me
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
                    {/* වම් පැත්තේ කොටස */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="glass p-5 md:p-8"
                    >
                        <h3 className="text-lg md:text-2xl font-bold text-white mb-3 md:mb-4 border-l-4 border-[#ff2a2a] pl-3 md:pl-4">Who I Am</h3>
                        <p className="text-gray-300 text-[13px] sm:text-sm md:text-lg leading-snug md:leading-relaxed mb-3 md:mb-6">
                            I am Yasith Hasarinda, a highly motivated Full Stack Developer and BSc (Hons) IT Undergraduate. My passion lies in building scalable web applications, experimenting with Artificial Intelligence, and crafting immersive digital experiences.
                        </p>
                        <p className="text-gray-300 text-[13px] sm:text-sm md:text-lg leading-snug md:leading-relaxed">
                            When I'm not coding, I'm exploring the latest trends in tech, designing UI/UX concepts, or working on innovative side projects like J.A.R.V.I.S and NeoSchool.
                        </p>
                    </motion.div>

                    {/* දකුණු පැත්තේ කොටස */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="glass p-5 md:p-8"
                    >
                        <h3 className="text-lg md:text-2xl font-bold text-white mb-4 md:mb-6 border-l-4 border-[#ff2a2a] pl-3 md:pl-4">Education & Timeline</h3>
                        <div className="space-y-4 md:space-y-8">
                            <div className="relative pl-5 md:pl-8 border-l-2 border-[#ff2a2a]/30">
                                <div className="absolute w-3 h-3 md:w-4 md:h-4 bg-[#ff2a2a] rounded-full -left-[7px] md:-left-[9px] top-1 shadow-[0_0_10px_rgba(255,42,42,0.8)]"></div>
                                <h4 className="text-[15px] md:text-xl font-bold text-white">BSc (Hons) Information Technology</h4>
                                <p className="text-[#ff2a2a] font-mono text-[10px] md:text-sm mb-1 md:mb-2">2023 - Present</p>
                                <p className="text-gray-400 text-[12px] sm:text-sm md:text-base leading-snug md:leading-normal">Currently pursuing my undergraduate degree, focusing on Software Engineering, AI/ML, and modern web architectures.</p>
                            </div>
                            <div className="relative pl-5 md:pl-8 border-l-2 border-[#ff2a2a]/30">
                                <div className="absolute w-3 h-3 md:w-4 md:h-4 bg-gray-600 rounded-full -left-[7px] md:-left-[9px] top-1"></div>
                                <h4 className="text-[15px] md:text-xl font-bold text-white">Full Stack Java Developer</h4>
                                <p className="text-[#ff2a2a] font-mono text-[10px] md:text-sm mb-1 md:mb-2">Self-Taught & Certifications</p>
                                <p className="text-gray-400 text-[12px] sm:text-sm md:text-base leading-snug md:leading-normal">Mastered Spring Boot, React, and Database management through rigorous project-based learning.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
