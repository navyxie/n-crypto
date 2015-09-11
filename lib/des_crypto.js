var crypto = require('crypto');
var md5_crypto = require('./md5_crypto');
function encrypt(data,key,algorithm,iv,encode,digest){
	var encData = '';
	try{
		algorithm = algorithm || "des-ede3";
		iv = iv || '';
		encode = encode || 'utf8';
		digest = digest || 'base64'
		key = new Buffer(key,'base64');
		var cipher = crypto.createCipheriv(algorithm, key, iv);
		cipher.setAutoPadding(true);
		encData = cipher.update(data,encode,digest);
		encData += cipher.final(digest);
	}catch(e){
		console.error('des encrypt data error : ',e);
	}
	return encData;
}
function decrypt(data,key,algorithm,iv,decode,digest){
	var rawdata = '';
	try{
		algorithm = algorithm || "des-ede3";
		iv = iv || '';
		decode = decode || 'hex';
		digest = digest || 'utf8'
		key = new Buffer(key,'base64');
		data = new Buffer(data,'base64');
		var decipher = crypto.createDecipheriv(algorithm, key, iv);
		rawdata = decipher.update(data,decode,digest);
		rawdata += decipher.final(digest);
	}catch(e){
		console.error('des decrypt data error : ',e);
	}
	return rawdata;
}
function verify(ciphertext,md5Sign,sign_key){
	var rawdata = decrypt(ciphertext,sign_key);
	return md5Sign === md5_crypto.md5Sign(rawdata);
}
module.exports = {
	encrypt:encrypt,
	decrypt:decrypt,
	verify:verify
}