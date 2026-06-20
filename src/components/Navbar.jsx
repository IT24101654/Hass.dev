import './Navbar.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo"><span>H</span>ass.dev</div>

            <ul className="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#contact">Contact</a></li>

            </ul>

            <div className="flex items-center gap-5">
                <a
                    href="#contact"
                    className="bg-[#ff2a2a] hover:bg-red-600 text-white px-5 py-2 rounded-lg font-medium transition-colors text-sm shadow-[0_0_10px_rgba(255,42,42,0.3)] hover:shadow-[0_0_15px_rgba(255,42,42,0.5)]"
                >
                    Hire Me
                </a>
                <a href="https://github.com/IT24101654" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                    <FaGithub size={22} />
                </a>
                <a href="https://www.linkedin.com/in/yasithhasarinda" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                    <FaLinkedin size={22} />
                </a>
                <a href="mailto:yasith.hasarinda2003@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                    <FiMail size={24} />
                </a>
            </div>
        </nav>
    )
}

export default Navbar;
