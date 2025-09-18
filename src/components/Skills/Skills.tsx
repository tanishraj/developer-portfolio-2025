import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';
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

export const Skills: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const skillCategories = [
    {
      title: 'Frontend Development',
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/20 to-cyan-500/20',
      icon: '🎨',
      description: 'Building beautiful, responsive user interfaces with modern frameworks and libraries for optimal user experience',
      skills: [
        { name: 'React', icon: <FaReact /> },
        { name: 'TypeScript', icon: <SiTypescript /> },
        { name: 'Next.js', icon: <SiNextdotjs /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
        { name: 'Redux', icon: <SiRedux /> },
      ],
      highlights: [
        'Single Page Applications',
        'Component Libraries',
        'State Management',
        'Performance Optimization',
        'Responsive Design',
      ],
    },
    {
      title: 'Backend Development',
      color: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/20 to-pink-500/20',
      icon: '⚙️',
      description: 'Creating scalable server-side applications and RESTful APIs with robust architecture and security practices',
      skills: [
        { name: 'Node.js', icon: <FaNodeJs /> },
        { name: 'MongoDB', icon: <SiMongodb /> },
        { name: 'GraphQL', icon: <SiGraphql /> },
        { name: 'Firebase', icon: <SiFirebase /> },
        { name: 'Python', icon: <FaPython /> },
      ],
      highlights: [
        'RESTful API Design',
        'Database Architecture',
        'Authentication & Security',
        'Cloud Services',
        'Microservices',
      ],
    },
    {
      title: 'Tools & Design',
      color: 'from-green-500 to-teal-500',
      bgGradient: 'from-green-500/20 to-teal-500/20',
      icon: '🛠️',
      description: 'Leveraging modern tools and design systems for efficient development workflow and seamless collaboration',
      skills: [
        { name: 'Git', icon: <FaGitAlt /> },
        { name: 'Figma', icon: <FaFigma /> },
        { name: 'Docker', icon: <SiDocker /> },
        { name: 'HTML5', icon: <FaHtml5 /> },
        { name: 'CSS3', icon: <FaCss3Alt /> },
      ],
      highlights: [
        'Version Control',
        'UI/UX Design',
        'Containerization',
        'CI/CD Pipelines',
        'Agile Methodology',
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
            Technical{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
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
              className="group relative"
            >
              <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all h-full flex flex-col">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Title - Single Line */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{category.icon}</span>
                    <h3 className="text-xl font-bold text-white truncate">{category.title}</h3>
                  </div>
                  
                  {/* Description - 2 Lines */}
                  <p className="text-gray-400 text-sm mb-6 line-clamp-2 min-h-[2.5rem]">
                    {category.description}
                  </p>
                  
                  {/* Technology Icons - No Borders */}
                  <div className="flex flex-wrap gap-4 mb-6 min-h-[3rem]">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 + skillIndex * 0.05 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.2 }}
                        className="group/icon relative"
                      >
                        <div className={`text-2xl ${category.color === 'from-blue-500 to-cyan-500' ? 'text-cyan-400' : category.color === 'from-purple-500 to-pink-500' ? 'text-purple-400' : 'text-green-400'} transition-transform`}>
                          {skill.icon}
                        </div>
                        {/* Tooltip */}
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/icon:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                          {skill.name}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Highlights - Exactly 5 Points */}
                  <div className="space-y-2 flex-grow">
                    {category.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm">
                        <svg
                          className="w-4 h-4 text-green-500 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-400">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Corner accent */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${category.color} opacity-10 rounded-tr-2xl rounded-bl-[40px]`} />
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
          <h3 className="text-2xl font-bold text-center mb-12">
            Primary{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Tech Stack
            </span>
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

