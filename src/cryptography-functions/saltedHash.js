const { scryptSync, randomBytes, timingSafeEqual } = require('crypto');

function saltedHash(password) {
    const salt = randomBytes(16).toString('hex');
    const saltedHashPassword = scryptSync(password, salt, 64).toString('hex');
    return { salt: salt, saltedHashPassword: saltedHashPassword };
}

// BELOW USAGE EXAMPLE:
const DATABASE_USERS = Array();

function signup(email, password) {
    const { salt, saltedHashPassword } = saltedHash(password);

    // simulated database storage operation: how the data could be saved in the database
    // salt has to be stored with the hashedPassword, separated by :
    const user = { email: email, password: `${salt}:${saltedHashPassword}`}
    DATABASE_USERS.push(user);

    return user
}

function login(email, password) {
    // simulated database fetch
    const user = DATABASE_USERS.find(user => user.email === email)

    // salt could be fetched from DB, used to hash inputed password, and compare if both passwords are equal.
    const [salt, stored_saltedHashPassword] = user.password.split(':');
    const inputted_saltedHashBufferedPassword = scryptSync(password, salt, 64);

    // Preventing timing attacks
    const stored_saltedHashBufferedPassword = Buffer.from(stored_saltedHashPassword, 'hex');
    const match = timingSafeEqual(inputted_saltedHashBufferedPassword, stored_saltedHashBufferedPassword);
    
    if (match) {
        return 'login success!'
    } else {
        return 'login fail!'
    }
}

