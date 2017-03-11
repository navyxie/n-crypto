# 签名与验签&加密与解密
    算法说明：签名算法MD5和RSA(RSA-SHA1)，数据加密算法RSA(RSA_NO_PADDING,node > 0.10.0 && < 6.0.0),AES(aes-128-ecb),DES(des-ede3)，返回base64格式数据。
[![Build Status via Travis CI](https://travis-ci.org/navyxie/n-crypto.svg?branch=master)](https://travis-ci.org/navyxie/n-crypto) [![Coverage Status](https://coveralls.io/repos/github/navyxie/n-crypto/badge.svg?branch=master)](https://coveralls.io/github/navyxie/n-crypto?branch=master)


****

## 安装
    npm install n-crypto
## 初始化

```js
    var NCRYPTO = require('n-crypto');
    var nCrypto = new NCRYPTO({
		md5_key:'',//md5 key
		des_key:des_key:'',//des key,24个字符长度
		aes_key:aes_key:'',//aes key,16个字符长度
		merchant_pri_key:'',//rsa pri key
		npay_pub_key:'',//rsa pub  key
	})
```

## API

[`sign`](#sign)

[`verify`](#verify)

[`encrypt`](#encrypt)

[`decrypt`](#decrypt)


### 生成签名的API:sign

<a name="sign" />

```js
var encryptJson = {
	name:"navy",
	version:"1.0",
	country:"中国",
	age:201509110233
}
var sign_type = 'MD5'
var signVal = nCrypto.sign(encryptJson,sign_type);
console.log(signVal);//加密后返回的加密串
```

### 验证签名API:verify

<a name="verify" />

```js
var encryptJson = {
	name:"navy",
	version:"1.0",
	country:"中国",
	age:201509110233
}
var sign_type = 'MD5';
var md5Sign = 'a12b2084d8c7297a25fcfe452af8257c';
var verifyResult =  nCrypto.verify(encryptJson,md5Sign,sign_type);
console.log(verifyResult);//boolean值，true表示验签成功，false表示验签失败
```

### 加密数据的API:encrypt

<a name="encrypt" />

```js
var encryptJson = {
	name:"navy",
	version:"1.0",
	country:"中国",
	age:201509110233
}
var sign_type = 'AES'；//RSA(node>=0.12),AES,DES
var encryptData = nCrypto.encrypt(encryptJson,sign_type);//base64
console.log(encryptData);//加密后返回的base64加密串
```

### 解密数据的API:decrypt

<a name="decrypt" />

```js
var encryptJson = {
	name:"navy",
	version:"1.0",
	country:"中国",
	age:201509110233
}
var sign_type = 'AES'；//RSA(node>=0.12),AES,DES
var decryptData = nCrypto.decrypt(encryptJson,sign_type);//原始字符串
console.log(decryptData);//加密后返回的base64加密串
```

