import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Share2, RotateCcw, ExternalLink, X } from 'lucide-react';
import { getTwitterShareUrl, getLinkedInShareUrl, BADGES } from '../utils/badges';

const NicknameModal = ({ isOpen, onClose, onShare }) => {
  const [nickname, setNickname] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onShare(nickname.trim());
  };

  const handleSkip = () => {
    onShare('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-heist-card border border-yellow-500/30 rounded-2xl p-6 max-w-sm w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-white mb-2">Add Your Name?</h3>
        <p className="text-sm text-gray-400 mb-4">
          Your name will appear on the share image (optional)
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Enter nickname (max 20 chars)"
            maxLength={20}
            className="w-full px-4 py-3 bg-heist-darker border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 mb-4"
            autoFocus
          />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSkip}
              className="flex-1 py-3 px-4 border border-gray-600 text-gray-400 rounded-xl font-medium hover:border-gray-400 hover:text-white transition-colors"
            >
              Skip
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-yellow-500 text-heist-dark rounded-xl font-bold hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

const GameCompleteModal = ({ isOpen, onRestart }) => {
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [sharePlatform, setSharePlatform] = useState(null);

  if (!isOpen) return null;

  // Game complete = Level 10 = Diamond badge
  const diamondBadge = BADGES.diamond;

  const handleShareClick = (platform) => {
    setSharePlatform(platform);
    setShowNicknameModal(true);
  };

  const handleShare = (nickname) => {
    setShowNicknameModal(false);
    if (sharePlatform === 'twitter') {
      window.open(getTwitterShareUrl(diamondBadge, 10, nickname), '_blank');
    } else {
      window.open(getLinkedInShareUrl(diamondBadge, 10, nickname), '_blank');
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex items-center justify-center p-4 overflow-auto"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="text-center max-w-2xl py-8"
        >
          {/* Trophy */}
          <motion.div
            initial={{ y: -100, opacity: 0, rotate: -10 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            className="mb-8"
          >
            <div
              className="w-40 h-40 mx-auto rounded-full flex items-center justify-center relative"
              style={{
                background: 'linear-gradient(135deg, #ffd700 0%, #ff8c00 100%)',
                boxShadow: '0 0 80px rgba(255, 215, 0, 0.5)',
              }}
            >
              <Trophy className="w-20 h-20 text-heist-dark" />

              {/* Sparkles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: [0, 1, 0] }}
                  transition={{
                    delay: 0.5 + i * 0.1,
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                  className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${20 + Math.random() * 60}%`,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-5xl font-display font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 text-transparent bg-clip-text">
              VAULT BREACHED
            </h1>
            <p className="text-2xl text-white mb-2">Congratulations, Master Hacker!</p>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              You've successfully bypassed all 10 AI security systems and accessed the vault.
              Your social engineering skills are legendary.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-heist-card border border-yellow-500/30 rounded-2xl p-6 mb-8 grid grid-cols-3 gap-4"
          >
            <div>
              <p className="text-4xl font-bold text-yellow-400">10</p>
              <p className="text-sm text-gray-500">Floors Cleared</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-yellow-400">5</p>
              <p className="text-sm text-gray-500">Wings Breached</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-yellow-400">10</p>
              <p className="text-sm text-gray-500">AIs Outsmarted</p>
            </div>
          </motion.div>

          {/* Share */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mb-8"
          >
            <p className="text-sm text-gray-500 mb-4">Share your achievement</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleShareClick('twitter')}
                className="px-6 py-3 bg-[#1DA1F2] text-white rounded-xl font-bold flex items-center gap-2 hover:bg-[#1a8cd8] transition-colors"
              >
                <Share2 className="w-5 h-5" />
                Twitter
              </button>
              <button
                onClick={() => handleShareClick('linkedin')}
                className="px-6 py-3 bg-[#0A66C2] text-white rounded-xl font-bold flex items-center gap-2 hover:bg-[#094d92] transition-colors"
              >
                <Share2 className="w-5 h-5" />
                LinkedIn
              </button>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="bg-gradient-to-r from-neon-green/10 to-neon-blue/10 border border-neon-green/30 rounded-2xl p-6 mb-8"
          >
            <p className="text-lg text-white mb-2">Want to test YOUR AI systems?</p>
            <p className="text-sm text-gray-400 mb-4">
              Use AgentAudit to find vulnerabilities before attackers do.
            </p>
            <a
              href="https://app.xsourcesec.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neon-green text-heist-dark rounded-xl font-bold hover:bg-neon-green/90 transition-colors"
            >
              Try AgentAudit
              <ExternalLink className="w-5 h-5" />
            </a>
          </motion.div>

          {/* Restart */}
          <motion.button
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            onClick={onRestart}
            className="px-6 py-3 border border-gray-600 text-gray-400 rounded-xl flex items-center gap-2 mx-auto hover:border-gray-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Nickname Modal */}
      <NicknameModal
        isOpen={showNicknameModal}
        onClose={() => setShowNicknameModal(false)}
        onShare={handleShare}
      />
    </AnimatePresence>
  );
};

export default GameCompleteModal;
