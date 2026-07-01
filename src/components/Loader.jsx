import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

const Loader = ({ onLoaded }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center"
    >
      <div className="w-full h-full absolute inset-0">
        <Spline
          scene="https://prod.spline.design/7QqAC-Gjlj92PODW/scene.splinecode"
          onLoad={() => {
            setTimeout(() => {
              onLoaded();
            }, 2500);
          }}
        />
      </div>
    </motion.div>
  );
};

export default Loader;
