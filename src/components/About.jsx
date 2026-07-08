import React from 'react';
import { motion } from 'framer-motion';
import myImage from '../assets/My.png';

const About = () => {
  return (
    <section id="about" className="min-h-[100svh] py-6 md:py-10 flex flex-col justify-center w-full relative z-10">
      <div className="max-w-[1400px] mx-auto px-2 md:px-4 w-full">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 md:mb-8 tracking-wider">
          My Story
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-8 items-stretch w-full">

          {/* Column 1: Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-start lg:justify-center items-center w-full h-full pl-0"
          >
            <img
              src={myImage}
              alt="Yasith Lathika Hasarinda"
              className="w-[75%] md:w-[85%] lg:w-full max-w-[380px] aspect-[3.5/4.1] object-cover rounded-[100%] drop-shadow-[0_0_20px_rgba(255,42,42,0.2)]  hover:scale-105 transition-transform duration-700"
            />
          </motion.div>

          {/* Column 2: Who I Am */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="glass p-5 md:p-6 flex flex-col justify-center h-full"
          >
            <h3 className="text-lg md:text-2xl font-bold tracking-wide text-white mb-3 md:mb-4 border-l-4 border-[#ff2a2a] pl-3">Who I Am</h3>
            <p className="text-gray-300 font-light tracking-wide text-[13px] md:text-[14px] lg:text-[15px] leading-relaxed mb-4">
              I am <strong className="text-white font-semibold">Yasith Lathika Hasarinda</strong>, a passionate and dedicated <strong className="text-white font-semibold">BSc (Hons) Information Technology Undergraduate</strong> with a strong interest in <strong className="text-white font-semibold">Full Stack Development, Artificial Intelligence, and Software Engineering</strong>. I enjoy transforming ideas into modern, scalable, and user-friendly web applications that solve real-world problems.
            </p>
            <p className="text-gray-300 font-light tracking-wide text-[13px] md:text-[14px] lg:text-[15px] leading-relaxed">
              My journey in technology is driven by continuous learning and hands-on development. I have experience building projects using <strong className="text-white font-semibold">Java, Spring Boot, React, JavaScript, MERN Stack, MySQL, and modern web technologies</strong>, while constantly exploring emerging trends in AI and software architecture.
            </p>
          </motion.div>

          {/* Column 3: Education & Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass p-5 md:p-6 flex flex-col justify-center h-full"
          >
            <h3 className="text-lg md:text-2xl font-bold tracking-wide text-white mb-4 border-l-4 border-[#ff2a2a] pl-3">Education & Timeline</h3>
            <div className="space-y-5 md:space-y-6">
              <div className="relative pl-5 border-l-2 border-[#ff2a2a]/30">
                <div className="absolute w-3 h-3 bg-[#ff2a2a] rounded-full -left-[7px] top-1.5 shadow-[0_0_10px_rgba(255,42,42,0.8)]"></div>
                <h4 className="text-[14px] md:text-[16px] lg:text-[17px] font-semibold tracking-wide text-white">BSc (Hons) Information Technology</h4>
                <p className="text-[#ff2a2a] font-mono text-[11px] md:text-[12px] mb-1">2024 – Present</p>
                <p className="text-gray-400 font-light tracking-wide text-[12px] md:text-[13px] lg:text-[14px] leading-relaxed">Currently pursuing a Bachelor's degree in Information Technology, focusing on <strong className="text-gray-200 font-medium">Software Engineering, Full Stack Development, Artificial Intelligence, Data Structures & Algorithms, and Modern Web Technologies</strong>.</p>
              </div>
              <div className="relative pl-5 border-l-2 border-[#ff2a2a]/30">
                <div className="absolute w-3 h-3 bg-gray-600 rounded-full -left-[7px] top-1.5"></div>
                <h4 className="text-[14px] md:text-[16px] lg:text-[17px] font-semibold tracking-wide text-white">Full Stack Developer</h4>
                <p className="text-[#ff2a2a] font-mono text-[11px] md:text-[12px] mb-1">Self-Learning & Project Development</p>
                <p className="text-gray-400 font-light tracking-wide text-[12px] md:text-[13px] lg:text-[14px] leading-relaxed">Developed practical experience through academic and personal projects using <strong className="text-gray-200 font-medium">Java, Spring Boot, React, HTML, CSS, JavaScript, MERN Stack, MySQL, and REST APIs</strong>, with a strong focus on building scalable and efficient web applications.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;