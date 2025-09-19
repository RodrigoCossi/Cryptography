

const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

// Import cryptography functions
const { hash } = require('./cryptography-functions/hash');
const { saltedHash, signup, login } = require('./cryptography-functions/saltedHash');
const { hmac } = require('./cryptography-functions/hmac');
const { symmetricEncrypt, symmetricDecrypt } = require('./cryptography-functions/symmetric-encryption');
const { asymmetricEncrypt, asymmetricDecrypt } = require('./cryptography-functions/assymmetric-encryption');
const { signMessage, verifySignature } = require('./cryptography-functions/sign');

const hostname = '127.0.0.1';
const port = 3000;

// Serve static files
function serveStaticFile(res, filePath, contentType) {
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(500);
                res.end('Server error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
}

// Handle API requests
function handleApiRequest(req, res, parsedUrl) {
    const method = req.method;
    const pathname = parsedUrl.pathname;

    if (method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                let result = {};

                switch (pathname) {
                    case '/api/hash':
                        result = { hash: hash(data.message) };
                        break;
                    
                    case '/api/saltedHash':
                        result = saltedHash(data.message);
                        break;
                    
                    case '/api/hmac':
                        result = { hmac: hmac(data.message, data.secretKey) };
                        break;
                    
                    case '/api/symmetricEncrypt':
                        result = symmetricEncrypt(data.message);
                        break;
                    
                    case '/api/symmetricDecrypt':
                        try {
                            const decrypted = symmetricDecrypt(data.encrypted, data.key, data.iv);
                            result = { decrypted };
                        } catch (error) {
                            result = { error: 'Decryption failed: ' + error.message };
                        }
                        break;
                    
                    case '/api/asymmetricEncrypt':
                        try {
                            result = { encrypted: asymmetricEncrypt(data.message) };
                        } catch (error) {
                            result = { error: 'Encryption failed: ' + error.message };
                        }
                        break;
                    
                    case '/api/asymmetricDecrypt':
                        try {
                            result = { decrypted: asymmetricDecrypt(data.encrypted) };
                        } catch (error) {
                            result = { error: 'Decryption failed: ' + error.message };
                        }
                        break;
                    
                    case '/api/sign':
                        try {
                            result = { signature: signMessage(data.message) };
                        } catch (error) {
                            result = { error: 'Signing failed: ' + error.message };
                        }
                        break;
                    
                    case '/api/verify':
                        try {
                            result = { verified: verifySignature(data.message, data.signature) };
                        } catch (error) {
                            result = { error: 'Verification failed: ' + error.message };
                        }
                        break;
                    
                    case '/api/signup':
                        try {
                            result = signup(data.email, data.password);
                        } catch (error) {
                            result = { error: 'Signup failed: ' + error.message };
                        }
                        break;
                    
                    case '/api/login':
                        try {
                            result = { message: login(data.email, data.password) };
                        } catch (error) {
                            result = { error: 'Login failed: ' + error.message };
                        }
                        break;
                    
                    default:
                        res.writeHead(404);
                        res.end(JSON.stringify({ error: 'API endpoint not found' }));
                        return;
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Invalid JSON or processing error: ' + error.message }));
            }
        });
    } else {
        res.writeHead(405);
        res.end(JSON.stringify({ error: 'Method not allowed' }));
    }
}

// Create HTTP server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Handle API requests
    if (pathname.startsWith('/api/')) {
        handleApiRequest(req, res, parsedUrl);
        return;
    }

    // Serve static files
    let filePath = path.join(__dirname, 'public');
    
    if (pathname === '/') {
        filePath = path.join(filePath, 'index.html');
    } else {
        filePath = path.join(filePath, pathname);
    }

    const extname = path.extname(filePath).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.svg': 'application/image/svg+xml'
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';
    serveStaticFile(res, filePath, contentType);
});

server.listen(port, hostname, () => {
    console.log(`Cryptography Interactive App running at http://${hostname}:${port}/`);
});

