// both "key" and "message" are required for encrypting.
// result is always the same, for same key and message.

const { createHmac } = require('crypto');

const secretKey = 'super-secret!';
const message = 'boo 👻';

const hmac = createHmac('sha256', secretKey).update(message).digest('hex');

console.log(hmac);

const secretKey2 = 'other-password';
const hmac2 = createHmac('sha256', secretKey2).update(message).digest('hex');

console.log(hmac2);
