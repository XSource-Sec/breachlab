import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const SecurityAlert = ({ isVisible, message, duration = 3000, onClose }) => {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="security-alert bg-red-500/20 border-2 border-red-500 rounded-xl px-6 py-4 flex items-center gap-4 backdrop-blur-md">
            <AlertTriangle className="w-6 h-6 text-red-500 animate-pulse" />
            <div>
              <p className="text-red-500 font-bold">SECURITY ALERT</p>
              <p className="text-red-300 text-sm">{message || 'Suspicious activity detected'}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SecurityAlert;
