# 🔐 Cryptography Interactive Tools

An interactive web application for exploring various cryptographic operations with an intuitive user interface.

## Features

This project contains:
- **Interactive Web UI** with a modern, responsive design
- **Hash Functions**: SHA-256 hashing and salted password hashing
- **HMAC**: Hash-based Message Authentication Code
- **Symmetric Encryption**: AES-256 encryption and decryption
- **Asymmetric Encryption**: RSA encryption and decryption  
- **Digital Signatures**: RSA-SHA256 message signing and verification
- **User Authentication**: Signup and login with salted password hashing
- **Chain Operations**: Apply multiple cryptographic operations in sequence
- **HTTP Server** for serving the web application and API endpoints

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the server: `npm start`
4. Open your browser to `http://localhost:3000`

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
- `POST /api/sign` - Digital signature
- `POST /api/verify` - Signature verification
- `POST /api/signup` - User registration
- `POST /api/login` - User authentication

## Technical Details

- **Backend**: Node.js with built-in `crypto` module
- **Frontend**: Vanilla HTML5, CSS3, and JavaScript
- **UI Design**: Modern gradient design with responsive layout
- **Security**: Uses Node.js crypto best practices
- **Error Handling**: Comprehensive error handling for all operations

## Screenshots

![Cryptography Interactive Tools Interface](https://github.com/user-attachments/assets/838c2c36-d1e9-4f4e-b25f-3e7763b1ea3e)

![Results and Chain Operations](https://github.com/user-attachments/assets/f7c564c7-bb63-4914-8fd5-5c72becb9c18)
