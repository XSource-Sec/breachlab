import React from 'react';

const CharacterAvatar = ({ avatar, color, size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8 text-lg',
    md: 'w-12 h-12 text-2xl',
    lg: 'w-16 h-16 text-3xl',
    xl: 'w-24 h-24 text-5xl',
  };

  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center relative`}
      style={{
        backgroundColor: color + '20',
        border: `2px solid ${color}`,
        boxShadow: `0 0 20px ${color}40`,
      }}
    >
      <span>{avatar}</span>

      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-full animate-pulse-slow"
        style={{
          boxShadow: `0 0 30px ${color}40`,
        }}
      />
    </div>
  );
};

export default CharacterAvatar;
