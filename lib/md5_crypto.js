var crypto = require('crypto');
/**生成md5签名
 * @param string str
 * @param string encode
 * @param string decode
 * @return string
 */
function sign(plaintext,encode,decode){
	encode = encode || 'utf8';
	decode = decode || 'hex';
	var hmac = crypto.createHash('md5');
	hmac.update(plaintext,encode);
	return hmac.digest(decode);
}
/**
 * 验证签名
 * @param string str 需要签名的字符串
 * @param string signValue 签名结果
 * @param string encode
 * @param string decode  
 * return boolean 签名结果
 */
function verify(plaintext,signValue,encode,decode){
	return signValue === sign(plaintext,encode,decode);
}
module.exports = {
	sign:sign,
	verify:verify
}