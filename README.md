# 🔐 Cryptography Interactive Tools

An interactive web application for exploring various cryptographic operations with an intuitive user interface.

## Screenshots

![Cryptography Interactive Tools Interface](https://github.com/user-attachments/assets/e5928684-028c-49ef-ac3c-5689cf7ec0c6)

![Kyber Post-Quantum Encryption in Action](https://github.com/user-attachments/assets/2917be09-f502-4bcb-b1ae-5d76ca3774b7)

## Features

This project contains:
- **Interactive Web UI** with a modern, responsive design
- **Hash Functions**: SHA-256 hashing and salted password hashing
- **HMAC**: Hash-based Message Authentication Code
- **Symmetric Encryption**: AES-256 encryption and decryption
- **Asymmetric Encryption**: RSA encryption and decryption  
- **Quantum-Resistant Encryption**: Crystals-Kyber (ML-KEM-768) post-quantum encryption
- **Digital Signatures**: RSA-SHA256 message signing and verification
- **User Authentication**: Signup and login with salted password hashing
- **Chain Operations**: Apply multiple cryptographic operations in sequence
- **HTTP Server** for serving the web application and API endpoints

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the server: `npm start`
4. Open your browser to `http://localhost:3000`

For detailed Crystals-Kyber usage examples, see [examples/kyber-usage.md](examples/kyber-usage.md).

## Usage

### Web Interface

The application provides an intuitive web interface where you can:

1. **Enter a message** in the input textarea
2. **Click any cryptography button** to apply operations
3. **View results** in the results section with proper formatting
4. **Chain operations** using the preset chain buttons for complex workflows
5. **Copy results** to clipboard for further use

### Available Operations

- **SHA-256 Hash**: Generate a secure hash of your input
- **Salted Hash**: Create a salted hash for password storage
- **HMAC**: Generate Hash-based Message Authentication Code
- **AES-256 Encryption/Decryption**: Symmetric encryption with automatic key generation
- **RSA Encryption/Decryption**: Asymmetric encryption using generated key pairs
- **Crystals-Kyber Encryption/Decryption**: Post-quantum secure encryption using ML-KEM-768
- **Digital Signatures**: Sign messages and verify signatures
- **User Authentication**: Demonstrate secure signup/login flows

### Chain Operations

Combine multiple cryptographic operations:
- **Hash → HMAC → Encrypt → Sign**: Full security pipeline
- **Hash → Symmetric Encrypt**: Hash then encrypt the result
- **Sign → Asymmetric Encrypt**: Sign message then encrypt the signature

## API Endpoints

The application provides REST API endpoints for programmatic access:

- `POST /api/hash` - SHA-256 hashing
- `POST /api/saltedHash` - Generate salted hash
- `POST /api/hmac` - Generate HMAC
- `POST /api/symmetricEncrypt` - AES-256 encryption
- `POST /api/symmetricDecrypt` - AES-256 decryption
- `POST /api/asymmetricEncrypt` - RSA encryption
- `POST /api/asymmetricDecrypt` - RSA decryption
- `POST /api/kyberGenerateKeys` - Generate Crystals-Kyber key pair
- `POST /api/kyberEncrypt` - Quantum-resistant encryption
- `POST /api/kyberDecrypt` - Quantum-resistant decryption
- `POST /api/kyberInfo` - Get information about current Kyber keys
- `POST /api/sign` - Digital signature
- `POST /api/verify` - Signature verification
- `POST /api/signup` - User registration
- `POST /api/login` - User authentication

## Quantum-Resistant Encryption

This project now includes **Crystals-Kyber** (ML-KEM-768), a quantum-resistant encryption algorithm that is part of NIST's Post-Quantum Cryptography standardization (FIPS 203). 

### Why Quantum-Resistant Cryptography?

Traditional encryption methods like RSA and ECC are vulnerable to attacks from quantum computers. Crystals-Kyber provides:

- **Post-Quantum Security**: Resistant to attacks from both classical and quantum computers
- **NIST Standardized**: Part of the NIST Post-Quantum Cryptography standard (ML-KEM)
- **High Performance**: Fast key generation, encryption, and decryption
- **Security Level 3**: Equivalent to AES-192 security

### Usage Example

```javascript
// Generate Kyber key pair
const keys = await generateKyberKeyPair();

// Encrypt a message
const encrypted = await kyberEncrypt("Secret message");
// Returns: { encrypted, ciphertext, iv }

// Decrypt the message
const decrypted = await kyberDecrypt(encrypted.encrypted, encrypted.ciphertext, encrypted.iv);
// Returns: "Secret message"
```

## Technical Details

- **Backend**: Node.js with built-in `crypto` module and `crystals-kyber-js`
- **Quantum Encryption**: ML-KEM-768 (Crystals-Kyber) via `crystals-kyber-js` library
- **Frontend**: Vanilla HTML5, CSS3, and JavaScript
- **UI Design**: Modern gradient design with responsive layout
- **Security**: Uses Node.js crypto best practices
- **Error Handling**: Comprehensive error handling for all operations
