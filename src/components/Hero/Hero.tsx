import { motion } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaDribbble, FaBehance } from 'react-icons/fa';

const Hero: React.FC = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const socialLinks = [
    { icon: <FaGithub />, href: 'https://github.com' },
    { icon: <FaLinkedin />, href: 'https://linkedin.com' },
    { icon: <FaInstagram />, href: 'https://instagram.com' },
    { icon: <FaDribbble />, href: 'https://dribbble.com' },
    { icon: <FaBehance />, href: 'https://behance.net' },
  ];

  const roles = useMemo(() => {
    return [
      'Frontend Engineer',
      'React Developer',
      'UI/UX Enthusiast',
      'Problem Solver',
      'Creative Coder',
    ];
  }, []) ;

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentRole.length) {
            setDisplayText(currentRole.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100,
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex, roles]);

  const codeSnippet = `const developer = {
  name: 'Tanish Raj',
  skills: ['React', 'TypeScript', 'Node.js'],
  passion: 'Building Amazing Experiences',
  motto: 'Code. Create. Innovate.'
};`;

  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center justify-center px-4 pt-20 overflow-hidden"
    >
      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
      />

      <div className="max-w-6xl mx-auto w-full z-10 grid xl:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="text-center xl:text-left">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6"
          >
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            <span className="text-sm text-blue-400">Available for Work</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl xl:text-7xl font-bold mb-6"
          >
            <span className="text-gray-400">Hi, I'm</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Tanish Raj
            </span>
          </motion.h1>

          <div className="text-2xl xl:text-3xl mb-8 h-10">
            <span className="text-gray-400">I'm a </span>
            <span className="text-blue-400 font-semibold">
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                className="inline-block w-0.5 h-8 bg-blue-400 ml-1 align-middle"
              />
            </span>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-400 text-lg mb-8 leading-relaxed"
          >
            Crafting elegant solutions with modern web technologies. Specialized in building
            responsive, performant, and user-friendly applications.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-wrap gap-4 justify-center xl:justify-start mb-8"
          >
            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-gray-600 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-800/50 transition-all duration-300"
            >
              Get In Touch
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex gap-3 justify-center xl:justify-start"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Right Content - Code Display */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative hidden xl:block"
        >
          <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="ml-auto text-xs text-gray-500">developer.js</span>
            </div>

            <pre className="text-sm xl:text-base overflow-x-auto">
              <code className="language-javascript">
                {codeSnippet.split('\n').map((line, index) => (
                  <motion.div
                    key={line}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="leading-relaxed"
                  >
                    {line.split(/(\s+|[{}[\](),;'"]|:|=)/).map((part) => {
                      if (/^['"].*['"]$/.test(part)) {
                        return (
                          <span key={part} className="text-green-400">
                            {part}
                          </span>
                        );
                      } else if (/^(const|let|var)$/.test(part)) {
                        return (
                          <span key={part} className="text-purple-400">
                            {part}
                          </span>
                        );
                      } else if (/^(true|false|null|undefined)$/.test(part)) {
                        return (
                          <span key={part} className="text-orange-400">
                            {part}
                          </span>
                        );
                      } else if (/^[{}[\](),;]$/.test(part)) {
                        return (
                          <span key={part} className="text-gray-500">
                            {part}
                          </span>
                        );
                      } else if (part === '=' || part === ':') {
                        return (
                          <span key={part} className="text-blue-400">
                            {part}
                          </span>
                        );
                      }
                      return (
                        <span key={part} className="text-gray-300">
                          {part}
                        </span>
                      );
                    })}
                  </motion.div>
                ))}
              </code>
            </pre>
          </div>

          {/* Floating badges */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -top-4 -right-4 px-3 py-1 bg-blue-500 rounded-full text-sm font-semibold"
          >
            React Expert
          </motion.div>

          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              delay: 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -bottom-4 -left-4 px-3 py-1 bg-purple-500 rounded-full text-sm font-semibold"
          >
            TypeScript
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
