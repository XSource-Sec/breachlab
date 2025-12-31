/**
 * Dynamic OG Image Generator for BreachLab
 * Generates SVG images for social sharing
 *
 * Usage: /api/og?level=7&badge=gold&name=Iviel
 */

const BADGES = {
  bronze: { icon: '🥉', name: 'Script Kiddie', color: '#CD7F32' },
  silver: { icon: '🥈', name: 'Social Engineer', color: '#C0C0C0' },
  gold: { icon: '🥇', name: 'Prompt Hacker', color: '#FFD700' },
  diamond: { icon: '💎', name: 'AI Breaker', color: '#B9F2FF' },
};

/**
 * Sanitize name input - remove HTML, limit length, escape for SVG
 */
function sanitizeName(name) {
  if (!name) return '';
  return name
    .replace(/[<>&"']/g, '') // Remove HTML/XML special chars
    .replace(/[^\w\s\-_.]/g, '') // Only allow safe characters
    .trim()
    .slice(0, 20); // Max 20 chars
}

function generateSVG(level, badgeId, name) {
  const badge = BADGES[badgeId] || null;
  const badgeIcon = badge?.icon || '🔓';
  const badgeName = badge?.name || '';
  const badgeColor = badge?.color || '#00ff88';
  const sanitizedName = sanitizeName(name);

  // SVG dimensions (Twitter/LinkedIn optimal)
  const width = 1200;
  const height = 630;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0a0a"/>
      <stop offset="100%" style="stop-color:#1a1a2e"/>
    </linearGradient>

    <!-- Glow effect -->
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- Neon text glow -->
    <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bgGrad)"/>

  <!-- Grid pattern overlay -->
  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00ff8810" stroke-width="1"/>
  </pattern>
  <rect width="${width}" height="${height}" fill="url(#grid)"/>

  <!-- Top accent line -->
  <rect x="0" y="0" width="${width}" height="4" fill="#00ff88"/>

  <!-- Logo text (top left) -->
  <text x="60" y="70" font-family="Arial, sans-serif" font-size="32" font-weight="bold">
    <tspan fill="#ffffff">BREACH</tspan><tspan fill="#00ff88">LAB</tspan>
  </text>

  <!-- Badge icon (large, center) -->
  <text x="${width / 2}" y="260" font-size="120" text-anchor="middle" filter="url(#glow)">
    ${badgeIcon}
  </text>

  <!-- Level text -->
  <text x="${width / 2}" y="360" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="#ffffff">
    ${sanitizedName ? `${sanitizedName} beat Level ${level}!` : `Level ${level} Complete!`}
  </text>

  <!-- Badge name (if earned) -->
  ${badge ? `
  <text x="${width / 2}" y="420" font-family="Arial, sans-serif" font-size="36" text-anchor="middle" fill="${badgeColor}" filter="url(#neonGlow)">
    ${badgeName}
  </text>
  ` : ''}

  <!-- Call to action -->
  <text x="${width / 2}" y="520" font-family="Arial, sans-serif" font-size="28" text-anchor="middle" fill="#888888">
    Can you hack an AI?
  </text>

  <!-- URL -->
  <text x="${width / 2}" y="570" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#00ff88" filter="url(#neonGlow)">
    breachlab.xsourcesec.com
  </text>

  <!-- Bottom accent line -->
  <rect x="0" y="${height - 4}" width="${width}" height="4" fill="#00ff88"/>

  <!-- Corner accents -->
  <path d="M 0 80 L 0 0 L 80 0" fill="none" stroke="#00ff88" stroke-width="2" opacity="0.5"/>
  <path d="M ${width} 80 L ${width} 0 L ${width - 80} 0" fill="none" stroke="#00ff88" stroke-width="2" opacity="0.5"/>
  <path d="M 0 ${height - 80} L 0 ${height} L 80 ${height}" fill="none" stroke="#00ff88" stroke-width="2" opacity="0.5"/>
  <path d="M ${width} ${height - 80} L ${width} ${height} L ${width - 80} ${height}" fill="none" stroke="#00ff88" stroke-width="2" opacity="0.5"/>
</svg>`;
}

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  // Get query parameters
  const level = url.searchParams.get('level') || '1';
  const badge = url.searchParams.get('badge') || '';
  const name = url.searchParams.get('name') || '';

  // Generate SVG
  const svg = generateSVG(level, badge, name);

  // Return SVG with proper headers
  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
