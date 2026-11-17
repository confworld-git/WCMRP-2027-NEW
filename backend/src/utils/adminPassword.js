import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";

const KEY_LENGTH = 64;
const SCRYPT_OPTIONS = { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };

const deriveKey = (password, salt) =>
  new Promise((resolve, reject) => {
    scrypt(password, salt, KEY_LENGTH, SCRYPT_OPTIONS, (error, key) => {
      if (error) {
        reject(error);
      } else {
        resolve(key);
      }
    });
  });

export const hashAdminPassword = async (password) => {
  const salt = randomBytes(16);
  const key = await deriveKey(password, salt);
  return `scrypt$${salt.toString("base64")}$${key.toString("base64")}`;
};

export const verifyAdminPassword = async (password, passwordHash) => {
  if (typeof passwordHash !== "string") {
    return false;
  }

  const [algorithm, saltText, keyText, extra] = passwordHash.split("$");
  if (algorithm !== "scrypt" || !saltText || !keyText || extra !== undefined) {
    return false;
  }

  const salt = Buffer.from(saltText, "base64");
  const expectedKey = Buffer.from(keyText, "base64");
  if (salt.length !== 16 || expectedKey.length !== KEY_LENGTH) {
    return false;
  }

  const actualKey = await deriveKey(password, salt);
  return timingSafeEqual(actualKey, expectedKey);
};
