var n_crypto = require('./n_crypto');
var util = require('./util');
var CONST = require('../data/const');
var utf8 = require('utf8');
function NCrypto(config){
	// config = {
	// 	md5_key:'',
	//  des_key:'',
	//  aes_key:'',
	// 	merchant_pri_key:'',
	// 	npay_pub_key:''
	// }
	if(!util.isObject(config)){
		throw new Error('config must be object');
	}
	if(util.isString(config.des_key) && !util.checkKeyLen(config.des_key,24)){
		throw new Error('des_key must be 24 Character');
	}
	if(util.isString(config.aes_key) && !util.checkKeyLen(config.aes_key,16)){
		throw new Error('aes_key must be 16 Character');
	}
	this.config = config;
}
/**
##创建签名
@param plaintext:明文,plaintext对象或者字符串
@param sign_type:明文加密的方式,RSA,MD5
*/
NCrypto.prototype.sign = function(plaintext,sign_type){
	var encryptStr = util.getStr(plaintext);
	if(!encryptStr){
		return '';
	}
	var sign_type = util.getSignType(sign_type);
	var encryptKey = this._getKeyBySigntype(sign_type,true);
	if(!encryptKey){
		return '';
	}
	return n_crypto.sign(utf8.encode(encryptStr),sign_type,encryptKey);
}
/**
##验证签名
@param plaintext:明文,plaintext对象或者字符串
@param sign_type:明文加密的方式,RSA,MD5,AES,DES
@param sign_value:明文加密后的值
*/
NCrypto.prototype.verify = function(plaintext,sign_value,sign_type){
	var verifyFnName = 'verify';
	if(!sign_value){
		return false;
	}
	var decryptStr = util.getStr(plaintext);
	if(!decryptStr){
		return false;
	}
	var sign_type = util.getSignType(sign_type);
	if(sign_type !== CONST.sign_type.MD5 && sign_type !== CONST.sign_type.RSA){
		console.warn(sign_type+':验证签名,sign_type只能为MD5或者RSA。');
		return false;
	}	
	var decryptKey = this._getKeyBySigntype(sign_type);
	if(!decryptKey){
		return false;
	}	
	return n_crypto.verify(utf8.encode(decryptStr),sign_value,sign_type,decryptKey);
}
/**
## 加密数据
@param plaintext:明文,plaintext对象或者字符串
@param sign_type:明文加密的方式,RSA,AES,DES(RSA需要node的版本>=0.12)
*/
NCrypto.prototype.encrypt = function(plaintext,sign_type){
	var encryptStr = util.getStr(plaintext);
	if(!encryptStr){
		return '';
	}
	var sign_type = util.getSignType(sign_type);
	var encryptKey = this._getKeyBySigntype(sign_type);
	if(!encryptKey){
		return '';
	}
	return n_crypto.encrypt(utf8.encode(encryptStr),sign_type,encryptKey);
}
/**
@param ciphertext:密文
@param sign_type:明文加密的方式,RSA , DES or AES
@param json:是否返回json格式的数据(对于以key1=value1&key2=value2拼接的字符串会返回{key1:value1,key2:value2}的json对象,值为数字会被转化为字符串)
*/
NCrypto.prototype.decrypt = function(ciphertext,sign_type,json){
	//解密DES加密后的数据
	if(!util.isString(ciphertext)){
		return '';
	}
	var sign_type = sign_type || CONST.sign_type.DES;
	var decryptKey = this._getKeyBySigntype(sign_type,true);
	if(!decryptKey){
		return '';
	}
	var returnStr = n_crypto.decrypt(ciphertext,sign_type,decryptKey);
	try{
		returnStr = utf8.decode(returnStr);
		if(json){
			return util.searchToJson(returnStr);
		}
		return returnStr;
	}catch(e){
		return returnStr;
	}
}
/**
## 根据签名方式返回签名的秘钥
@param sign_type:明文加密的方式,RSA,MD5,DES or AES
@param rsa_sign:是否为rsa签名方式的签名
*/
NCrypto.prototype._getKeyBySigntype = function(sign_type,rsa_sign){
	rsa_sign = rsa_sign ? true :false;
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
			if(rsa_sign){
				//签名，用私钥
				keyVal = config.merchant_pri_key;
			}else{
				//加密数据用公钥
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