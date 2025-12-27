import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ArrowRight } from 'lucide-react';
import { WINGS } from '../data/floors';

const WingClearedModal = ({ isOpen, wingName, onContinue }) => {
  if (!isOpen || !wingName) return null;

  const wing = WINGS[wingName];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="text-center max-w-lg"
        >
          {/* Animated shield icon */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="mb-8"
          >
            <div
              className="w-32 h-32 mx-auto rounded-full flex items-center justify-center animate-pulse-slow"
              style={{
                backgroundColor: wing.color + '20',
                border: `4px solid ${wing.color}`,
                boxShadow: `0 0 60px ${wing.color}40`,
              }}
            >
              <Shield className="w-16 h-16" style={{ color: wing.color }} />
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2
              className="text-4xl font-display font-bold mb-4 neon-text"
              style={{ color: wing.color }}
            >
              WING CLEARED
            </h2>
            <p className="text-2xl text-white mb-2">{wingName}</p>
            <p className="text-gray-400 mb-8">{wing.description}</p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-heist-card/50 backdrop-blur rounded-xl p-6 mb-8 border border-heist-border"
          >
            <div className="flex justify-around">
              <div>
                <p className="text-3xl font-bold" style={{ color: wing.color }}>
                  {wing.floors.length}
                </p>
                <p className="text-sm text-gray-500">Floors Cleared</p>
              </div>
              <div className="w-px bg-heist-border" />
              <div>
                <p className="text-3xl font-bold" style={{ color: wing.color }}>
                  {wing.floors.length}
                </p>
                <p className="text-sm text-gray-500">AIs Bypassed</p>
              </div>
            </div>
          </motion.div>

          {/* Continue button */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            onClick={onContinue}
            className="py-4 px-8 rounded-xl font-bold text-lg flex items-center justify-center gap-3 mx-auto transition-all hover:scale-105"
            style={{
              backgroundColor: wing.color,
              color: '#0a0a1a',
            }}
          >
            Enter Next Wing
            <ArrowRight className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WingClearedModal;
