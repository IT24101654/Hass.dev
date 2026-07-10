import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';
import cvFile from '../assets/Yasith_Hasarinda_CV.pdf';
import myImage from '../assets/My 1.png';

const HeroDetails = () => {
  return (
    <section id="hero-details" className="relative w-full h-full overflow-hidden flex items-center">
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src={myImage}
          alt="Background"
          className="w-full h-full object-cover object-[65%_center] md:object-center opacity-100"
        />
        {/* Bottom fade to dark */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/40 to-[#0a0a0a]" />
      </div>

      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pointer-events-none pt-20 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-2xl pointer-events-auto"
        >
          <h2 className="text-lg md:text-2xl text-[#ff2a2a] font-mono mb-2">Hi, It's</h2>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-sans text-white mb-4 tracking-tight drop-shadow-lg">
            HASARINDA
          </h1>
          <h3 className="text-xl sm:text-2xl md:text-4xl font-semibold text-gray-300 mb-6 drop-shadow-md">
            I'm a <span className="text-gradient">Full Stack Developer</span>
          </h3>
          <p className="text-base sm:text-lg text-gray-400 mb-3 max-w-lg drop-shadow-md">
            BSc (Hons) IT Undergraduate
          </p>
          <p className="text-base sm:text-lg text-gray-400 mb-3 max-w-lg drop-shadow-md">
            Java Developer
          </p>
          <p className="text-base sm:text-lg text-gray-400 mb-3 max-w-lg drop-shadow-md">
            Spring Boot Enthusiast
          </p>
          <p className="text-base sm:text-lg text-gray-400 mb-8 max-w-lg drop-shadow-md">
            AI Explorer
          </p>
          <div className="flex flex-wrap gap-4 pointer-events-auto">
            <a href="#projects" className="px-7 sm:px-8 py-3 bg-[#ff2a2a] hover:bg-red-600 text-white rounded-full font-medium transition-all shadow-[0_0_20px_rgba(255,42,42,0.4)] hover:shadow-[0_0_30px_rgba(255,42,42,0.6)] text-sm sm:text-base">
              View my Work
            </a>
            <a
              href={cvFile}
              download="Yasith_Hasarinda_CV.pdf"
              className="flex items-center gap-2 px-7 sm:px-8 py-3 bg-transparent border border-white/20 hover:border-white/50 text-white rounded-full font-medium backdrop-blur-sm transition-all group text-sm sm:text-base"
            >
              <FiDownload size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
              Download CV
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroDetails;
