/**
 * Generates a SHA-256 hash of the input.
 * @param {string} input - The input string to be hashed.
 * @returns {string} The SHA-256 hash of the input.
 * @example
 * const hashedPassword = hash('myPassword123');
 * console.log(hashedPassword); // Output: 'c08b4bc6a5a56e22fe3beef3ef09a4ba04b68281b030d5e1a36f8b2e0e695c22'
 */
const { createHash } = require('crypto');

function hash(input) {
    const updatedHashObject =createHash('sha256').update(input);
    console.log(updatedHashObject)

    const hashedString = createHash('sha256').update(input).digest('hex');
    console.log(hashedString)

    return hashedString;
}
