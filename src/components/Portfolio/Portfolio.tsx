import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaPython, FaFigma } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiMongodb, SiFirebase } from 'react-icons/si';

export const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects', count: 8 },
    { id: 'web', label: 'Web Apps', count: 4 },
    { id: 'mobile', label: 'Mobile', count: 2 },
    { id: 'design', label: 'UI/UX', count: 2 },
  ];

  const projects = [
    {
      id: 1,
      category: 'web',
      title: 'Online Code Editor',
      description:
        'A powerful browser-based code editor with syntax highlighting, multiple language support, and real-time preview',
      image: '/assets/online-editor.png',
      technologies: [
        { icon: <FaReact />, name: 'React' },
        { icon: <SiTypescript />, name: 'TypeScript' },
        { icon: <SiTailwindcss />, name: 'Tailwind' },
      ],
      github: 'https://github.com/tanishraj/online_code_editor',
      live: 'https://my-js-editor.vercel.app/',
      featured: true,
    },
    {
      id: 2,
      category: 'mobile',
      title: 'AR Travel Guide',
      description:
        'Augmented reality mobile app for tourists with real-time information overlays and navigation',
      image: 'https://via.placeholder.com/400x300/10B981/ffffff?text=AR+Travel',
      technologies: [
        { icon: <FaReact />, name: 'React Native' },
        { icon: <SiTypescript />, name: 'TypeScript' },
        { icon: <SiFirebase />, name: 'Firebase' },
      ],
      github: 'https://github.com',
      live: 'https://example.com',
      featured: true,
    },
    {
      id: 3,
      category: 'web',
      title: 'Analytics Dashboard',
      description:
        'Real-time data visualization dashboard with advanced filtering and export capabilities',
      image: 'https://via.placeholder.com/400x300/F59E0B/ffffff?text=Analytics',
      technologies: [
        { icon: <FaReact />, name: 'React' },
        { icon: <SiTypescript />, name: 'TypeScript' },
        { icon: <FaPython />, name: 'Python' },
      ],
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      id: 4,
      category: 'design',
      title: 'Design System',
      description: 'Comprehensive design system with reusable components and design tokens',
      image: 'https://via.placeholder.com/400x300/8B5CF6/ffffff?text=Design+System',
      technologies: [
        { icon: <FaFigma />, name: 'Figma' },
        { icon: <FaReact />, name: 'React' },
        { icon: <SiTailwindcss />, name: 'Tailwind' },
      ],
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      id: 5,
      category: 'web',
      title: 'Task Management App',
      description:
        'Collaborative task management platform with real-time updates and team features',
      image: 'https://via.placeholder.com/400x300/EC4899/ffffff?text=Task+Manager',
      technologies: [
        { icon: <FaReact />, name: 'React' },
        { icon: <FaNodeJs />, name: 'Node.js' },
        { icon: <SiMongodb />, name: 'MongoDB' },
      ],
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      id: 6,
      category: 'mobile',
      title: 'Fitness Tracker',
      description:
        'Mobile app for tracking workouts, nutrition, and health metrics with AI recommendations',
      image: 'https://via.placeholder.com/400x300/06B6D4/ffffff?text=Fitness+App',
      technologies: [
        { icon: <FaReact />, name: 'React Native' },
        { icon: <SiFirebase />, name: 'Firebase' },
        { icon: <FaPython />, name: 'Python' },
      ],
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      id: 7,
      category: 'web',
      title: 'Social Media Platform',
      description:
        'Full-featured social platform with posts, comments, likes, and real-time messaging',
      image: 'https://via.placeholder.com/400x300/3B82F6/ffffff?text=Social+Media',
      technologies: [
        { icon: <FaReact />, name: 'React' },
        { icon: <FaNodeJs />, name: 'Node.js' },
        { icon: <SiMongodb />, name: 'MongoDB' },
        { icon: <SiTypescript />, name: 'TypeScript' },
      ],
      github: 'https://github.com',
      live: 'https://example.com',
      featured: true,
    },
    {
      id: 8,
      category: 'design',
      title: 'Brand Identity',
      description:
        'Complete brand identity design including logo, color palette, and brand guidelines',
      image: 'https://via.placeholder.com/400x300/DC2626/ffffff?text=Brand+Identity',
      technologies: [{ icon: <FaFigma />, name: 'Figma' }],
      github: 'https://github.com',
      live: 'https://example.com',
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
            Explore my latest work and creative solutions
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

