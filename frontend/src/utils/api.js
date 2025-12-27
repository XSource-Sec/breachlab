/**
 * BreachLab API Client
 */

const API_BASE = '/api';

// Session management
let sessionId = localStorage.getItem('breachlab_session') || null;

const setSession = (id) => {
  sessionId = id;
  if (id) {
    localStorage.setItem('breachlab_session', id);
  } else {
    localStorage.removeItem('breachlab_session');
  }
};

const getSession = () => sessionId;

/**
 * Send a chat message to a floor's AI with timeout support
 */
export const sendMessage = async (message, floorId = null, timeoutMs = 15000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        session_id: sessionId,
        floor_id: floorId,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to send message');
    }

    const data = await response.json();
    setSession(data.session_id);
    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('TIMEOUT');
    }
    throw error;
  }
};

/**
 * Verify a code for a floor
 */
export const verifyCode = async (code, floorId = null) => {
  const response = await fetch(`${API_BASE}/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code,
      session_id: sessionId,
      floor_id: floorId,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to verify code');
  }

  const data = await response.json();
  setSession(data.session_id);
  return data;
};

/**
 * Get a hint for a floor
 */
export const getHint = async (floorId) => {
  const params = new URLSearchParams({
    floor_id: floorId,
    ...(sessionId && { session_id: sessionId }),
  });

  const response = await fetch(`${API_BASE}/hint?${params}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to get hint');
  }

  const data = await response.json();
  setSession(data.session_id);
  return data;
};

/**
 * Get current game progress
 */
export const getProgress = async () => {
  const params = new URLSearchParams({
    ...(sessionId && { session_id: sessionId }),
  });

  const response = await fetch(`${API_BASE}/progress?${params}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to get progress');
  }

  const data = await response.json();
  setSession(data.session_id);
  return data;
};

/**
 * Reset the game
 */
export const resetGame = async () => {
  const response = await fetch(`${API_BASE}/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      session_id: sessionId,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to reset game');
  }

  const data = await response.json();
  setSession(data.session_id);
  return data;
};

export { getSession, setSession };
