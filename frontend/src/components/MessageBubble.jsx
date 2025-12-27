import React from 'react';
import { AlertCircle, Terminal } from 'lucide-react';

const MessageBubble = ({ message, accentColor, characterAvatar }) => {
  const { role, content, character, isError } = message;

  if (role === 'system') {
    if (isError) {
      return (
        <div className="flex justify-center">
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg px-4 py-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-yellow-400">{content}</span>
          </div>
        </div>
      );
    }
    return (
      <div className="flex justify-center">
        <div className="bg-heist-card/50 border border-heist-border rounded-lg px-4 py-2 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400">{content}</span>
        </div>
      </div>
    );
  }

  if (role === 'error') {
    return (
      <div className="flex justify-center">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400" />
          <span className="text-sm text-red-400">{content}</span>
        </div>
      </div>
    );
  }

  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-end gap-2 max-w-[80%] ${isUser ? 'flex-row-reverse' : ''}`}>
        {/* Avatar for AI */}
        {!isUser && (
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-lg flex-shrink-0"
            style={{ backgroundColor: accentColor + '20', border: `1px solid ${accentColor}40` }}
          >
            {characterAvatar}
          </div>
        )}

        {/* Message bubble */}
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'message-user rounded-br-sm'
              : 'message-ai rounded-bl-sm'
          }`}
          style={isUser ? { borderColor: accentColor } : {}}
        >
          {!isUser && character && (
            <p className="text-xs font-bold mb-1" style={{ color: accentColor }}>
              {character}
            </p>
          )}
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        </div>

        {/* User indicator */}
        {isUser && (
          <div className="w-8 h-8 rounded-full bg-neon-green/20 border border-neon-green/40 flex items-center justify-center text-sm flex-shrink-0">
            🎭
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
