var n_crypto = require('./n_crypto');
var util = require('./util');
function NCrypto(config){
	// config = {
	// 	md5_key:'',
	// 	merchant_pri_key:'',
	// 	npay_pub_key:''
	// }
	this.config = config;
}
NCrypto.prototype.encrypt = function(json,sign_type){
	var encryptStr = '';
	if(util.isObject(json)){
		encryptStr = util.encryptStr(json);
	}else if(util.isString(json)){
		encryptStr = json;
	}else{
		return '';
	}
	var sign_type = sign_type || 'MD5';
	var encryptKey = this._getKeyBySigntype(sign_type,true);
	if(!encryptKey){
		return '';
	}
	return n_crypto.encrypt(encryptStr,sign_type,encryptKey);
}
NCrypto.prototype.verify = function(json,sign_value,sign_type){
	if(!sign_value){
		return false;
	}
	var decryptStr = '';
	if(util.isObject(json)){
		decryptStr = util.encryptStr(json);
	}else if(util.isString(json)){
		decryptStr = json;
	}else{
		return false;
	}
	var sign_type = sign_type || 'MD5';	
	var decryptKey = this._getKeyBySigntype(sign_type);
	if(!decryptKey){
		return false;
	}
	return n_crypto.verify(decryptStr,sign_value,sign_type,decryptKey);
}
NCrypto.prototype._getKeyBySigntype = function(sign_type,encrypt){
	encrypt = encrypt ? true :false;
	var config = this.config;
	var keyVal;
	switch(sign_type){
		case 'MD5':
			keyVal = config.md5_key;
			break;
		case 'RSA':
			if(encrypt){
				keyVal = config.merchant_pri_key;
			}else{
				keyVal = config.npay_pub_key;
			}
			break;
		default:		
	}
	return keyVal;
}
module.exports = NCrypto;