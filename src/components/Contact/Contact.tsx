import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
} from 'react-icons/fa';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const faqs = [
    {
      question: 'What services do you offer?',
      answer:
        'I focus on senior frontend engineering, React and TypeScript applications, design systems, legacy modernization, performance optimization, testing, and frontend architecture.',
    },
    {
      question: 'How long does a typical project take?',
      answer:
        'Timelines depend on scope. I can support focused UI features, larger frontend migrations, or ongoing product delivery across cross-functional teams.',
    },
    {
      question: 'Do you work with international clients?',
      answer:
        'Yes. I am based in Abu Dhabi, UAE and have worked with distributed product, design, backend, QA, DevOps, and data teams.',
    },
    {
      question: 'What domains do you know best?',
      answer:
        'My strongest domain experience is in banking, fintech, enterprise platforms, customer portals, mobile banking, and data-heavy decision-support interfaces.',
    },
  ];

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email';
        return '';
      case 'subject':
        if (!value.trim()) return 'Subject is required';
        if (value.length < 3) return 'Subject must be at least 3 characters';
        return '';
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.length < 10) return 'Message must be at least 10 characters';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
    setFocusedField(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: { [key: string]: string } = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        setSubmitStatus('idle');
      }, 3000);
    }, 2000);
  };

  return (
    <section id="contact" className="py-20 px-4 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 -left-48 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
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
            Get In Touch
          </motion.span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Let's Work{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Together
            </span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Have a frontend role, product build, migration, or design system challenge in mind?
            Send me a message and let's talk.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
              <h4 className="text-2xl font-bold text-white mb-6">Send a Message</h4>

              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3"
                  >
                    <FaCheckCircle className="text-green-400" />
                    <span className="text-green-400">
                      Message sent successfully! I'll get back to you soon.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-gray-400 text-sm mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onFocus={() => setFocusedField('name')}
                      className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-white focus:outline-none transition-all ${
                        errors.name
                          ? 'border-red-500'
                          : focusedField === 'name'
                            ? 'border-blue-500'
                            : 'border-gray-700'
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <motion.span
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -bottom-5 left-0 text-xs text-red-400 flex items-center gap-1"
                      >
                        <FaExclamationCircle />
                        {errors.name}
                      </motion.span>
                    )}
                  </div>

                  <div className="relative">
                    <label className="block text-gray-400 text-sm mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onFocus={() => setFocusedField('email')}
                      className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-white focus:outline-none transition-all ${
                        errors.email
                          ? 'border-red-500'
                          : focusedField === 'email'
                            ? 'border-blue-500'
                            : 'border-gray-700'
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <motion.span
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -bottom-5 left-0 text-xs text-red-400 flex items-center gap-1"
                      >
                        <FaExclamationCircle />
                        {errors.email}
                      </motion.span>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-gray-400 text-sm mb-2">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={() => setFocusedField('subject')}
                    className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-white focus:outline-none transition-all ${
                      errors.subject
                        ? 'border-red-500'
                        : focusedField === 'subject'
                          ? 'border-blue-500'
                          : 'border-gray-700'
                    }`}
                    placeholder="Project Inquiry"
                  />
                  {errors.subject && (
                    <motion.span
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-5 left-0 text-xs text-red-400 flex items-center gap-1"
                    >
                      <FaExclamationCircle />
                      {errors.subject}
                    </motion.span>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-gray-400 text-sm mb-2">
                    Message *<span className="ml-2 text-xs">({formData.message.length}/500)</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={() => setFocusedField('message')}
                    rows={5}
                    maxLength={500}
                    className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-white focus:outline-none transition-all resize-none ${
                      errors.message
                        ? 'border-red-500'
                        : focusedField === 'message'
                          ? 'border-blue-500'
                          : 'border-gray-700'
                    }`}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && (
                    <motion.span
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-5 left-0 text-xs text-red-400 flex items-center gap-1"
                    >
                      <FaExclamationCircle />
                      {errors.message}
                    </motion.span>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:shadow-blue-500/25'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full"
                      />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <FaPaperPlane />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <h4 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h4>
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-800/50 transition-colors"
                  >
                    <span className="font-medium text-white">{faq.question}</span>
                    <motion.svg
                      animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </motion.svg>
                  </button>
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4">
                          <p className="text-gray-400">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Quick Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8 p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-xl border border-gray-800"
            >
              <h5 className="text-lg font-semibold text-white mb-4">Quick Contact</h5>
              <div className="space-y-4">
                <motion.a
                  href="mailto:hire.tanishraj@gmail.com"
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <div className="p-2 bg-gray-800 rounded-lg">
                    <FaEnvelope className="text-blue-400" />
                  </div>
                  <span>hire.tanishraj@gmail.com</span>
                </motion.a>
                <motion.a
                  href="tel:+971561338400"
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <div className="p-2 bg-gray-800 rounded-lg">
                    <FaPhone className="text-green-400" />
                  </div>
                  <span>+971 56 133 8400</span>
                </motion.a>
                <motion.div whileHover={{ x: 5 }} className="flex items-center gap-3 text-gray-400">
                  <div className="p-2 bg-gray-800 rounded-lg">
                    <FaMapMarkerAlt className="text-purple-400" />
                  </div>
                  <span>Abu Dhabi, UAE</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
