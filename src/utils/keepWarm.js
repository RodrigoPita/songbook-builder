/**
 * Keep the Vercel PDF function warm by pinging it every 5 minutes
 * This prevents cold starts and ensures fast PDF generation
 */

const PDF_API_URL = 'https://YOUR-APP/api/generate-pdf';
const PING_INTERVAL = 5 * 60 * 1000; // 5 minutes

let pingInterval = null;

export function startKeepWarm() {
    // Don't start if already running
    if (pingInterval) return;

    // Send initial ping
    pingFunction();

    // Set up interval
    pingInterval = setInterval(pingFunction, PING_INTERVAL);

    console.log('✅ Keep-warm service started');
}

export function stopKeepWarm() {
    if (pingInterval) {
        clearInterval(pingInterval);
        pingInterval = null;
        console.log('⏹️ Keep-warm service stopped');
    }
}

async function pingFunction() {
    try {
        await fetch(PDF_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ health: true })
        });
        console.log('🏓 Pinged PDF function');
    } catch (error) {
        // Silently fail - it's just a keep-warm ping
        console.log('⚠️ Keep-warm ping failed (this is okay)');
    }
}
