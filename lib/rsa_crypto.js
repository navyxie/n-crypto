var crypto = require('crypto');
var util = require('./util');
/**RSA签名
 * data签名数据(需要先排序，然后拼接)
 * key商户私钥
 * 签名用商户私钥，必须是没有经过pkcs8转换的私钥
 * 最后的签名，需要用base64编码
 * return Sign签名
 */
function sign(valStr,merchantPrivateKey,algorithm){
	var str = '';
	try{
		algorithm = algorithm || "RSA-SHA1";
		var RSA = crypto.createSign(algorithm);
		var pem = util.getRSAPrivateKey(merchantPrivateKey);
		RSA.update(valStr);	
		str = RSA.sign(pem,'base64');
	}catch(e){
		console.error('rsaSign sign error : ',e);
	}	
	return str;
}
/**RSA验签
 * data待签名数据(需要先排序，然后拼接)
 * sign需要验签的签名,需要base64_decode解码
 * key银通公钥 
 * 验签用连连支付公钥
 * return 验签是否通过 bool值
 */
function verify(valStr,sign,nPayPublickKey,algorithm){
	var flag = false;
	try{
		algorithm = algorithm || "RSA-SHA1";
		var verifier = crypto.createVerify(algorithm);
		verifier.update(valStr);
		flag = verifier.verify(util.getRSAPublicKey(nPayPublickKey),sign,"base64");
	}catch(e){
		console.error('rsaSign verify error : ',e);
	}
	return flag;
}
/**
## RSA加密数据（node>0.12）
* @param:plaintext:明文
* @param:publickKey:公钥
* 最后的签名，需要用base64编码
* return base64 encrypt data
*/
function encrypt(plaintext,publickKey){
	var str = '';
	if(util.isFunction(crypto.publicEncrypt)){
		try{
			//no padding
			str = crypto.publicEncrypt({key: util.getRSAPublicKey(publickKey)}, new Buffer(plaintext));
			str = str.toString('base64');
		}catch(e){
			console.log('rsa encrypt error : ',e);
		}
	}else{
		console.error('rsa encrypt must need node version >= 0.12');
	}
	return str;
}
/**
## RSA解密数据（node>0.12）
* @param:ciphertext:明文，base64
* @param:publickKey:私钥
* return 原始明文
*/
function decrypt(ciphertext,privateKey){
	var str = '';
	if(util.isFunction(crypto.privateDecrypt)){
		try{
			str = crypto.privateDecrypt(util.getRSAPrivateKey(privateKey),new Buffer(ciphertext,'base64'));
			str = str.toString('utf8');
		}catch(e){
			console.error('rsa decrypt error : ',e);
		}
	}else{
		console.error('rsa decrypt must need node version >= 0.12');
	}
	return str;
}
module.exports = {
	sign:sign,
	verify:verify,
	encrypt:encrypt,
	decrypt:decrypt
}