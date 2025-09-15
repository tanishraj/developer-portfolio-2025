import { motion, useInView } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaGitAlt,
  FaFigma,
  FaPython,
} from 'react-icons/fa';
import {
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiMongodb,
  SiFirebase,
  SiRedux,
  SiGraphql,
  SiDocker,
} from 'react-icons/si';

const Skills: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const skillCategories = [
    {
      title: 'Frontend Development',
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'React', level: 95, icon: <FaReact /> },
        { name: 'TypeScript', level: 90, icon: <SiTypescript /> },
        { name: 'Next.js', level: 85, icon: <SiNextdotjs /> },
        { name: 'Tailwind CSS', level: 92, icon: <SiTailwindcss /> },
        { name: 'Redux', level: 80, icon: <SiRedux /> },
      ],
    },
    {
      title: 'Backend Development',
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'Node.js', level: 88, icon: <FaNodeJs /> },
        { name: 'MongoDB', level: 82, icon: <SiMongodb /> },
        { name: 'GraphQL', level: 75, icon: <SiGraphql /> },
        { name: 'Firebase', level: 85, icon: <SiFirebase /> },
        { name: 'Python', level: 78, icon: <FaPython /> },
      ],
    },
    {
      title: 'Tools & Design',
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'Git', level: 90, icon: <FaGitAlt /> },
        { name: 'Figma', level: 85, icon: <FaFigma /> },
        { name: 'Docker', level: 70, icon: <SiDocker /> },
        { name: 'HTML5', level: 95, icon: <FaHtml5 /> },
        { name: 'CSS3', level: 93, icon: <FaCss3Alt /> },
      ],
    },
  ];

  const techStack = [
    { icon: <FaReact />, name: 'React', color: 'text-cyan-400' },
    { icon: <SiTypescript />, name: 'TypeScript', color: 'text-blue-400' },
    { icon: <SiNextdotjs />, name: 'Next.js', color: 'text-white' },
    { icon: <FaNodeJs />, name: 'Node.js', color: 'text-green-400' },
    { icon: <SiTailwindcss />, name: 'Tailwind', color: 'text-cyan-300' },
    { icon: <SiMongodb />, name: 'MongoDB', color: 'text-green-500' },
    { icon: <FaGitAlt />, name: 'Git', color: 'text-orange-400' },
    { icon: <FaFigma />, name: 'Figma', color: 'text-purple-400' },
  ];

  return (
    <section id="skills" className="py-20 px-4 relative overflow-hidden">
      {/* Interactive background gradient that follows mouse */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 40%)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-sm text-blue-400 mb-6"
          >
            Skills & Expertise
          </motion.span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            My Technical{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Constantly learning and improving my craft with modern technologies
          </p>
        </motion.div>

        {/* Animated Tech Stack Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 mb-16"
        >
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.2,
                rotate: 360,
                transition: { duration: 0.5 },
              }}
              className="group relative"
            >
              <div className="p-4 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-gray-700 transition-all duration-300">
                <span
                  className={`text-4xl ${tech.color} group-hover:scale-110 transition-transform`}
                >
                  {tech.icon}
                </span>
              </div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap"
              >
                {tech.name}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills with Progress Bars */}
        <div ref={ref} className="grid lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300"
            >
              <h3
                className={`text-xl font-bold mb-6 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}
              >
                {category.title}
              </h3>

              <div className="space-y-4">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg text-gray-400">{skill.icon}</span>
                        <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">{skill.level}%</span>
                    </div>

                    <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{
                          duration: 1.5,
                          delay: index * 0.1,
                          ease: 'easeOut',
                        }}
                        className={`absolute top-0 left-0 h-full bg-gradient-to-r ${category.color} rounded-full`}
                      >
                        <motion.div
                          animate={{
                            opacity: [0.5, 1, 0.5],
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg shadow-white/50"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Code snippet animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="ml-auto text-xs text-gray-500">skills.js</span>
          </div>

          <pre className="text-sm overflow-x-auto">
            <code className="language-javascript">
              {`const developer = {
  languages: ['JavaScript', 'TypeScript', 'Python'],
  frameworks: ['React', 'Next.js', 'Node.js'],
  tools: ['Git', 'Docker', 'Figma'],
  currentlyLearning: 'Web3 & Blockchain',
  funFact: 'I can debug faster with coffee ☕'
};`}
            </code>
          </pre>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
