import React from 'react';
import { FaGithub, FaLinkedin, FaMedium } from 'react-icons/fa';

export const Footer: React.FC = () => {
  const socialLinks = [
    { icon: <FaGithub />, href: 'https://github.com/tanishraj', label: 'GitHub' },
    { icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/itsmetanishraj/', label: 'LinkedIn' },
    { icon: <FaMedium />, href: 'https://medium.com/@tanish_rajput', label: 'Medium' },
  ];

  return (
    <footer className="relative z-10 py-16 border-t border-gray-800/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center">
          {/* Logo/Brand */}
          <div className="mb-6">
            <h3 className="text-3xl font-bold">
              Let's{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Connect
              </span>
            </h3>
            <p className="text-gray-400 mt-2 text-lg w-1/2 text-center mx-auto">
              Reach out for senior frontend roles, React/TypeScript work, design systems, or
              frontend modernization projects
            </p>
          </div>

          {/* Email */}
          <a
            href="mailto:hire.tanishraj@gmail.com"
            className="text-xl text-blue-400 hover:text-blue-300 transition-colors inline-block"
          >
            hire.tanishraj@gmail.com
          </a>

          {/* Social Links */}
          <div className="flex gap-4 justify-center mt-8 mb-8">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700/50 hover:border-gray-600 hover:scale-110 transition-all"
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
