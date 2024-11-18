import CryptoJS from 'crypto-js';

// Encryption function
export function encryptReactdata(data, secretKey) {
    const encrypted = CryptoJS.AES.encrypt(data, secretKey).toString();
    return encrypted;
}

// Decryption function
export function decryptReactData(encryptedKey, secretKey) {
    const bytes = CryptoJS.AES.decrypt(encryptedKey, String(secretKey));

    let originalDecryptedText = bytes.toString(CryptoJS.enc.Utf8);
    const decrypted = JSON.parse(originalDecryptedText);

    if (typeof decrypted == "object") {
        return decrypted;
    } else {
        return originalDecryptedText;
    }
}
