# 加密与解密

## 安装
    npm install n-crypto
## 初始化
    var NCRYPTO = require('n-crypto');
    var nCrypto = new NCRYPTO({
		md5_key:'',//md5 key
		merchant_pri_key:'',//rsa pri key
		npay_pub_key:''//rsa pub  key
	})
## API

[`encrypt`](#encrypt)

[`verify`](#verify)


### 加密API

<a name="encrypt" />
```js
var encryptJson = {
	name:"navy",
	version:"1.0",
	country:"中国",
	age:201509110233
}
var sign_type = 'MD5'
var signVal = nCrypto.encrypt(encryptJson,sign_type);
console.log(signVal);//加密后返回的加密串
```

### 验证签名API

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
console.log(signVal);//加密后返回的加密串
```