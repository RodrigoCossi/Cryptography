const { createSign, createVerify } = require('crypto');
const { publicKey, privateKey } = require('./keypair');

function signMessage(message) {
    const signer = createSign('rsa-sha256');
    signer.update(message);
    const signature = signer.sign(privateKey, 'hex');
    return signature;
}

function verifySignature(message, signature) {
    const verifier = createVerify('rsa-sha256');
    verifier.update(message);
    const isVerified = verifier.verify(publicKey, signature, 'hex');
    return isVerified;
}

module.exports = { signMessage, verifySignature };

