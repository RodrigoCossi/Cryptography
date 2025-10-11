# Copilot Instructions for Cryptography Interactive Tools

## Project Overview

This is an interactive web application for exploring cryptographic operations, built with Node.js and vanilla JavaScript. The application provides a modern UI for demonstrating various cryptographic techniques including hash functions, symmetric/asymmetric encryption, digital signatures, and post-quantum encryption using Crystals-Kyber (ML-KEM-768).

## Architecture

### Backend (Node.js)
- **Location**: `src/server.js` and `src/cryptography-functions/`
- **Purpose**: HTTP server serving static files and API endpoints for cryptographic operations
- **Port**: 3000 (localhost)
- **Key Dependencies**: 
  - Built-in `crypto` module for standard cryptography
  - `crystals-kyber-js` for post-quantum encryption

### Frontend
- **Location**: `src/public/`
- **Stack**: Vanilla HTML5, CSS3, and JavaScript (no frameworks)
- **Design**: Modern gradient UI with responsive layout

### Cryptography Functions
Located in `src/cryptography-functions/`:
- `hash.js` - SHA-256 hashing
- `saltedHash.js` - Password hashing with salts
- `hmac.js` - Hash-based Message Authentication Code
- `symmetric-encryption.js` - AES-256 encryption/decryption
- `assymmetric-encryption.js` - RSA encryption/decryption
- `kyber-encryption.js` - Post-quantum Crystals-Kyber (ML-KEM-768) encryption
- `sign.js` - RSA-SHA256 digital signatures
- `keypair.js` - RSA key pair generation

## Code Style and Conventions

### JavaScript
- Use clear, descriptive function and variable names
- Follow existing patterns in the codebase (e.g., async/await for cryptographic operations)
- Add JSDoc comments for functions, especially for cryptographic operations
- Use Node.js built-in `crypto` module for standard cryptographic operations
- Handle errors comprehensively with try-catch blocks

### API Endpoints
- Follow REST conventions: `/api/[operation]`
- Use POST for operations that modify state or handle sensitive data
- Return JSON responses with consistent structure
- Include error handling for all endpoints

### Frontend
- Keep JavaScript modular with clear function separation
- Use async/await for API calls
- Provide user feedback for all operations (success/error states)
- Display results in a user-friendly format

## Security Considerations

**CRITICAL**: This is an educational/demonstration project. When working with cryptographic code:

1. **Never commit secrets or private keys** to the repository
2. **Always validate input** before processing cryptographic operations
3. **Use secure random number generation** (`crypto.randomBytes()`)
4. **Handle sensitive data carefully** - avoid logging secrets
5. **Key storage**: Current implementation uses in-memory storage (not suitable for production)
6. **HTTPS**: Production deployments should use HTTPS for all communications
7. **Input sanitization**: Always validate and sanitize user input before processing

### Specific Guidelines
- RSA key pairs are generated at startup and stored in memory
- Symmetric encryption uses AES-256-CBC with random IVs
- Post-quantum encryption uses ML-KEM-768 (Crystals-Kyber) per NIST standards
- Password hashing uses salted hashes (never store plain passwords)

## Development Workflow

### Getting Started
```bash
npm install        # Install dependencies
npm start         # Start the server (http://localhost:3000)
```

### Testing
- Currently no automated test suite exists
- Manual testing via web UI and API endpoints
- For new features, test both UI and API independently
- Test edge cases and error conditions

### Adding New Cryptographic Operations

1. **Create function module** in `src/cryptography-functions/`
   - Export clear function interfaces
   - Include comprehensive error handling
   - Add JSDoc documentation

2. **Add API endpoint** in `src/server.js`
   - Handle POST requests with JSON body
   - Parse and validate input
   - Return consistent JSON responses

3. **Update frontend** in `src/public/`
   - Add UI buttons/controls
   - Implement API call handlers
   - Display results appropriately

4. **Update documentation**
   - Add to README.md features list
   - Include usage examples if complex

## Common Tasks

### Adding a new hash function
1. Add function to `src/cryptography-functions/hash.js`
2. Add endpoint handler in `src/server.js` (follow existing patterns)
3. Add button and handler in `src/public/app.js`

### Modifying encryption algorithms
- Pay attention to IV generation and key management
- Ensure encrypted data, IV, and keys are properly encoded (typically hex)
- Test encryption/decryption round-trips

### UI Changes
- CSS is in `src/public/styles.css`
- Maintain responsive design (mobile and desktop)
- Follow existing color scheme and button styles
- Test across different screen sizes

## File Organization

```
.
├── src/
│   ├── server.js                 # Main HTTP server
│   ├── cryptography-functions/   # Core crypto implementations
│   └── public/                   # Frontend files
│       ├── index.html
│       ├── app.js
│       └── styles.css
├── examples/                     # Usage examples and demos
│   ├── kyber-usage.md
│   └── kyber-demo.js
├── README.md                     # Main documentation
└── package.json                  # Dependencies and scripts
```

## Dependencies Management

- **Keep dependencies minimal** - prefer Node.js built-in modules
- **Security updates**: Regularly update `crystals-kyber-js` for security patches
- **Document new dependencies** in README.md if they introduce new features

## Documentation Standards

- **README.md**: User-facing documentation, getting started, features
- **Code comments**: Technical details, algorithm explanations, parameter descriptions
- **Examples directory**: Detailed usage examples for complex features
- **Inline JSDoc**: For all exported functions

## Performance Considerations

- Cryptographic operations can be CPU-intensive
- Current implementation is synchronous on the server
- For production: consider worker threads for heavy operations
- Kyber operations are fast (~1-2ms for key generation, <1ms for encap/decap)

## Browser Compatibility

- Target modern browsers (ES6+ support)
- Use standard Web APIs (Fetch, Clipboard API)
- Test in Chrome, Firefox, Safari, and Edge

## Questions and Clarifications

When unclear about cryptographic implementation:
1. Check Node.js crypto documentation
2. Review existing similar functions in the codebase
3. Consult NIST standards for algorithm specifications
4. Ask for clarification on security requirements

## Educational Purpose

This project is designed to demonstrate cryptographic concepts interactively. When adding features:
- Prioritize clarity and educational value
- Include explanations in the UI where appropriate
- Make results visible and understandable
- Show intermediate steps when helpful for learning
