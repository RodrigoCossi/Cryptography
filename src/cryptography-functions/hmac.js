// both "key" and "message" are required for encrypting.
// result is always the same, for same key and message.

const { createHmac } = require('crypto');

function hmac(message, secretKey = 'super-secret!') {
    return createHmac('sha256', secretKey).update(message).digest('hex');
}

module.exports = { hmac };
