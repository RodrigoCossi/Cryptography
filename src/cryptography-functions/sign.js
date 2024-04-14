const { createSign, createVerify } = require('crypto');
const { publicKey, privateKey } = require('./keypair');

const message = 'this data must be signed';

/// SIGN

// Create a signer object using the 'rsa-sha256' algorithm
const signer = createSign('rsa-sha256');

signer.update(message);

const signature = signer.sign(privateKey, 'hex');


/// VERIFY

// Create a verifier object using the same algorithm as the signer
const verifier = createVerify('rsa-sha256');

verifier.update(message);

const isVerified = verifier.verify(publicKey, signature, 'hex');

console.log(`Verified: ${isVerified}`)

