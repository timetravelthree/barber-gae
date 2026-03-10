export default async function handler(req, res) {
    const { code } = req.query;
    const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

    const r = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ client_id: GITHUB_CLIENT_ID, client_secret: GITHUB_CLIENT_SECRET, code }),
    });

    const data = await r.json();
    const status = data.error ? 'error' : 'success';
    const payload = data.error
        ? JSON.stringify({ error: data.error })
        : JSON.stringify({ token: data.access_token, provider: 'github' });

    res.setHeader('Content-Type', 'text/html');
    res.send(`<!DOCTYPE html><html><body><script>
        (function() {
            const msg = 'authorization:github:${status}:' + ${JSON.stringify(payload)};
            if (window.opener) { window.opener.postMessage(msg, '*'); window.close(); }
        })();
    </script></body></html>`);
}
