/**
 * Simple demonstration of Crystals-Kyber encryption
 * Run with: node examples/kyber-demo.js
 */

const { 
  generateKyberKeyPair, 
  kyberEncrypt, 
  kyberDecrypt, 
  getKeyInfo 
} = require('../src/cryptography-functions/kyber-encryption');

async function demo() {
  console.log('🔐 Crystals-Kyber Post-Quantum Encryption Demo\n');
  console.log('='.repeat(50) + '\n');

  try {
    // Step 1: Generate Keys
    console.log('Step 1: Generating Kyber key pair...');
    const keys = await generateKyberKeyPair();
    console.log('✓ Key pair generated successfully!\n');

    // Step 2: Display Key Info
    console.log('Step 2: Key Information:');
    const info = getKeyInfo();
    console.log(`  Algorithm: ${info.algorithm}`);
    console.log(`  Security Level: ${info.securityLevel}`);
    console.log(`  Public Key Length: ${info.publicKeyLength} characters`);
    console.log(`  Has Valid Key Pair: ${info.hasKeyPair}\n`);

    // Step 3: Encrypt a message
    const secretMessage = 'This message is protected by quantum-resistant cryptography! 🛡️';
    console.log('Step 3: Encrypting a message...');
    console.log(`  Original: "${secretMessage}"`);
    
    const encrypted = await kyberEncrypt(secretMessage);
    console.log(`  ✓ Encrypted successfully!`);
    console.log(`  Encrypted data length: ${encrypted.encrypted.length} characters`);
    console.log(`  Ciphertext length: ${encrypted.ciphertext.length} characters`);
    console.log(`  IV length: ${encrypted.iv.length} characters\n`);

    // Step 4: Decrypt the message
    console.log('Step 4: Decrypting the message...');
    const decrypted = await kyberDecrypt(
      encrypted.encrypted,
      encrypted.ciphertext,
      encrypted.iv
    );
    console.log(`  Decrypted: "${decrypted}"`);
    
    // Step 5: Verify
    console.log('\nStep 5: Verification:');
    if (secretMessage === decrypted) {
      console.log('  ✅ SUCCESS! Message decrypted correctly!');
      console.log('  ✅ Encryption and decryption are working perfectly!\n');
    } else {
      console.log('  ❌ ERROR! Messages do not match!\n');
    }

    console.log('='.repeat(50));
    console.log('\n💡 Key Points:');
    console.log('  • Kyber is quantum-resistant (secure against quantum computers)');
    console.log('  • Uses ML-KEM-768 (NIST standardized algorithm)');
    console.log('  • Provides Security Level 3 (equivalent to AES-192)');
    console.log('  • Fast and efficient for real-world applications');
    console.log('\n✨ Demo completed successfully!\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Run the demo
demo();
