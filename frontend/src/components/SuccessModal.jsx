import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Unlock, ArrowRight, Share2, X } from 'lucide-react';
import { getTwitterShareUrl, getLinkedInShareUrl, getBadgeForLevel } from '../utils/badges';

const NicknameModal = ({ isOpen, onClose, onShare, platform }) => {
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
        className="bg-heist-card border border-neon-green/30 rounded-2xl p-6 max-w-sm w-full relative"
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
            className="w-full px-4 py-3 bg-heist-darker border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-green mb-4"
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
              className="flex-1 py-3 px-4 bg-neon-green text-heist-dark rounded-xl font-bold hover:bg-neon-green/90 transition-colors flex items-center justify-center gap-2"
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

const SuccessModal = ({ isOpen, floor, nextFloor, onContinue, unlockedBadge, currentLevel }) => {
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [sharePlatform, setSharePlatform] = useState(null);

  // Safety check - don't render if modal not open or floor data missing
  if (!isOpen || !floor) return null;

  const currentBadge = getBadgeForLevel(currentLevel);

  const handleShareClick = (platform) => {
    setSharePlatform(platform);
    setShowNicknameModal(true);
  };

  const handleShare = (nickname) => {
    setShowNicknameModal(false);
    if (sharePlatform === 'twitter') {
      window.open(getTwitterShareUrl(currentBadge, currentLevel, nickname), '_blank');
    } else if (sharePlatform === 'linkedin') {
      window.open(getLinkedInShareUrl(currentBadge, currentLevel, nickname), '_blank');
    }
  };

  const handleShareTwitter = () => handleShareClick('twitter');
  const handleShareLinkedIn = () => handleShareClick('linkedin');

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
              <p className="text-sm text-gray-500 mb-4">
                You've bypassed {floor.character}'s defenses.
              </p>
            </motion.div>

            {/* New Badge Unlocked */}
            {unlockedBadge && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                className="mb-6 p-4 rounded-xl relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${unlockedBadge.color}20 0%, transparent 100%)`,
                  border: `2px solid ${unlockedBadge.color}`,
                  boxShadow: `0 0 30px ${unlockedBadge.color}40`,
                }}
              >
                {/* Glow animation */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    boxShadow: [
                      `inset 0 0 20px ${unlockedBadge.color}00`,
                      `inset 0 0 40px ${unlockedBadge.color}30`,
                      `inset 0 0 20px ${unlockedBadge.color}00`,
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">New Badge Unlocked!</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-4xl">{unlockedBadge.icon}</span>
                  <div className="text-left">
                    <p className="font-bold text-lg" style={{ color: unlockedBadge.color }}>
                      {unlockedBadge.name}
                    </p>
                    <p className="text-sm text-gray-500">Level {unlockedBadge.level} achieved</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Share Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: unlockedBadge ? 0.6 : 0.4 }}
              className="mb-6"
            >
              <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">Share your achievement</p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={handleShareTwitter}
                  className="px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all hover:scale-105"
                  style={{
                    backgroundColor: '#000',
                    color: '#fff',
                  }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Post
                </button>
                <button
                  onClick={handleShareLinkedIn}
                  className="px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all hover:scale-105"
                  style={{
                    backgroundColor: '#0A66C2',
                    color: '#fff',
                  }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  Share
                </button>
              </div>
            </motion.div>

            {/* Next floor preview */}
            {nextFloor && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: unlockedBadge ? 0.7 : 0.5 }}
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
              transition={{ delay: unlockedBadge ? 0.8 : 0.6 }}
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

      {/* Nickname Modal */}
      <NicknameModal
        isOpen={showNicknameModal}
        onClose={() => setShowNicknameModal(false)}
        onShare={handleShare}
        platform={sharePlatform}
      />
    </AnimatePresence>
  );
};

export default SuccessModal;
