import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Unlock, ArrowRight, Share2 } from 'lucide-react';

const SuccessModal = ({ isOpen, floor, nextFloor, onContinue }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-heist-card border-2 rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden"
          style={{ borderColor: floor.accentColor }}
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: `radial-gradient(circle at center, ${floor.accentColor} 0%, transparent 70%)`,
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center success-glow"
              style={{
                backgroundColor: floor.accentColor + '20',
                border: `3px solid ${floor.accentColor}`,
              }}
            >
              <Unlock className="w-10 h-10" style={{ color: floor.accentColor }} />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2
                className="text-3xl font-display font-bold mb-2 neon-text"
                style={{ color: floor.accentColor }}
              >
                ACCESS GRANTED
              </h2>
              <p className="text-gray-400 mb-2">
                Floor {floor.id}: {floor.name} cleared!
              </p>
              <p className="text-sm text-gray-500 mb-6">
                You've bypassed {floor.character}'s defenses.
              </p>
            </motion.div>

            {/* Next floor preview */}
            {nextFloor && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-heist-darker rounded-xl p-4 mb-6"
              >
                <p className="text-xs text-gray-500 mb-2">NEXT TARGET</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl">{nextFloor.avatar}</span>
                  <div className="text-left">
                    <p className="font-bold" style={{ color: nextFloor.accentColor }}>
                      {nextFloor.name}
                    </p>
                    <p className="text-sm text-gray-400">{nextFloor.character}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Actions */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-3"
            >
              <button
                onClick={onContinue}
                className="flex-1 py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-105"
                style={{
                  backgroundColor: floor.accentColor,
                  color: '#0a0a1a',
                }}
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SuccessModal;
