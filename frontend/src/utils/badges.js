// Badge definitions and localStorage management for BreachLab

export const BADGES = {
  bronze: {
    id: 'bronze',
    name: 'Script Kiddie',
    icon: '\u{1F949}', // 🥉
    level: 3,
    color: '#CD7F32',
  },
  silver: {
    id: 'silver',
    name: 'Social Engineer',
    icon: '\u{1F948}', // 🥈
    level: 5,
    color: '#C0C0C0',
  },
  gold: {
    id: 'gold',
    name: 'Prompt Hacker',
    icon: '\u{1F947}', // 🥇
    level: 7,
    color: '#FFD700',
  },
  diamond: {
    id: 'diamond',
    name: 'AI Breaker',
    icon: '\u{1F48E}', // 💎
    level: 10,
    color: '#B9F2FF',
  },
};

const STORAGE_KEY = 'breachlab_progress';

/**
 * Get progress from localStorage
 */
export const getLocalProgress = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to read progress from localStorage:', e);
  }
  return {
    completedLevels: [],
    highestLevel: 0,
    currentBadge: null,
  };
};

/**
 * Save progress to localStorage
 */
export const saveLocalProgress = (progress) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to localStorage:', e);
  }
};

/**
 * Get the badge for a given level
 */
export const getBadgeForLevel = (level) => {
  if (level >= 10) return BADGES.diamond;
  if (level >= 7) return BADGES.gold;
  if (level >= 5) return BADGES.silver;
  if (level >= 3) return BADGES.bronze;
  return null;
};

/**
 * Check if completing a level unlocks a new badge
 */
export const checkNewBadgeUnlock = (previousHighestLevel, newLevel) => {
  const previousBadge = getBadgeForLevel(previousHighestLevel);
  const newBadge = getBadgeForLevel(newLevel);

  if (!newBadge) return null;
  if (!previousBadge) return newBadge;
  if (newBadge.level > previousBadge.level) return newBadge;

  return null;
};

/**
 * Update progress when a level is completed
 */
export const completeLevel = (levelId) => {
  console.log('[badges] completeLevel called with:', levelId);

  const progress = getLocalProgress();
  const previousHighestLevel = progress.highestLevel;
  console.log('[badges] Previous progress:', { previousHighestLevel, completedLevels: progress.completedLevels });

  // Add to completed levels if not already there
  if (!progress.completedLevels.includes(levelId)) {
    progress.completedLevels.push(levelId);
    progress.completedLevels.sort((a, b) => a - b);
  }

  // Update highest level
  if (levelId > progress.highestLevel) {
    progress.highestLevel = levelId;
  }

  // Update current badge
  const newBadge = getBadgeForLevel(progress.highestLevel);
  progress.currentBadge = newBadge?.id || null;

  // Save to localStorage
  saveLocalProgress(progress);
  console.log('[badges] Saved progress to localStorage:', progress);

  // Check if a new badge was unlocked
  const unlockedBadge = checkNewBadgeUnlock(previousHighestLevel, levelId);
  console.log('[badges] Badge unlock check:', { previousHighestLevel, levelId, unlockedBadge });

  return {
    progress,
    unlockedBadge,
  };
};

/**
 * Reset progress
 */
export const resetProgress = () => {
  const emptyProgress = {
    completedLevels: [],
    highestLevel: 0,
    currentBadge: null,
  };
  saveLocalProgress(emptyProgress);
  return emptyProgress;
};

/**
 * Generate share URL for X (Twitter)
 */
export const getTwitterShareUrl = (badge, level) => {
  const badgeName = badge?.name || 'a level';
  const text = `\u{1F513} I just earned the ${badgeName} badge on BreachLab!\n\nCan you hack an AI? I made it to Level ${level}.\n\nTry it: breachlab.xsourcesec.com`;
  const hashtags = 'AIHacking,PromptInjection,CyberSecurity';
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&hashtags=${hashtags}`;
};

/**
 * Generate share URL for LinkedIn
 */
export const getLinkedInShareUrl = () => {
  return `https://www.linkedin.com/sharing/share-offsite/?url=https://breachlab.xsourcesec.com`;
};
