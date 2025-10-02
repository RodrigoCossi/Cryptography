const { MlKem768 } = require('crystals-kyber-js');
const { createCipheriv, createDecipheriv, randomBytes } = require('crypto');

// Store the key pair (in production, this should be stored securely)
let publicKey = null;
let secretKey = null;

/**
 * Generate a Kyber key pair
 * @returns {Promise<{publicKey: string, secretKey: string}>}
 */
async function generateKyberKeyPair() {
    const kyber = new MlKem768();
    const [pk, sk] = await kyber.generateKeyPair();
    
    publicKey = Buffer.from(pk).toString('hex');
    secretKey = Buffer.from(sk).toString('hex');
    
    return {
        publicKey: publicKey,
        secretKey: secretKey
    };
}

/**
 * Encrypt a message using Kyber (post-quantum encryption)
 * Uses Kyber for key encapsulation and AES for message encryption
 * @param {string} message - The message to encrypt
 * @returns {Promise<{encrypted: string, ciphertext: string}>}
 */
async function kyberEncrypt(message) {
    // Generate key pair if not already generated
    if (!publicKey || !secretKey) {
        await generateKyberKeyPair();
    }
    
    // Create sender instance
    const sender = new MlKem768();
    
    // Encapsulate: generates ciphertext and shared secret using public key
    const pkBuffer = Buffer.from(publicKey, 'hex');
    const [ct, sharedSecret] = await sender.encap(pkBuffer);
    
    // Use the shared secret as encryption key for AES
    // Kyber shared secret is 32 bytes, perfect for AES-256
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-256-cbc', Buffer.from(sharedSecret), iv);
    const encryptedMessage = cipher.update(message, 'utf8', 'hex') + cipher.final('hex');
    
    return {
        encrypted: encryptedMessage,
        ciphertext: Buffer.from(ct).toString('hex'),
        iv: iv.toString('hex')
    };
}

/**
 * Decrypt a message using Kyber (post-quantum encryption)
 * @param {string} encryptedMessage - The encrypted message
 * @param {string} ciphertext - The Kyber ciphertext
 * @param {string} ivHex - The initialization vector
 * @returns {Promise<string>} - The decrypted message
 */
async function kyberDecrypt(encryptedMessage, ciphertext, ivHex) {
    if (!secretKey) {
        throw new Error('Secret key not available. Generate key pair first.');
    }
    
    // Create recipient instance
    const recipient = new MlKem768();
    
    // Decapsulate: recover the shared secret using secret key and ciphertext
    const ctBuffer = Buffer.from(ciphertext, 'hex');
    const skBuffer = Buffer.from(secretKey, 'hex');
    const sharedSecret = await recipient.decap(ctBuffer, skBuffer);
    
    // Use the shared secret to decrypt the message
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = createDecipheriv('aes-256-cbc', Buffer.from(sharedSecret), iv);
    const decryptedMessage = decipher.update(encryptedMessage, 'hex', 'utf-8') + decipher.final('utf8');
    
    return decryptedMessage;
}

/**
 * Get the current public key (for sharing)
 * @returns {string|null}
 */
function getPublicKey() {
    return publicKey;
}

/**
 * Get information about the current key pair
 * @returns {object}
 */
function getKeyInfo() {
    return {
        hasKeyPair: !!(publicKey && secretKey),
        publicKeyLength: publicKey ? publicKey.length : 0,
        algorithm: 'ML-KEM-768 (Crystals-Kyber)',
        securityLevel: 'Post-Quantum Secure (NIST Level 3)'
    };
}

module.exports = {
    generateKyberKeyPair,
    kyberEncrypt,
    kyberDecrypt,
    getPublicKey,
    getKeyInfo
};
