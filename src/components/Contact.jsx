import React, { useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa6';
import { FiMail, FiMapPin } from 'react-icons/fi';
import { motion } from 'framer-motion';
import personImg from '../assets/My_transparent_1.png';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/meebvqav', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('sent');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const infoItems = [
    { icon: <FiMail className="w-[16px] h-[16px] sm:w-[22px] sm:h-[22px]" />, text: 'yasith.hasarinda2003@gmail.com', href: 'mailto:yasith.hasarinda2003@gmail.com' },
    { icon: <FiMapPin className="w-[16px] h-[16px] sm:w-[22px] sm:h-[22px]" />, text: 'Ampara, Sri Lanka', href: 'https://www.google.com/maps/place/Ampara,+Sri+Lanka' },
  ];

  return (
    <section id="contact" className="has-noise min-h-fit md:min-h-[100svh] flex flex-col justify-center w-full relative z-10 pt-20 md:pt-10 pb-3 md:pb-10 overflow-hidden">

      {/* ── HUGE BACKGROUND WATERMARK TEXT (Behind Person) ── */}
      <div className="absolute right-0 top-0 bottom-0 pointer-events-none select-none z-0 overflow-hidden flex flex-col justify-center" style={{ width: '60%' }}>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="flex flex-col whitespace-nowrap text-right"
          style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(4rem, 14vw, 22rem)',
            fontWeight: 900,
            lineHeight: 0.85,
            letterSpacing: '10px',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
            background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'3\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.08\'/%3E%3C/svg%3E"), rgba(255, 255, 255, 0.04)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            transform: 'translateX(5%)',
          }}
        >
          <span>GET</span>
          <span>IN</span>
          <span>TOUCH</span>
        </motion.div>
      </div>

      <style>{`
                .ct-inner {
                    position: relative;
                    z-index: 10;
                    width: 100%;
                    max-width: 1000px;
                    margin: 0;
                    margin-left: clamp(1rem, 12vw, 12vw);
                    padding: 0;
                    box-sizing: border-box;
                }
                .ct-grid {
                    display: grid;
                    grid-template-columns: 1fr 1.1fr;
                    gap: 2.5rem;
                }
                @media (max-width: 768px) {
                    .ct-grid { grid-template-columns: 1fr; }
                }
                .ct-glass {
                    position: relative;
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%);
                    border: 0px solid rgba(255, 255, 255, 0.05);
                    border-top: 0px solid rgba(255, 255, 255, 0.3);
                    border-left: 0px solid rgba(255, 255, 255, 0.2);
                    border-radius: 24px;
                    padding: 2.5rem;
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    transform: translate(-10px, -10px);
                    z-index: 10;
                    box-shadow: ${Array.from({ length: 60 }).map((_, i) => i === 0 ? '1px 1px 0 rgba(255,255,255,0.15)' : `${i + 1}px ${i + 1}px 0 rgba(5, 5, 5, ${0.05 * (1 - i / 60)})`).join(', ')}, 60px 60px 40px rgba(0,0,0,0.6);
                }

                .ct-label {
                    display: block;
                    color: rgba(255,255,255,0.45);
                    font-size: 0.85rem;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    margin-bottom: 0.5rem;
                }
                .ct-input {
                    width: 100%;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.09);
                    border-radius: 12px;
                    padding: 0.75rem 1rem;
                    color: #fff;
                    font-size: 0.95rem;
                    font-family: 'Inter', sans-serif;
                    outline: none;
                    transition: border-color 0.2s, box-shadow 0.2s;
                    box-sizing: border-box;
                }
                .ct-input:focus {
                    border-color: rgba(255,42,42,0.5);
                    box-shadow: 0 0 0 3px rgba(255,42,42,0.08);
                }
                .ct-input::placeholder { color: rgba(255,255,255,0.18); }
                textarea.ct-input { resize: vertical; min-height: 140px; }
                .ct-btn {
                    width: 100%;
                    background: #ff2a2a;
                    color: #fff;
                    font-weight: 700;
                    font-size: 0.95rem;
                    border: none;
                    border-radius: 12px;
                    padding: 0.85rem;
                    cursor: pointer;
                    letter-spacing: 0.03em;
                    transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
                    box-shadow: 0 0 20px rgba(255,42,42,0.25);
                    box-sizing: border-box;
                }
                .ct-btn:hover { background: #ff4a4a; box-shadow: 0 0 30px rgba(255,42,42,0.4); transform: translateY(-1px); }
                .ct-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
                .ct-info-row {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    color: rgba(255,255,255,0.55);
                    font-size: 0.95rem;
                    text-decoration: none;
                    transition: color 0.2s;
                    margin-bottom: 1.2rem;
                }
                .ct-info-row:hover { color: #ff2a2a; }
                .ct-icon-wrap {
                    width: 44px;
                    height: 44px;
                    border-radius: 12px;
                    background: rgba(255,42,42,0.08);
                    border: 1px solid rgba(255,42,42,0.15);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #ff2a2a;
                    flex-shrink: 0;
                }
                .ct-social-btn {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.09);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: rgba(255,255,255,0.6);
                    transition: background 0.2s, color 0.2s, border-color 0.2s;
                    text-decoration: none;
                }
                .ct-social-btn:hover {
                    background: rgba(255,42,42,0.12);
                    border-color: rgba(255,42,42,0.3);
                    color: #ff2a2a;
                }

                @media (max-width: 640px) {
                    .ct-grid { gap: 1rem; }
                    .ct-glass { padding: 1rem 0.75rem; border-radius: 12px; transform: translate(0, 0); }
                    .ct-inner { padding: 0 1rem; margin-left: 0; }
                    .ct-info-row { font-size: 0.8rem; margin-bottom: 0.5rem; gap: 0.5rem; }
                    .ct-icon-wrap { width: 36px; height: 36px; border-radius: 8px; }
                    .ct-social-btn { width: 36px; height: 36px; }
                    .ct-input { font-size: 0.8rem; padding: 0.6rem 0.8rem; }
                    .ct-btn { padding: 0.65rem; font-size: 0.8rem; box-sizing: border-box; }
                    .ct-label { font-size: 0.65rem; margin-bottom: 0.3rem; }
                }
            `}</style>

      <div className="ct-inner">
        {/* Heading */}
        <div className="mb-6 md:mb-8">
          <h2 className="font-black text-white uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.5rem,3.5vw,5rem)', lineHeight: 0.88 }}>Let's Connect</h2>
        </div>

        <div className="ct-grid">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="ct-glass flex flex-col justify-between"
          >
            <div>
              <h3 className="text-white font-bold text-base md:text-xl mb-2 md:mb-3 border-l-4 border-[#ff2a2a] pl-2 md:pl-3">Get in Touch</h3>
              <p className="text-gray-400 text-[11px] md:text-sm leading-relaxed mb-4 md:mb-8">
                I'm open to new opportunities and collaborations. <br />
                Have a project, question, or just want to say hi? <br />
                I'll get back to you as soon as possible.
              </p>

              {infoItems.map((item, i) =>
                item.href ? (
                  <a key={i} href={item.href} className="ct-info-row">
                    <div className="ct-icon-wrap">{item.icon}</div>
                    {item.text}
                  </a>
                ) : (
                  <div key={i} className="ct-info-row">
                    <div className="ct-icon-wrap">{item.icon}</div>
                    {item.text}
                  </div>
                )
              )}
            </div>

            <div>
              <p className="text-gray-500 text-[10px] md:text-sm uppercase tracking-widest mb-3 md:mb-4 font-semibold">Social</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-4">
                <a href="https://github.com/IT24101654" target="_blank" rel="noopener noreferrer" className="ct-social-btn" title="GitHub">
                  <FaGithub className="w-[12px] h-[12px] sm:w-[22px] sm:h-[22px]" />
                </a>
                <a href="https://www.linkedin.com/in/yasithhasarinda" target="_blank" rel="noopener noreferrer" className="ct-social-btn" title="LinkedIn">
                  <FaLinkedin className="w-[12px] h-[12px] sm:w-[22px] sm:h-[22px]" />
                </a>
                <a href="https://www.facebook.com/yasith.lathika" target="_blank" rel="noopener noreferrer" className="ct-social-btn" title="Facebook">
                  <FaFacebook className="w-[12px] h-[12px] sm:w-[22px] sm:h-[22px]" />
                </a>
                <a href="https://www.instagram.com/hasa__rinda" target="_blank" rel="noopener noreferrer" className="ct-social-btn" title="Instagram">
                  <FaInstagram className="w-[12px] h-[12px] sm:w-[22px] sm:h-[22px]" />
                </a>
                <a href="https://www.tiktok.com/@hase_24" target="_blank" rel="noopener noreferrer" className="ct-social-btn" title="TikTok">
                  <FaTiktok className="w-[12px] h-[12px] sm:w-[22px] sm:h-[22px]" />
                </a>
                <a href="https://wa.me/94779114877" target="_blank" rel="noopener noreferrer" className="ct-social-btn" title="WhatsApp">
                  <FaWhatsapp className="w-[12px] h-[12px] sm:w-[22px] sm:h-[22px]" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="ct-glass relative"
          >
            {/* ── BACKGROUND IMAGE (Person from Intro) ── */}
            <div className="absolute inset-0 w-full h-full z-20 pointer-events-none overflow-visible">
              <img
                src={personImg}
                alt="Background Person"
                className="absolute top-[auto] bottom-[100%] md:bottom-[-30%] right-[-40%] md:right-[-35%] xl:right-[-206%] h-[90%] md:h-[155%] w-auto max-w-none object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] scale-x-[-1] md:scale-x-100 pointer-events-none"
              />
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-30">
              <div>
                <label className="ct-label">Name</label>
                <input className="ct-input" type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <label className="ct-label">Email</label>
                <input className="ct-input" type="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required />
              </div>
              <div>
                <label className="ct-label">Message</label>
                <textarea className="ct-input" name="message" placeholder="What's on your mind?" value={formData.message} onChange={handleChange} required />
              </div>
              <button className="ct-btn" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send Message →'}
              </button>
              {status === 'sent' && <p className="text-green-400 text-sm text-center">✓ Message sent! I'll get back to you soon.</p>}
              {status === 'error' && <p className="text-red-400 text-sm text-center">✗ Something went wrong. Try again or email directly.</p>}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
