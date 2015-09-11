var utf8 = require('utf8');//中文字符使用UTF-8编码
var md5_crypto = require('./md5_crypto');
var des_crypto = require('./des_crypto');
var rsa_crypto = require('./rsa_crypto');
var util = require('./util');
var CONST = require('../data/const');
function encrypt(encryptStr,sign_type,encryptKey){
	var returnStr = '';
	encryptStr = utf8.encode(encryptStr);
	switch(sign_type){
		case CONST.sign_type.MD5:
			returnStr = md5_crypto.md5Sign(encryptStr+util.getMD5KeyFill(encryptKey));
			break;
		case CONST.sign_type.DES:
			returnStr = des_crypto.encrypt(encryptStr,encryptKey);
			break;
		case CONST.sign_type.RSA:
			returnStr = rsa_crypto.rsaSign(encryptStr,encryptKey);
			break;
		default:		
	}
	return returnStr;
}
function verify(decryptStr,sign_value,sign_type,decryptKey){
	var returnBoolean = false;
	decryptStr = utf8.encode(decryptStr);
	switch(sign_type){
		case CONST.sign_type.MD5:
			returnBoolean = md5_crypto.md5Verify(decryptStr+util.getMD5KeyFill(decryptKey),sign_value);
			break;
		case CONST.sign_type.DES:
			returnBoolean = des_crypto.verify(decryptStr,sign_value,decryptKey);
			break;
		case CONST.sign_type.RSA:
			returnBoolean = rsa_crypto.rsaVerify(decryptStr,sign_value,decryptKey);
			break;
		default:		
	}
	return returnBoolean;
}
function decrypt(encryptStr,sign_type,decryptKey){
	var returnStr = '';
	switch(sign_type){
		case CONST.sign_type.DES:
			returnStr = des_crypto.decrypt(encryptStr,decryptKey);
			break;
		default:		
	}
	return returnStr;
}
function desVerify(decryptStr,sign_value,sign_type,decryptKey,des_key){
	var returnStr = decrypt(decryptStr,CONST.sign_type.DES,des_key);
	if(!returnStr){
		return false;
	}
	return verify(returnStr,sign_value,sign_type,decryptKey);
}
module.exports = {
	encrypt:encrypt,
	verify:verify,
	decrypt:decrypt,
	desVerify:desVerify
}