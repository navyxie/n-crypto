var crypto = require('crypto');
function encrypt(plaintext,key,algorithm,iv,encode,digest){
	var encData = '';
	try{
		algorithm = algorithm || "des-ede3";
		iv = iv || '';
		encode = encode || 'utf8';
		digest = digest || 'base64';
		var cipher = crypto.createCipheriv(algorithm, key, iv);
		cipher.setAutoPadding(true);
		encData = cipher.update(plaintext,encode,digest);
		encData += cipher.final(digest);
	}catch(e){
		console.error('des encrypt data error : ',e);
	}
	return encData;
}
function decrypt(ciphertext,key,algorithm,iv,decode,digest){
	var rawdata = '';
	try{
		algorithm = algorithm || "des-ede3";
		iv = iv || '';
		decode = decode || 'hex';
		digest = digest || 'utf8';
		ciphertext = new Buffer(ciphertext,'base64');
		var decipher = crypto.createDecipheriv(algorithm, key, iv);
		rawdata = decipher.update(ciphertext,decode,digest);
		rawdata += decipher.final(digest);
	}catch(e){
		console.error('des decrypt data error : ',e);
	}
	return rawdata;
}
module.exports = {
	encrypt:encrypt,
	decrypt:decrypt,
}