import { motion } from 'framer-motion';
import React from 'react';
import { FaPaintBrush, FaCode, FaMobile, FaRocket } from 'react-icons/fa';

export const Services: React.FC = () => {
  const services = [
    {
      id: 1,
      icon: <FaPaintBrush />,
      title: 'UI/UX Design',
      description:
        'Creating intuitive and beautiful user interfaces that delight users and drive engagement.',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 2,
      icon: <FaCode />,
      title: 'Web Development',
      description: 'Building responsive and performant web applications using modern technologies.',
      features: ['React/Next.js', 'Node.js', 'TypeScript', 'API Development'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 3,
      icon: <FaMobile />,
      title: 'Mobile Development',
      description:
        'Developing cross-platform mobile applications that work seamlessly on all devices.',
      features: ['React Native', 'Flutter', 'iOS/Android', 'App Store Deployment'],
      color: 'from-green-500 to-teal-500',
    },
    {
      id: 4,
      icon: <FaRocket />,
      title: 'Product Strategy',
      description: 'Helping businesses define and execute their digital product strategy.',
      features: ['Market Research', 'MVP Development', 'Growth Strategy', 'Analytics'],
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section id="services" className="py-20 px-4">
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
            Services
          </motion.span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            What I Can{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Do For You
            </span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Offering a comprehensive range of services to bring your digital vision to life
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 h-full border border-gray-700 hover:border-gray-600 transition-all">
                {/* Icon */}
                <div
                  className={`w-14 h-14 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <span className="text-white text-2xl">{service.icon}</span>
                </div>

                {/* Title */}
                <h4 className="text-xl font-bold text-white mb-3">{service.title}</h4>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4">{service.description}</p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-500 text-xs">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Learn More Link */}
                <div className="mt-6 flex items-center gap-2 text-blue-400 group-hover:text-blue-300 transition-colors">
                  <span className="text-sm font-medium">Learn more</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            Have a project in mind? Let's work together to bring it to life.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300">
            Start a Project
          </button>
        </motion.div>
      </div>
    </section>
  );
};

