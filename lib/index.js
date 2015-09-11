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
NCrypto.prototype.encrypt = function(json,sign_type){
	var encryptStr = util.getStr(json);
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
NCrypto.prototype.verify = function(json,sign_value,sign_type,desFlag){
	var verifyFnName = 'verify';
	var des_key = '';
	if(!sign_value){
		return false;
	}
	var decryptStr = util.getStr(json);
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
	if(desFlag){
		verifyFnName = 'desVerify';
		des_key = this._getKeyBySigntype(CONST.sign_type.DES);
	}	
	return n_crypto[verifyFnName](decryptStr,sign_value,sign_type,decryptKey,des_key);
}
NCrypto.prototype.decrypt = function(encryptStr){
	//解密DES加密后的数据
	if(!util.isString(encryptStr)){
		return '';
	}
	var sign_type = CONST.sign_type.DES;
	var decryptKey = this._getKeyBySigntype(sign_type);
	if(!decryptKey){
		return '';
	}
	return utf8.decode(n_crypto.decrypt(encryptStr,sign_type,decryptKey));
}
NCrypto.prototype.decryptToJson = function(encryptStr){
	var str = this.decrypt(encryptStr);
	return util.searchToJson(str);
}
NCrypto.prototype._getKeyBySigntype = function(sign_type,encrypt){
	encrypt = encrypt ? true :false;
	var config = this.config;
	var keyVal;
	switch(sign_type){
		case CONST.sign_type.MD5:
			keyVal = config.md5_key;
			break;
		case CONST.sign_type.DES:
			keyVal = config.des_key;
			break;
		case CONST.sign_type.RSA:
			if(encrypt){
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