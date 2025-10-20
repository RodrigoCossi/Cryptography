const { scryptSync, randomBytes, timingSafeEqual } = require('crypto');

function saltedHash(password) {
    const salt = randomBytes(16).toString('hex');
    const saltedHashPassword = scryptSync(password, salt, 64).toString('hex');
    
    const metadata = {
        kdf: 'scrypt',
        kdfParams: null,
        algorithm: 'scrypt with Salt',
        hashFunction: null,
        saltHex: salt,
        saltLengthBits: 128,
        outputLengthBits: 512,
        purpose: 'Password hashing for authentication'
    };
    
    return { 
        salt: salt, 
        saltedHashPassword: saltedHashPassword,
        metadata: metadata
    };
}

// BELOW USAGE EXAMPLE:
const DATABASE_USERS = Array();

function signup(email, password) {
    const { salt, saltedHashPassword, metadata } = saltedHash(password);

    // simulated database storage operation: how the data could be saved in the database
    // salt has to be stored with the hashedPassword, separated by :
    const user = { email: email, password: `${salt}:${saltedHashPassword}`, metadata: metadata}
    DATABASE_USERS.push(user);

    return user
}

function login(email, password) {
    // simulated database fetch
    const user = DATABASE_USERS.find(user => user.email === email)
    
    if (!user) {
        return {
            message: 'User not found!',
            success: false,
            metadata: {
                kdf: 'scrypt',
                kdfParams: null,
                algorithm: 'scrypt with Salt',
                hashFunction: null,
                saltHex: null,
                saltLengthBits: 128,
                outputLengthBits: 512,
                purpose: 'Password hashing for authentication'
            }
        }
    }

    // salt could be fetched from DB, used to hash inputed password, and compare if both passwords are equal.
    const [salt, stored_saltedHashPassword] = user.password.split(':');
    const inputted_saltedHashBufferedPassword = scryptSync(password, salt, 64);

    // Preventing timing attacks
    const stored_saltedHashBufferedPassword = Buffer.from(stored_saltedHashPassword, 'hex');
    const match = timingSafeEqual(inputted_saltedHashBufferedPassword, stored_saltedHashBufferedPassword);
    
    const metadata = {
        kdf: 'scrypt',
        kdfParams: null,
        algorithm: 'scrypt with Salt',
        hashFunction: null,
        saltHex: salt,
        saltLengthBits: 128,
        outputLengthBits: 512,
        purpose: 'Password hashing for authentication'
    };
    
    if (match) {
        return {
            message: 'login success!',
            success: true,
            metadata: metadata
        }
    } else {
        return {
            message: 'login fail!',
            success: false,
            metadata: metadata
        }
    }
}

module.exports = { saltedHash, signup, login, DATABASE_USERS };

