import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Zap, Users, ArrowRight, ExternalLink } from 'lucide-react';
import { WINGS } from '../data/floors';

const Landing = ({ onStart }) => {
  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: '10 AI Characters',
      description: 'Each with unique personalities and defenses',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: '5 Security Wings',
      description: 'Progressive difficulty from lobby to vault',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Real Techniques',
      description: 'Learn actual social engineering methods',
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Final Vault',
      description: 'Combine all skills to breach the vault',
    },
  ];

  return (
    <div className="min-h-screen bg-heist-dark grid-bg relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-heist-dark/50 to-heist-dark pointer-events-none" />

      {/* Animated grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-neon-green/20 to-transparent w-full"
            style={{ top: `${20 + i * 20}%` }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scaleX: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-heist-card border-2 border-neon-green mb-6 relative">
              <span className="text-5xl">🏦</span>
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-neon-green"
                animate={{ scale: [1, 1.1, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-display font-bold mb-4">
            <span className="text-white">BREACH</span>
            <span className="text-neon-green neon-text">LAB</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-2">
            THE AI HEIST
          </p>

          <p className="text-gray-500 max-w-xl mx-auto mb-8">
            Break into a bank protected by 10 AI security systems.
            Use social engineering, logic exploitation, and creative thinking
            to reach the vault.
          </p>

          {/* Start button */}
          <motion.button
            onClick={onStart}
            className="group px-8 py-4 bg-transparent border-2 border-neon-green text-neon-green font-bold text-lg rounded-xl relative overflow-hidden transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2 group-hover:text-heist-dark transition-colors duration-300">
              BEGIN HEIST
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-neon-green"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="bg-heist-card border border-heist-border rounded-xl p-4 text-center hover:border-neon-green/50 transition-colors"
            >
              <div className="text-neon-green mb-3 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="font-bold text-white mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Wings preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-center text-gray-500 mb-6 uppercase tracking-wider text-sm">
            5 Wings to Breach
          </h2>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            {Object.entries(WINGS).map(([name, wing], idx) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + idx * 0.1 }}
                className="flex items-center gap-2"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: wing.color }}
                />
                <span className="text-sm" style={{ color: wing.color }}>
                  {name}
                </span>
                {idx < Object.keys(WINGS).length - 1 && (
                  <span className="text-gray-600 ml-2">→</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <p className="text-gray-600 mb-4">
            Built by{' '}
            <a
              href="https://xsourcesec.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-green hover:underline"
            >
              XSource_Sec
            </a>
            {' '}- AI Security Experts
          </p>
          <a
            href="https://app.xsourcesec.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-neon-green transition-colors"
          >
            Test your AI with AgentAudit
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.footer>
      </div>
    </div>
  );
};

export default Landing;
