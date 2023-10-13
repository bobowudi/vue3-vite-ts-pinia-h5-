
//@ts-ignore
import { JSEncrypt } from "encryptlong";
let publicKey = [];
let privateKey = [];

//加密
export const encrypt = (value: string) => {
  //加解密实例
  const rsa = new JSEncrypt();
  //公钥
  rsa.setPublicKey(publicKey.join(''));

  return rsa.encryptLong(value);
};

//解密
export const decrypt = (value: string) => {
  //加解密实例
  const rsa = new JSEncrypt();
  //公钥
  rsa.setPublicKey(privateKey.join(''));
  return rsa.decryptLong(value);
};
