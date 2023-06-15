import { encrypt, decrypt } from 'crypto-js/aes';
import { parse } from 'crypto-js/enc-utf8';
import pkcs7 from 'crypto-js/pad-pkcs7';
import ECB from 'crypto-js/mode-ecb';
import UTF8 from 'crypto-js/enc-utf8';

// 注意 key 和 iv 至少都需要 16 位
const AES_KEY = '123456789qwertyuio';
const AES_IV = '0987654321poiuytrewq';

export class AesEncryption {
  constructor(key = AES_KEY, iv = AES_IV) {
    this.key = parse(key);
    this.iv = parse(iv);
  }

  get getOptions() {
    return {
      mode: ECB,
      padding: pkcs7,
      iv: this.iv,
    };
  }

  encryptByAES(text) {
    return encrypt(text, this.key, this.getOptions).toString();
  }

  decryptByAES(text) {
    return decrypt(text, this.key, this.getOptions).toString(UTF8);
  }
}
