// Store encryption keys and signatures for decrypt/verify operations
let storedKeys = {
    symmetricKey: null,
    symmetricIv: null,
    encryptedData: null,
    signature: null,
    asymmetricEncrypted: null
};

// Make API request
async function makeApiRequest(endpoint, data) {
    try {
        const response = await fetch(`/api/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}

// Display results
function displayResult(title, content, type = 'normal') {
    const resultsDiv = document.getElementById('results');
    
    // Create result item
    const resultItem = document.createElement('div');
    resultItem.className = `result-item ${type === 'success' ? 'result-success' : type === 'error' ? 'result-error' : ''}`;
    
    const titleElement = document.createElement('strong');
    titleElement.textContent = title;
    resultItem.appendChild(titleElement);
    
    const contentElement = document.createElement('div');
    contentElement.textContent = content;
    resultItem.appendChild(contentElement);
    
    // Clear placeholder if exists
    const placeholder = resultsDiv.querySelector('.placeholder');
    if (placeholder) {
        placeholder.remove();
    }
    
    resultsDiv.appendChild(resultItem);
    
    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Clear results
function clearResults() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<p class="placeholder">Results will appear here after performing cryptographic operations...</p>';
}

// Copy results to clipboard
function copyResults() {
    const resultsDiv = document.getElementById('results');
    const text = resultsDiv.innerText;
    
    navigator.clipboard.writeText(text).then(() => {
        alert('Results copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy results to clipboard');
    });
}

// Get input message
function getInputMessage() {
    const message = document.getElementById('inputMessage').value;
    if (!message.trim()) {
        alert('Please enter a message first!');
        throw new Error('No input message');
    }
    return message;
}

// Perform operation
async function performOperation(operation) {
    try {
        const message = getInputMessage();
        let result;

        switch (operation) {
            case 'hash':
                result = await makeApiRequest('hash', { message });
                displayResult('SHA-256 Hash:', result.hash);
                break;

            case 'saltedHash':
                result = await makeApiRequest('saltedHash', { message });
                displayResult('Salted Hash:', `Salt: ${result.salt}\nHash: ${result.saltedHashPassword}`);
                break;

            case 'hmac':
                const secretKey = prompt('Enter a secret key for HMAC:') || 'default-secret-key';
                result = await makeApiRequest('hmac', { message, secretKey });
                displayResult('HMAC:', result.hmac);
                break;

            case 'symmetricEncrypt':
                result = await makeApiRequest('symmetricEncrypt', { message });
                storedKeys.symmetricKey = result.key;
                storedKeys.symmetricIv = result.iv;
                storedKeys.encryptedData = result.encrypted;
                displayResult('AES-256 Encryption:', 
                    `Encrypted: ${result.encrypted}\nKey: ${result.key}\nIV: ${result.iv}\n\n(Key and IV stored for decryption)`,
                    'success');
                break;

            case 'symmetricDecrypt':
                if (!storedKeys.encryptedData) {
                    alert('Please encrypt a message first!');
                    return;
                }
                result = await makeApiRequest('symmetricDecrypt', {
                    encrypted: storedKeys.encryptedData,
                    key: storedKeys.symmetricKey,
                    iv: storedKeys.symmetricIv
                });
                if (result.error) {
                    displayResult('Decryption Error:', result.error, 'error');
                } else {
                    displayResult('AES-256 Decryption:', result.decrypted, 'success');
                }
                break;

            case 'asymmetricEncrypt':
                result = await makeApiRequest('asymmetricEncrypt', { message });
                if (result.error) {
                    displayResult('Encryption Error:', result.error, 'error');
                } else {
                    storedKeys.asymmetricEncrypted = result.encrypted;
                    displayResult('RSA Encryption:', result.encrypted + '\n\n(Encrypted data stored for decryption)', 'success');
                }
                break;

            case 'asymmetricDecrypt':
                if (!storedKeys.asymmetricEncrypted) {
                    alert('Please encrypt a message with RSA first!');
                    return;
                }
                result = await makeApiRequest('asymmetricDecrypt', { encrypted: storedKeys.asymmetricEncrypted });
                if (result.error) {
                    displayResult('Decryption Error:', result.error, 'error');
                } else {
                    displayResult('RSA Decryption:', result.decrypted, 'success');
                }
                break;

            case 'sign':
                result = await makeApiRequest('sign', { message });
                if (result.error) {
                    displayResult('Signing Error:', result.error, 'error');
                } else {
                    storedKeys.signature = result.signature;
                    displayResult('Digital Signature:', result.signature + '\n\n(Signature stored for verification)', 'success');
                }
                break;

            case 'verify':
                if (!storedKeys.signature) {
                    alert('Please sign a message first!');
                    return;
                }
                result = await makeApiRequest('verify', { message, signature: storedKeys.signature });
                if (result.error) {
                    displayResult('Verification Error:', result.error, 'error');
                } else {
                    const verified = result.verified;
                    displayResult('Signature Verification:', 
                        verified ? '✅ Signature is valid!' : '❌ Signature is invalid!',
                        verified ? 'success' : 'error');
                }
                break;

            case 'signup':
                const signupEmail = prompt('Enter email:');
                const signupPassword = prompt('Enter password:');
                if (!signupEmail || !signupPassword) {
                    alert('Email and password are required!');
                    return;
                }
                result = await makeApiRequest('signup', { email: signupEmail, password: signupPassword });
                if (result.error) {
                    displayResult('Signup Error:', result.error, 'error');
                } else {
                    displayResult('Signup Success:', 
                        `User registered!\nEmail: ${result.email}\nStored hash: ${result.password}`,
                        'success');
                }
                break;

            case 'login':
                const loginEmail = prompt('Enter email:');
                const loginPassword = prompt('Enter password:');
                if (!loginEmail || !loginPassword) {
                    alert('Email and password are required!');
                    return;
                }
                result = await makeApiRequest('login', { email: loginEmail, password: loginPassword });
                if (result.error) {
                    displayResult('Login Error:', result.error, 'error');
                } else {
                    displayResult('Login Result:', result.message, 
                        result.message.includes('success') ? 'success' : 'error');
                }
                break;

            default:
                alert('Unknown operation');
        }
    } catch (error) {
        if (error.message !== 'No input message') {
            displayResult('Error:', error.message, 'error');
        }
    }
}

// Perform chain operations
async function performChain(chainType) {
    try {
        const message = getInputMessage();
        clearResults();
        
        switch (chainType) {
            case 'hash-hmac-encrypt-sign':
                // Step 1: Hash
                displayResult('Chain Step 1: SHA-256 Hash', 'Processing...', 'normal');
                let result1 = await makeApiRequest('hash', { message });
                displayResult('Chain Step 1: SHA-256 Hash', result1.hash);
                
                // Step 2: HMAC
                displayResult('Chain Step 2: HMAC', 'Processing...', 'normal');
                let result2 = await makeApiRequest('hmac', { message: result1.hash, secretKey: 'chain-key' });
                displayResult('Chain Step 2: HMAC', result2.hmac);
                
                // Step 3: Symmetric Encrypt
                displayResult('Chain Step 3: Symmetric Encrypt', 'Processing...', 'normal');
                let result3 = await makeApiRequest('symmetricEncrypt', { message: result2.hmac });
                displayResult('Chain Step 3: Symmetric Encrypt', result3.encrypted);
                
                // Step 4: Sign
                displayResult('Chain Step 4: Digital Signature', 'Processing...', 'normal');
                let result4 = await makeApiRequest('sign', { message: result3.encrypted });
                displayResult('Chain Step 4: Digital Signature', result4.signature);
                
                displayResult('🎉 Chain Complete:', 'All operations completed successfully!', 'success');
                break;

            case 'hash-symmetric':
                // Step 1: Hash
                displayResult('Chain Step 1: SHA-256 Hash', 'Processing...', 'normal');
                let hashResult = await makeApiRequest('hash', { message });
                displayResult('Chain Step 1: SHA-256 Hash', hashResult.hash);
                
                // Step 2: Symmetric Encrypt
                displayResult('Chain Step 2: Symmetric Encrypt', 'Processing...', 'normal');
                let encryptResult = await makeApiRequest('symmetricEncrypt', { message: hashResult.hash });
                storedKeys.symmetricKey = encryptResult.key;
                storedKeys.symmetricIv = encryptResult.iv;
                storedKeys.encryptedData = encryptResult.encrypted;
                displayResult('Chain Step 2: Symmetric Encrypt', 
                    `Encrypted: ${encryptResult.encrypted}\nKey: ${encryptResult.key}\nIV: ${encryptResult.iv}`);
                
                displayResult('🎉 Chain Complete:', 'All operations completed successfully!', 'success');
                break;

            case 'sign-asymmetric':
                // Step 1: Sign
                displayResult('Chain Step 1: Digital Signature', 'Processing...', 'normal');
                let signResult = await makeApiRequest('sign', { message });
                storedKeys.signature = signResult.signature;
                displayResult('Chain Step 1: Digital Signature', signResult.signature);
                
                // Step 2: Asymmetric Encrypt
                displayResult('Chain Step 2: Asymmetric Encrypt', 'Processing...', 'normal');
                let asymmetricResult = await makeApiRequest('asymmetricEncrypt', { message: signResult.signature });
                storedKeys.asymmetricEncrypted = asymmetricResult.encrypted;
                displayResult('Chain Step 2: Asymmetric Encrypt', asymmetricResult.encrypted);
                
                displayResult('🎉 Chain Complete:', 'All operations completed successfully!', 'success');
                break;

            default:
                alert('Unknown chain operation');
        }
    } catch (error) {
        if (error.message !== 'No input message') {
            displayResult('Chain Error:', error.message, 'error');
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Cryptography Interactive Tools loaded');
});
