import React, { useState, useRef, useEffect } from 'react';
import { Send, Lightbulb, AlertTriangle, RefreshCw } from 'lucide-react';
import MessageBubble from './MessageBubble';
import CharacterAvatar from './CharacterAvatar';
import { sendMessage, getHint } from '../utils/api';

const ChatInterface = ({ floor, onCodeDetected }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hint, setHint] = useState(null);
  const [hintAvailable, setHintAvailable] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lastFailedMessage, setLastFailedMessage] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Reset chat when floor changes
    setMessages([{
      role: 'system',
      content: `You've reached ${floor.name}. ${floor.character} awaits.`,
    }]);
    setHint(null);
    setHintAvailable(false);
    setAttempts(0);
  }, [floor.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setLastFailedMessage(null);
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    setAttempts(prev => prev + 1);

    try {
      const response = await sendMessage(userMessage, floor.id);

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.response,
        character: response.character_name,
      }]);

      if (response.code_detected) {
        onCodeDetected?.(response);
      }

      // Check hint availability after 3 attempts
      if (attempts + 1 >= 3) {
        setHintAvailable(true);
      }
    } catch (error) {
      setLastFailedMessage(userMessage);
      if (error.message === 'TIMEOUT') {
        setMessages(prev => [...prev, {
          role: 'system',
          content: `[System] No response received from ${floor.character}. The server may be busy. You can try again.`,
          isError: true,
        }]);
      } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        setMessages(prev => [...prev, {
          role: 'system',
          content: `[System] Connection error. Please check your internet connection and try again.`,
          isError: true,
        }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'system',
          content: `[System] Error: ${error.message}`,
          isError: true,
        }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastFailedMessage) {
      setInput(lastFailedMessage);
      setLastFailedMessage(null);
      // Remove the last error message
      setMessages(prev => prev.filter((msg, idx) => !(idx === prev.length - 1 && msg.isError)));
    }
  };

  const handleGetHint = async () => {
    try {
      const response = await getHint(floor.id);
      if (response.available && response.hint) {
        setHint(response.hint);
      }
    } catch (error) {
      console.error('Failed to get hint:', error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Character Header */}
      <div
        className="p-4 border-b border-heist-border flex items-center gap-4"
        style={{ borderColor: floor.accentColor + '40' }}
      >
        <CharacterAvatar avatar={floor.avatar} color={floor.accentColor} />
        <div>
          <h2 className="text-xl font-bold" style={{ color: floor.accentColor }}>
            {floor.character}
          </h2>
          <p className="text-sm text-gray-400">{floor.characterTitle}</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-xs text-gray-500">Technique</p>
          <p className="text-sm" style={{ color: floor.accentColor }}>
            {floor.technique}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <MessageBubble
            key={idx}
            message={msg}
            accentColor={floor.accentColor}
            characterAvatar={floor.avatar}
          />
        ))}

        {isLoading && (
          <div className="flex items-center gap-3 text-gray-400 p-3 bg-heist-card/50 rounded-lg border border-heist-border">
            <div className="typing-indicator">
              <span style={{ backgroundColor: floor.accentColor }}></span>
              <span style={{ backgroundColor: floor.accentColor }}></span>
              <span style={{ backgroundColor: floor.accentColor }}></span>
            </div>
            <span className="text-sm" style={{ color: floor.accentColor }}>
              {floor.character} is typing...
            </span>
          </div>
        )}

        {lastFailedMessage && !isLoading && (
          <div className="flex justify-center">
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-heist-card border border-yellow-500/50 text-yellow-500 rounded-lg hover:bg-yellow-500/10 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Retry last message
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Hint Section */}
      {hintAvailable && (
        <div className="px-4 pb-2">
          {hint ? (
            <div className="bg-heist-card border border-yellow-500/30 rounded-lg p-3 flex items-start gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-200">{hint}</p>
            </div>
          ) : (
            <button
              onClick={handleGetHint}
              className="text-sm text-yellow-500 hover:text-yellow-400 flex items-center gap-2"
            >
              <Lightbulb className="w-4 h-4" />
              Need a hint?
            </button>
          )}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-heist-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message ${floor.character}...`}
            className="flex-1 bg-heist-card border border-heist-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-neon-green transition-colors"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-3 bg-heist-card border border-neon-green text-neon-green rounded-lg hover:bg-neon-green hover:text-heist-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
