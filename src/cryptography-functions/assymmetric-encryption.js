const { publicEncrypt, privateDecrypt } = require('crypto');
const { publicKey, privateKey } = require('./keypair');

function asymmetricEncrypt(message) {
    const encryptedData = publicEncrypt(
        publicKey,
        Buffer.from(message)
    );
    return encryptedData.toString('hex');
}

function asymmetricDecrypt(encryptedHex) {
    const encryptedBuffer = Buffer.from(encryptedHex, 'hex');
    const decryptedData = privateDecrypt(
        privateKey,
        encryptedBuffer
    );
    return decryptedData.toString('utf-8');
}

module.exports = { asymmetricEncrypt, asymmetricDecrypt };