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
            className="inline-block px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-full text-sm text-green-400 mb-6"
          >
            Skills & Expertise
          </motion.span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Technical{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Proficiencies
            </span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and expertise levels
          </p>
        </motion.div>

        {/* Main Skills Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
            >
              <div className="flex items-center mb-6">
                <div
                  className={`w-2 h-8 bg-gradient-to-b ${category.color} rounded-full mr-3`}
                />
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`text-2xl bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                          {skill.icon}
                        </div>
                        <span className="text-white font-medium">{skill.name}</span>
                      </div>
                      <span className="text-gray-400 text-sm">{skill.level}%</span>
                    </div>
                    
                    <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className={`absolute left-0 top-0 h-full bg-gradient-to-r ${category.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 + skillIndex * 0.05 }}
                        viewport={{ once: true }}
                      />
                      <div 
                        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-shimmer"
                        style={{ animationDelay: `${skillIndex * 0.2}s` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Showcase */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            Primary Tech Stack
          </h3>
          
          <div className="flex flex-wrap justify-center gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="group relative"
              >
                <div className="w-20 h-20 bg-gray-800/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center border border-gray-700 group-hover:border-gray-600 transition-all cursor-pointer">
                  <div className={`text-3xl ${tech.color} transition-transform group-hover:scale-110`}>
                    {tech.icon}
                  </div>
                  <span className="text-xs text-gray-400 mt-2">{tech.name}</span>
                </div>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 blur-xl transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Experience Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { label: 'Years of Experience', value: '5+', color: 'from-blue-400 to-cyan-400' },
            { label: 'Projects Completed', value: '50+', color: 'from-purple-400 to-pink-400' },
            { label: 'Technologies Mastered', value: '20+', color: 'from-green-400 to-emerald-400' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h4 className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </h4>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;