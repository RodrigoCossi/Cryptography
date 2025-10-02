# Crystals-Kyber Usage Examples

This document provides examples of how to use the Crystals-Kyber (ML-KEM-768) quantum-resistant encryption in this project.

## What is Crystals-Kyber?

Crystals-Kyber is a post-quantum cryptographic algorithm selected by NIST for standardization as ML-KEM (Module-Lattice-Based Key-Encapsulation Mechanism). It provides security against both classical and quantum computer attacks.

## API Usage Examples

### 1. Generate Key Pair

Before encrypting messages, you need to generate a Kyber key pair:

```bash
curl -X POST http://localhost:3000/api/kyberGenerateKeys \
  -H "Content-Type: application/json" \
  -d '{}'
```

Response:
```json
{
  "publicKey": "6249847c9c223cf4...",
  "secretKey": "a1b2c3d4e5f6...",
  "info": {
    "hasKeyPair": true,
    "publicKeyLength": 2368,
    "algorithm": "ML-KEM-768 (Crystals-Kyber)",
    "securityLevel": "Post-Quantum Secure (NIST Level 3)"
  }
}
```

### 2. Get Key Information

Check the current key pair status:

```bash
curl -X POST http://localhost:3000/api/kyberInfo \
  -H "Content-Type: application/json" \
  -d '{}'
```

Response:
```json
{
  "hasKeyPair": true,
  "publicKeyLength": 2368,
  "algorithm": "ML-KEM-768 (Crystals-Kyber)",
  "securityLevel": "Post-Quantum Secure (NIST Level 3)"
}
```

### 3. Encrypt a Message

Encrypt a message using Kyber:

```bash
curl -X POST http://localhost:3000/api/kyberEncrypt \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello Quantum World!"}'
```

Response:
```json
{
  "encrypted": "6cfd5a10eeabd7e8f2c2b99be5698cef...",
  "ciphertext": "530d2484c92f4134ac0881dbad0798398e697468...",
  "iv": "76589b5a1abdb7d1d75ae2ded0fac896"
}
```

**Note**: Save all three values (`encrypted`, `ciphertext`, and `iv`) - you'll need all of them to decrypt the message.

### 4. Decrypt a Message

Decrypt the message using the values from encryption:

```bash
curl -X POST http://localhost:3000/api/kyberDecrypt \
  -H "Content-Type: application/json" \
  -d '{
    "encrypted": "6cfd5a10eeabd7e8f2c2b99be5698cef...",
    "ciphertext": "530d2484c92f4134ac0881dbad0798398e697468...",
    "iv": "76589b5a1abdb7d1d75ae2ded0fac896"
  }'
```

Response:
```json
{
  "decrypted": "Hello Quantum World!"
}
```

## JavaScript/Node.js Usage

### Direct Module Usage

```javascript
const { 
  generateKyberKeyPair, 
  kyberEncrypt, 
  kyberDecrypt, 
  getKeyInfo 
} = require('./src/cryptography-functions/kyber-encryption');

async function example() {
  // Generate key pair
  const keys = await generateKyberKeyPair();
  console.log('Keys generated:', keys.publicKey.substring(0, 20) + '...');
  
  // Get key information
  const info = getKeyInfo();
  console.log('Algorithm:', info.algorithm);
  console.log('Security Level:', info.securityLevel);
  
  // Encrypt a message
  const message = 'Secret quantum message';
  const encrypted = await kyberEncrypt(message);
  console.log('Encrypted successfully');
  
  // Decrypt the message
  const decrypted = await kyberDecrypt(
    encrypted.encrypted,
    encrypted.ciphertext,
    encrypted.iv
  );
  console.log('Decrypted:', decrypted);
  
  // Verify
  console.log('Match:', message === decrypted);
}

example();
```

## Understanding the Encryption Process

Kyber uses a **Key Encapsulation Mechanism (KEM)** combined with symmetric encryption:

1. **Key Generation**: Creates a public/secret key pair
2. **Encryption**: 
   - Uses the public key to generate a shared secret and ciphertext
   - Uses the shared secret with AES-256 to encrypt the actual message
3. **Decryption**:
   - Uses the secret key and ciphertext to recover the shared secret
   - Uses the shared secret to decrypt the message with AES-256

This hybrid approach combines the quantum resistance of Kyber with the performance of symmetric encryption.

## Security Considerations

- **Quantum Resistance**: Secure against Shor's algorithm and other quantum attacks
- **Security Level**: ML-KEM-768 provides NIST Security Level 3 (equivalent to AES-192)
- **Key Storage**: In production, store keys securely (not in memory as done here)
- **Forward Secrecy**: Generate new key pairs for each session when possible

## Technical Specifications

- **Algorithm**: ML-KEM-768 (Crystals-Kyber)
- **Public Key Size**: 1184 bytes (2368 hex characters)
- **Secret Key Size**: 2400 bytes (4800 hex characters)
- **Ciphertext Size**: 1088 bytes (2176 hex characters)
- **Shared Secret**: 32 bytes (used for AES-256 encryption)
- **Security Level**: NIST Level 3 (equivalent to AES-192)

## Performance

Kyber is designed for high performance:

- Fast key generation (< 1ms)
- Fast encapsulation/encryption (< 1ms)
- Fast decapsulation/decryption (< 1ms)
- Suitable for real-time applications

## Comparison with RSA

| Feature | RSA-2048 | Kyber-768 |
|---------|----------|-----------|
| Quantum Resistant | ❌ No | ✅ Yes |
| Public Key Size | 256 bytes | 1184 bytes |
| Ciphertext Size | 256 bytes | 1088 bytes |
| Encryption Speed | Slow | Very Fast |
| Decryption Speed | Very Slow | Very Fast |
| NIST Standard | Yes (classical) | Yes (post-quantum) |

## Future-Proofing

By implementing Kyber now, this project is prepared for the post-quantum era when quantum computers may break current encryption standards. This demonstrates best practices in:

- Cryptographic agility
- Future-proof security
- Compliance with NIST standards
- Protection of long-term sensitive data
