var n_crypto = require('./n_crypto');
var util = require('./util');
var CONST = require('../data/const');
var utf8 = require('utf8');
function NCrypto(config){
	// config = {
	// 	md5_key:'',
	//  des_key:'',
	// 	merchant_pri_key:'',
	// 	npay_pub_key:''
	// }
	this.config = config;
}
/**
@param plaintext:明文,plaintext对象或者字符串
@param sign_type:明文加密的方式,RSA,MD5,AES,DES
*/
NCrypto.prototype.encrypt = function(plaintext,sign_type){
	var encryptStr = util.getStr(plaintext);
	if(!encryptStr){
		return '';
	}
	var sign_type = util.getSignType(sign_type);
	var encryptKey = this._getKeyBySigntype(sign_type,true);
	if(!encryptKey){
		return '';
	}
	return n_crypto.encrypt(encryptStr,sign_type,encryptKey);
}
/**
@param plaintext:明文,plaintext对象或者字符串
@param sign_type:明文加密的方式,RSA,MD5,AES,DES
@param sign_value:明文加密后的值
@param symmetric_signtype:是否是对称加密的验证,DES或则AES
*/
NCrypto.prototype.verify = function(plaintext,sign_value,sign_type,symmetric_signtype){
	var verifyFnName = 'verify';
	var symmetric_signtype_key = '';
	if(!sign_value){
		return false;
	}
	var decryptStr = util.getStr(plaintext);
	if(!decryptStr){
		return false;
	}
	var sign_type = util.getSignType(sign_type);
	if(sign_type === CONST.sign_type.DES){
		console.warn(sign_type+':解密,sign_type只能为MD5或者RSA，并且设置第4个参数为true。');
		return false;
	}	
	var decryptKey = this._getKeyBySigntype(sign_type);
	if(!decryptKey){
		return false;
	}
	//是对称加密(DES或则AES)的验证
	if(util.isString(symmetric_signtype)){
		symmetric_signtype = util.getSignType(symmetric_signtype);
		switch(symmetric_signtype){
			case CONST.sign_type.DES :
				verifyFnName = 'desVerify';
				symmetric_signtype_key = this._getKeyBySigntype(CONST.sign_type.DES);
				break;
			case CONST.sign_type.AES :
				verifyFnName = 'aesVerify';
				symmetric_signtype_key = this._getKeyBySigntype(CONST.sign_type.AES);
				break;
		}
		if(!symmetric_signtype_key){
			return false;
		}
	}	
	return n_crypto[verifyFnName](decryptStr,sign_value,sign_type,decryptKey,symmetric_signtype_key);
}
/**
@param ciphertext:密文
@param sign_type:明文加密的方式,DES or AES
@param json:是否返回json格式的数据(对于以key1=value1&key2=value2拼接的字符串会返回{key1:value1,key2:value2}的json对象,值为数字会被转化为字符串)
*/
NCrypto.prototype.decrypt = function(ciphertext,sign_type,json){
	//解密DES加密后的数据
	if(!util.isString(ciphertext)){
		return '';
	}
	var sign_type = sign_type || CONST.sign_type.DES;
	var decryptKey = this._getKeyBySigntype(sign_type);
	if(!decryptKey){
		return '';
	}
	var returnStr = utf8.decode(n_crypto.decrypt(ciphertext,sign_type,decryptKey));
	if(json){
		return util.searchToJson(returnStr);
	}
	return returnStr;
}
/**
## 根据签名方式返回签名的秘钥
@param sign_type:明文加密的方式,RSA,MD5,DES or AES
@param rsa_encrypt:是否为rsa签名方式的签名
*/
NCrypto.prototype._getKeyBySigntype = function(sign_type,rsa_encrypt){
	rsa_encrypt = rsa_encrypt ? true :false;
	var config = this.config;
	var keyVal;
	switch(sign_type){
		case CONST.sign_type.MD5:
			keyVal = config.md5_key;
			break;
		case CONST.sign_type.DES:
			keyVal = config.des_key;
			break;
		case CONST.sign_type.AES:
			keyVal = config.aes_key;
			break;
		case CONST.sign_type.RSA:
			if(rsa_encrypt){
				keyVal = config.merchant_pri_key;
			}else{
				keyVal = config.npay_pub_key;
			}
			break;
		default:		
	}
	if(!keyVal){
		console.error(sign_type+':缺少加密的key');
	}
	return keyVal;
}
module.exports = NCrypto;