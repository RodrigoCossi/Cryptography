const { createCipheriv, randomBytes, createDecipheriv } = require('crypto');

function symmetricEncrypt(message, key = null, iv = null) {
    // Generate key and IV if not provided
    const encryptionKey = key || randomBytes(32);
    const initVector = iv || randomBytes(16);
    
    const cipher = createCipheriv('aes256', encryptionKey, initVector);
    const encryptedMessage = cipher.update(message, 'utf8', 'hex') + cipher.final('hex');
    
    return {
        encrypted: encryptedMessage,
        key: encryptionKey.toString('hex'),
        iv: initVector.toString('hex')
    };
}

function symmetricDecrypt(encryptedMessage, keyHex, ivHex) {
    const key = Buffer.from(keyHex, 'hex');
    const iv = Buffer.from(ivHex, 'hex');
    
    const decipher = createDecipheriv('aes256', key, iv);
    const decryptedMessage = decipher.update(encryptedMessage, 'hex', 'utf-8') + decipher.final('utf8');
    
    return decryptedMessage;
}

module.exports = { symmetricEncrypt, symmetricDecrypt };