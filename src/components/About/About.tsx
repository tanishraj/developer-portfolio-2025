import { motion } from 'framer-motion';
import React from 'react';

export const About: React.FC = () => {
  const cvPath = `${process.env.PUBLIC_URL}/CV-Tanishraj-Frontend-Developer.pdf`;

  const experienceHighlights = [
    {
      id: 1,
      name: 'Liquidity Capital | Senior Frontend Engineer',
      description:
        'Building finance platforms for capital formation, private credit, AI-assisted workflows, and data-heavy investment journeys.',
    },
    {
      id: 2,
      name: 'Banque Saudi Fransi | Senior Frontend Engineer',
      description:
        'Delivered digital banking, customer support, mobile, rebranding, CI/CD, and performance-focused frontend work.',
    },
    {
      id: 3,
      name: 'Wells Fargo, Rakuten, CGI & Thomson Reuters',
      description:
        'Modernized legacy systems, built tested React/Vue interfaces, improved code quality, and shipped enterprise products.',
    },
  ];

  return (
    <section id="about" className="py-20 px-4">
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
            About Me
          </motion.span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Get To Know{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Me Better
            </span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Senior frontend engineer focused on scalable architecture, clean UI systems, and
            production-ready product delivery
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <div className="mb-8">
              <div className="w-48 h-48 mx-auto lg:mx-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-7xl">👨‍💻</span>
              </div>
            </div>
            <h4 className="text-2xl font-bold text-white mb-4">About Me</h4>
            <p className="text-gray-300 mb-6">
              I'm a Senior Frontend Engineer with nearly 10 years of experience across banking,
              fintech, enterprise, and product-based domains. I specialize in React.js,
              TypeScript, Next.js, Vue.js, React Native, frontend architecture, design systems,
              accessibility, testing, and CI/CD collaboration.
            </p>
            <p className="text-gray-300 mb-8">
              My work centers on modernizing legacy applications, building reusable component
              patterns, improving performance, mentoring engineers, and collaborating closely with
              product, design, backend, QA, and data teams to deliver secure, maintainable
              customer-facing applications.
            </p>
            <div className="flex gap-4 justify-center lg:justify-start">
              <a
                href={cvPath}
                download="Tanish-Raj-Frontend-Developer-CV.pdf"
                data-cv-download
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300"
              >
                Download CV
              </a>
              <a
                href="#contact"
                className="px-8 py-4 border-2 border-gray-600 text-white rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-800/50 hover:scale-105 transition-all duration-300"
              >
                Contact Me
              </a>
            </div>
          </motion.div>

          {/* Skills/Blog Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {experienceHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h5 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {highlight.name}
                      </h5>
                      <p className="text-gray-400 text-sm">{highlight.description}</p>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Experience Summary */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center pt-4"
            >
              <p className="text-blue-400 font-medium">
                Frontend ownership, clean code, reusable components, and cross-functional delivery
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
