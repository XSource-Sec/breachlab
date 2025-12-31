/**
 * Dynamic Share Page for BreachLab
 * Renders HTML with dynamic OG meta tags for social sharing
 *
 * Usage: /share?level=7&badge=gold&name=Iviel
 */

const BADGES = {
  bronze: { icon: '🥉', name: 'Script Kiddie' },
  silver: { icon: '🥈', name: 'Social Engineer' },
  gold: { icon: '🥇', name: 'Prompt Hacker' },
  diamond: { icon: '💎', name: 'AI Breaker' },
};

/**
 * Sanitize name input for safe display
 */
function sanitizeName(name) {
  if (!name) return '';
  return name
    .replace(/[<>&"']/g, '') // Remove HTML/XML special chars
    .replace(/[^\w\s\-_.]/g, '') // Only allow safe characters
    .trim()
    .slice(0, 20); // Max 20 chars
}

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  // Get query parameters
  const level = url.searchParams.get('level') || '1';
  const badgeId = url.searchParams.get('badge') || '';
  const rawName = url.searchParams.get('name') || '';
  const badge = BADGES[badgeId];
  const name = sanitizeName(rawName);

  // Build dynamic content
  const badgeName = badge?.name || '';
  const badgeIcon = badge?.icon || '🔓';

  const title = name
    ? `${badgeIcon} ${name} - ${badgeName || 'Level ' + level} | BreachLab`
    : badge
      ? `${badgeIcon} ${badgeName} - Level ${level} | BreachLab`
      : `Level ${level} Complete! | BreachLab`;

  const description = name
    ? `${name} earned the ${badgeName || 'a'} badge on BreachLab! Can you hack an AI? They made it to Level ${level}.`
    : badge
      ? `I earned the ${badgeName} badge on BreachLab! Can you hack an AI? I made it to Level ${level}.`
      : `I beat Level ${level} on BreachLab! Can you hack an AI?`;

  // Build URLs with name parameter if present
  let ogImageUrl = `https://breachlab.xsourcesec.com/api/og?level=${level}&badge=${badgeId}`;
  let canonicalUrl = `https://breachlab.xsourcesec.com/share?level=${level}&badge=${badgeId}`;
  if (name) {
    ogImageUrl += `&name=${encodeURIComponent(name)}`;
    canonicalUrl += `&name=${encodeURIComponent(name)}`;
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Primary Meta Tags -->
  <title>${title}</title>
  <meta name="title" content="${title}">
  <meta name="description" content="${description}">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${ogImageUrl}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="BreachLab">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${canonicalUrl}">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${ogImageUrl}">

  <!-- Redirect to main site after a short delay -->
  <meta http-equiv="refresh" content="0;url=https://breachlab.xsourcesec.com">

  <style>
    body {
      background: #0a0a0a;
      color: #fff;
      font-family: system-ui, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
    }
    .container {
      text-align: center;
      padding: 2rem;
    }
    .badge {
      font-size: 4rem;
      margin-bottom: 1rem;
    }
    h1 {
      color: #00ff88;
      margin-bottom: 0.5rem;
    }
    p {
      color: #888;
    }
    a {
      color: #00ff88;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="badge">${badgeIcon}</div>
    <h1>${title}</h1>
    <p>${description}</p>
    <p>Redirecting to <a href="https://breachlab.xsourcesec.com">BreachLab</a>...</p>
  </div>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
