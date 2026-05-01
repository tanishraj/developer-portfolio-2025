import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaReact, FaMobileAlt, FaUniversity } from 'react-icons/fa';
import {
  SiTypescript,
  SiTailwindcss,
  SiRedux,
  SiGraphql,
  SiVuedotjs,
  SiApollographql,
  SiVite,
  SiJest,
} from 'react-icons/si';

export const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Work', count: 6 },
    { id: 'finance', label: 'Fintech', count: 2 },
    { id: 'banking', label: 'Banking', count: 2 },
    { id: 'enterprise', label: 'Enterprise', count: 2 },
  ];

  const projects = [
    {
      id: 1,
      category: 'finance',
      title: 'Liquidity Capital Finance Platforms',
      description:
        'Data-heavy capital formation and private credit workflows built with React, TypeScript, Vite, Apollo Client, and GraphQL.',
      image: 'https://via.placeholder.com/400x300/2563EB/ffffff?text=Finance+Platform',
      technologies: [
        { icon: <FaReact />, name: 'React' },
        { icon: <SiTypescript />, name: 'TypeScript' },
        { icon: <SiGraphql />, name: 'GraphQL' },
      ],
      github: 'https://github.com/tanishraj',
      live: 'https://www.tanishraj.vercel.app',
      featured: true,
    },
    {
      id: 2,
      category: 'finance',
      title: 'AI Assistant & Lexical Editor Workflows',
      description:
        'Rich text and AI-assisted investment intelligence experiences for structured content creation and report-like outputs.',
      image: 'https://via.placeholder.com/400x300/7C3AED/ffffff?text=AI+Assistant',
      technologies: [
        { icon: <FaReact />, name: 'React' },
        { icon: <SiTypescript />, name: 'TypeScript' },
        { icon: <SiApollographql />, name: 'Apollo Client' },
      ],
      github: 'https://github.com/tanishraj',
      live: 'https://www.tanishraj.vercel.app',
      featured: true,
    },
    {
      id: 3,
      category: 'banking',
      title: 'Digital Banking Platforms',
      description:
        'Customer-facing banking web and mobile interfaces delivered with React, Next.js, TypeScript, and React Native.',
      image: 'https://via.placeholder.com/400x300/0891B2/ffffff?text=Digital+Banking',
      technologies: [
        { icon: <FaUniversity />, name: 'Banking' },
        { icon: <SiTypescript />, name: 'TypeScript' },
        { icon: <FaMobileAlt />, name: 'React Native' },
      ],
      github: 'https://github.com/tanishraj',
      live: 'https://www.tanishraj.vercel.app',
      featured: true,
    },
    {
      id: 4,
      category: 'banking',
      title: 'Customer Happiness Portal',
      description:
        'Legacy customer portal modernization, including self-service lost/stolen card workflows and maintainable component boundaries.',
      image: 'https://via.placeholder.com/400x300/059669/ffffff?text=Customer+Portal',
      technologies: [
        { icon: <FaReact />, name: 'React' },
        { icon: <SiTypescript />, name: 'TypeScript' },
        { icon: <SiRedux />, name: 'Redux' },
      ],
      github: 'https://github.com/tanishraj',
      live: 'https://www.tanishraj.vercel.app',
    },
    {
      id: 5,
      category: 'enterprise',
      title: 'Enterprise Oil & Gas Applications',
      description:
        'Enterprise web applications built with Vue.js, Vuex, Kendo UI, secure coding practices, and SonarQube quality standards.',
      image: 'https://via.placeholder.com/400x300/F59E0B/ffffff?text=Enterprise+Apps',
      technologies: [
        { icon: <SiVuedotjs />, name: 'Vue.js' },
        { icon: <SiRedux />, name: 'Vuex' },
        { icon: <SiJest />, name: 'Testing' },
      ],
      github: 'https://github.com/tanishraj',
      live: 'https://www.tanishraj.vercel.app',
    },
    {
      id: 6,
      category: 'enterprise',
      title: 'Reusable Design System Foundation',
      description:
        'Shared component patterns and UI foundations that improved consistency, accessibility, delivery speed, and maintainability.',
      image: 'https://via.placeholder.com/400x300/DB2777/ffffff?text=Design+System',
      technologies: [
        { icon: <FaReact />, name: 'React' },
        { icon: <SiTailwindcss />, name: 'Tailwind' },
        { icon: <SiVite />, name: 'Vite' },
      ],
      github: 'https://github.com/tanishraj',
      live: 'https://www.tanishraj.vercel.app',
    },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="portfolio" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
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
            Portfolio
          </motion.span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Featured{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Selected frontend work across fintech, banking, enterprise modernization, design
            systems, and product delivery
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                filter === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {category.label}
              <span className="ml-2 px-2 py-1 text-xs bg-white/10 rounded-full">
                {category.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -10 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group relative bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold rounded-full">
                      Featured
                    </span>
                  </div>
                )}

                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                  
                  {/* Hover Overlay with Links */}
                  <AnimatePresence>
                    {hoveredProject === project.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/70 flex items-center justify-center gap-4"
                      >
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                        >
                          <FaGithub className="w-5 h-5 text-white" />
                        </a>
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                        >
                          <FaExternalLinkAlt className="w-5 h-5 text-white" />
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Project Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex items-center gap-3">
                    {project.technologies.map((tech, techIndex) => (
                      <motion.div
                        key={techIndex}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + techIndex * 0.05 }}
                        className="relative group/tech"
                      >
                        <div className="text-gray-500 hover:text-white transition-colors cursor-pointer">
                          {tech.icon}
                        </div>
                        {/* Tooltip */}
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover/tech:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          {tech.name}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300">
            View All Projects
          </button>
        </motion.div>
      </div>
    </section>
  );
};
