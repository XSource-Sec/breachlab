import React, { useState, useEffect } from 'react';
import { Key, Check, X } from 'lucide-react';
import { verifyCode } from '../utils/api';

const CodeInput = ({ floorId, onSuccess, accentColor }) => {
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Reset state when floor changes
  useEffect(() => {
    setCode('');
    setError(null);
    setSuccess(false);
  }, [floorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code.trim() || isVerifying) return;

    setIsVerifying(true);
    setError(null);

    try {
      const response = await verifyCode(code.trim(), floorId);

      if (response.correct) {
        setSuccess(true);
        setTimeout(() => {
          onSuccess?.(response);
        }, 1000);
      } else {
        setError(response.message);
        setTimeout(() => setError(null), 3000);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="bg-heist-card border border-heist-border rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Key className="w-4 h-4" style={{ color: accentColor }} />
        <span className="text-sm font-bold" style={{ color: accentColor }}>
          Enter Access Code
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="BREACH-XXXX-XXXX"
          className={`w-full bg-heist-darker border rounded-lg px-3 py-2 font-mono text-sm tracking-wide uppercase transition-colors ${
            success
              ? 'border-green-500 text-green-400'
              : error
              ? 'border-red-500 text-red-400'
              : 'border-heist-border text-white'
          }`}
          disabled={isVerifying || success}
        />
        <button
          type="submit"
          disabled={!code.trim() || isVerifying || success}
          className={`w-full py-2 rounded-lg font-bold transition-all disabled:opacity-50 ${
            success
              ? 'bg-green-500 text-white'
              : 'bg-heist-darker border hover:bg-heist-card'
          }`}
          style={!success ? { borderColor: accentColor, color: accentColor } : {}}
        >
          {success ? (
            <Check className="w-5 h-5 mx-auto" />
          ) : isVerifying ? (
            'Verifying...'
          ) : (
            'Verify Code'
          )}
        </button>
      </form>

      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-400 text-sm">
          <X className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
};

export default CodeInput;
