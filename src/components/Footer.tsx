import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: <FaGithub />, href: 'https://github.com', label: 'GitHub' },
    { icon: <FaLinkedin />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <FaTwitter />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <FaInstagram />, href: 'https://instagram.com', label: 'Instagram' },
  ];

  return (
    <footer className="relative z-10 py-16 bg-[#0a0f1b] border-t border-gray-800/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center">
          {/* Logo/Brand */}
          <div className="mb-6">
            <h3 className="text-3xl font-bold text-white">Let's Connect</h3>
            <p className="text-gray-400 mt-2 text-lg">
              Feel free to reach out for collaborations or just a friendly hello
            </p>
          </div>

          {/* Email */}
          <a
            href="mailto:hello@example.com"
            className="text-xl text-blue-400 hover:text-blue-300 transition-colors inline-block"
          >
            hello@example.com
          </a>

          {/* Social Links */}
          <div className="flex gap-4 justify-center mt-8 mb-8">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700/50 hover:border-gray-600 transition-all"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-gray-800/50">
            <p className="text-gray-400 text-base">
              © {new Date().getFullYear()} All rights reserved. Built with React & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
