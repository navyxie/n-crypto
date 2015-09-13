var crypto = require('crypto');
function encrypt(data,key,algorithm,iv,encode,digest){
	var encData = '';
	try{
		algorithm = algorithm || "aes-128-ecb";
		iv = iv || '';
		encode = encode || 'utf8';
		digest = digest || 'base64'
		key = new Buffer(key,'base64');
		var cipher = crypto.createCipheriv(algorithm, key, iv);
		cipher.setAutoPadding(true);
		encData = cipher.update(data,encode,digest);
		encData += cipher.final(digest);
	}catch(e){
		console.error('aes encrypt data error : ',e);
	}
	return encData;
}
function decrypt(data,key,algorithm,iv,decode,digest){
	var rawdata = '';
	try{
		algorithm = algorithm || "aes-128-ecb";
		iv = iv || '';
		decode = decode || 'hex';
		digest = digest || 'utf8'
		key = new Buffer(key,'base64');
		data = new Buffer(data,'base64');
		var decipher = crypto.createDecipheriv(algorithm, key, iv);
		rawdata = decipher.update(data,decode,digest);
		rawdata += decipher.final(digest);
	}catch(e){
		console.error('aes decrypt data error : ',e);
	}
	return rawdata;
}
module.exports = {
	encrypt:encrypt,
	decrypt:decrypt,
}