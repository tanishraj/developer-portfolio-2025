import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaPython, FaFigma } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiMongodb, SiFirebase } from 'react-icons/si';

const Portfolio: React.FC = () => {
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
      title: 'E-Commerce Platform',
      description:
        'Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard',
      image: 'https://via.placeholder.com/400x300/4F46E5/ffffff?text=E-Commerce',
      technologies: [
        { icon: <FaReact />, name: 'React' },
        { icon: <FaNodeJs />, name: 'Node.js' },
        { icon: <SiMongodb />, name: 'MongoDB' },
        { icon: <SiTailwindcss />, name: 'Tailwind' },
      ],
      github: 'https://github.com',
      live: 'https://example.com',
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

  const filteredProjects =
    filter === 'all' ? projects : projects.filter((project) => project.category === filter);

  return (
    <section id="portfolio" className="py-20 px-4 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

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
            Portfolio
          </motion.span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            My Recent{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Here are some of my recent works showcasing my expertise in frontend development and
            design
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setFilter(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <span className="flex items-center gap-2">
                {category.label}
                <span className="text-xs opacity-70">({category.count})</span>
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -10 }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
                className="group relative bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300"
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-semibold rounded-full">
                      Featured
                    </span>
                  </div>
                )}

                {/* Project Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  />

                  {/* Overlay with links */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                    className="absolute inset-0 bg-black/70 flex items-center justify-center gap-4"
                  >
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                    >
                      <FaGithub className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                    >
                      <FaExternalLinkAlt className="w-5 h-5" />
                    </motion.a>
                  </motion.div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        className="flex items-center gap-1 px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-400"
                      >
                        <span className="text-blue-400">{tech.icon}</span>
                        <span>{tech.name}</span>
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
          >
            View All Projects →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
