import { isArray, isNull, isUndefined } from 'lodash';
import { AesEncryption } from './cipher';

const aes = new AesEncryption();

/**
 *
 * @description 解密:反序列化字符串参数
 */
export function parseQuery(query) {
  const res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) return res;

  query = aes.decryptByAES(query);

  query.split('&').forEach((param) => {
    const parts = param.replace(/\+/g, ' ').split('=');
    const key = parts.shift();
    const val = parts.length > 0 ? parts.join('=') : null;

    if (!isUndefined(key)) {
      if (isUndefined(res[key])) {
        res[key] = val;
      } else if (isArray(res[key])) {
        res[key].push(val);
      } else {
        res[key] = [res[key], val];
      }
    }
  });

  return res;
}

/**
 *
 * @description 解密:反序列化字符串参数
 */
export function stringifyQuery(obj) {
  if (!obj) return '';

  const result = Object.keys(obj)
    .map((key) => {
      const value = obj[key];

      if (isUndefined(value)) return '';

      if (isNull(value)) return key;

      if (isArray(value)) {
        const resArray = [];

        value.forEach((item) => {
          if (isUndefined(item)) return;

          if (isNull(item)) {
            resArray.push(key);
          } else {
            resArray.push(key + '=' + item);
          }
        });
        return resArray.join('&');
      }

      return `${key}=${value}`;
    })
    .filter((x) => x.length > 0)
    .join('&');

  return result ? `?${aes.encryptByAES(result)}` : '';
}
