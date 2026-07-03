import React, { useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa6';
import { FiMail, FiMapPin } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // 'sending' | 'sent' | 'error'

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
    { icon: <FiMail size={22} />, text: 'yasith.hasarinda2003@gmail.com', href: 'mailto:yasith.hasarinda2003@gmail.com' },
    { icon: <FiMapPin size={22} />, text: 'Ampara, Sri Lanka', href: null },
  ];

  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center w-full relative z-10 py-10">
      <style>{`
                .ct-inner {
                    width: 100%;
                    max-width: 1350px;
                    margin: 0 auto;
                    padding: 0 4rem;
                    box-sizing: border-box;
                }
                .ct-grid {
                    display: grid;
                    grid-template-columns: 1fr 1.4fr;
                    gap: 2rem;
                }
                @media (max-width: 768px) {
                    .ct-grid { grid-template-columns: 1fr; }
                }
                .ct-glass {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 24px;
                    padding: 2.8rem;
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
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
                    padding: 0.85rem 1.1rem;
                    color: #fff;
                    font-size: 1.05rem;
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
                    font-size: 1.05rem;
                    border: none;
                    border-radius: 12px;
                    padding: 1rem;
                    cursor: pointer;
                    letter-spacing: 0.03em;
                    transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
                    box-shadow: 0 0 20px rgba(255,42,42,0.25);
                }
                .ct-btn:hover { background: #ff4a4a; box-shadow: 0 0 30px rgba(255,42,42,0.4); transform: translateY(-1px); }
                .ct-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
                .ct-info-row {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    color: rgba(255,255,255,0.55);
                    font-size: 1.05rem;
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
            `}</style>

      <div className="ct-inner">
        {/* Heading */}
        <div className="mb-8">
          <span style={{ color: '#ff2a2a', fontFamily: "'Fira Code', monospace", fontSize: '1.125rem', display: 'block', marginBottom: '0.15rem' }}>04.</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white">Let's Connect</h2>
        </div>

        <div className="ct-grid">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="ct-glass flex flex-col justify-between"
          >
            <div>
              <h3 className="text-white font-bold text-2xl mb-3 border-l-4 border-[#ff2a2a] pl-3">Get in Touch</h3>
              <p className="text-gray-400 text-base leading-relaxed mb-8">
                I'm open to new opportunities and collaborations. Have a project, question, or just want to say hi? I'll get back to you as soon as possible.
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
              <p className="text-gray-500 text-sm uppercase tracking-widest mb-4 font-semibold">Social</p>
              <div className="flex flex-wrap gap-4">
                <a href="https://github.com/IT24101654" target="_blank" rel="noopener noreferrer" className="ct-social-btn" title="GitHub">
                  <FaGithub size={22} />
                </a>
                <a href="https://www.linkedin.com/in/yasithhasarinda" target="_blank" rel="noopener noreferrer" className="ct-social-btn" title="LinkedIn">
                  <FaLinkedin size={22} />
                </a>
                <a href="https://www.facebook.com/yasith.lathika" target="_blank" rel="noopener noreferrer" className="ct-social-btn" title="Facebook">
                  <FaFacebook size={22} />
                </a>
                <a href="https://www.instagram.com/hasa_rinda" target="_blank" rel="noopener noreferrer" className="ct-social-btn" title="Instagram">
                  <FaInstagram size={22} />
                </a>
                <a href="https://www.tiktok.com/@hase_24" target="_blank" rel="noopener noreferrer" className="ct-social-btn" title="TikTok">
                  <FaTiktok size={22} />
                </a>
                <a href="https://wa.me/94779114877" target="_blank" rel="noopener noreferrer" className="ct-social-btn" title="WhatsApp">
                  <FaWhatsapp size={22} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="ct-glass"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
