var crypto = require('crypto');
/**生成md5签名
 * @param string str
 * @param string encode
 * @param string decode
 * @return string
 */
function md5Sign(str,encode,decode){
	encode = encode || 'utf8';
	decode = decode || 'hex';
	var hmac = crypto.createHash('md5');
	hmac.update(str,encode);
	return hmac.digest(decode);
}
/**
 * 验证签名
 * @param string str 需要签名的字符串
 * @param string sign 签名结果
 * @param string encode
 * @param string decode  
 * return boolean 签名结果
 */
function md5Verify(str,sign,encode,decode){
	return sign === md5Sign(str,encode,decode);
}
module.exports = {
	md5Sign:md5Sign,
	md5Verify:md5Verify
}