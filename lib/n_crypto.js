var utf8 = require('utf8');//中文字符使用UTF-8编码
var md5_crypto = require('./md5_crypto');
var rsa_crypto = require('./rsa_crypto');
function _getMD5KeyFill(md5key){
	return '&key='+md5key;
}
function encrypt(encryptStr,sign_type,encryptKey){
	var returnStr = '';
	encryptStr = utf8.encode(encryptStr);
	switch(sign_type){
		case 'MD5':
			returnStr = md5_crypto.md5Sign(encryptStr+_getMD5KeyFill(encryptKey));
			break;
		case 'RSA':
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
		case 'MD5':
			returnBoolean = md5_crypto.md5Verify(decryptStr+_getMD5KeyFill(decryptKey),sign_value);
			break;
		case 'RSA':
			returnBoolean = rsa_crypto.rsaVerify(decryptStr,decryptKey);
			break;
		default:		
	}
	return returnBoolean;
}
module.exports = {
	encrypt:encrypt,
	verify:verify
}