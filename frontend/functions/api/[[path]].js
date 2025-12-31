/**
 * Cloudflare Pages Function - API Proxy
 * Proxies /api/* requests to the BreachLab backend on Fly.io
 */

const BACKEND_URL = 'https://breachlab-api.fly.dev';

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  // Build the backend URL
  const backendUrl = BACKEND_URL + url.pathname + url.search;

  // Clone the request with the new URL
  const proxyRequest = new Request(backendUrl, {
    method: request.method,
    headers: request.headers,
    body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
    redirect: 'follow',
  });

  try {
    const response = await fetch(proxyRequest);

    // Clone the response and add CORS headers
    const newResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });

    // Ensure CORS headers are set
    newResponse.headers.set('Access-Control-Allow-Origin', '*');
    newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return newResponse;
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Backend unavailable', detail: error.message }), {
      status: 502,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}

// Handle OPTIONS preflight requests
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}
