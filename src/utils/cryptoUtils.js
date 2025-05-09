import CryptoJS from "crypto-js";

// 환경 변수로부터 AES 키와 IV 가져오기
const AES_KEY = process.env.REACT_APP_AES_KEY;
const AES_IV = process.env.REACT_APP_AES_IV;

export const encryptPassword = (password) => {
    const key = CryptoJS.enc.Utf8.parse(AES_KEY);
    const iv = CryptoJS.enc.Utf8.parse(AES_IV);

    const encrypted = CryptoJS.AES.encrypt(password, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.toString();
};
