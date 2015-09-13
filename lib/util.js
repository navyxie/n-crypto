var qs = require('querystring');
var CONST = require('../data/const');
/**
 * 对象按键排序
 * @param object obj
 * @param boolean desc
 * @return object
*/
function sortObjectByKey(obj,desc){
	var keys = Object.keys(obj);
	var returnObj = {};
	keys = keys.sort();
	if(desc){
		keys = keys.reverse();
	}
	for(var i = 0 , len = keys.length ; i < len ; i++){
		returnObj[keys[i]] = obj[keys[i]];
	}
	return returnObj;
}
/**
 * 将字符串转化为查询字符串
 * @param object json
 * @return str
*/
function jsonToSearch(json){
	var str = "";
	for(var key in json){
		if(json.hasOwnProperty(key)){
			str += key + '=' + stripslashes(json[key])+'&';
		}
	}
	//把最后的&去掉
	if(str){
		str = str.substring(0,str.length -1);
	}
	return str;
}
/**
*除去待签名参数数组中的空值和签名参数
*data json
*/
function paramFilter(para){
	var para_filter = new Object();
    for (var key in para){
        if(key == 'sign' || para[key] == ''){
            continue;
        }
        else{
            para_filter[key] = para[key];
        }
    }
    return para_filter;
}
/**
*如果存在转义字符，那么去掉转义
*str string
*/
function stripslashes(str){
	return str;
	if(typeof str !== "string"){
		return str;
	}
	return str.replace(/[\\"&}{\+]/g,"");
}
function extend(target,source){
	target = target || {};
	source = source || {};
	for(var key in source){
		if(source.hasOwnProperty(key)){
			target[key] = source[key];
		}
	}
	return target;
}
function toString(text){
	return text.toString();
}
function noop(){};
/**
*拾取对象指定的key
* obj object
* keyArr Arr
* return object
*/
function pick(obj,keyArr){
	if(!keyArr instanceof Array){
		keyArr = [keyArr];
	}
	var result = {};
	for(var i = 0 , len = keyArr.length ; i < len; i++){
		if(obj.hasOwnProperty(keyArr[i])){
			result[keyArr[i]] = obj[keyArr[i]];
		}
	}
	return result;
}
/**
 * 把对象所有元素，按照“参数=参数值”的模式用“&”字符拼接成字符串，并对字符串做urlencode编码
 * @param para 需要拼接的对象
 * return 拼接完成以后的字符串
 */
function createLinkstringUrlencode(para){
	return qs.stringify(para);
}
/**
 * 将连连支付返回的字符串转化为json
 * @param str string
 * return object
 */
function resStringToJSON(str){
	return eval('('+decodeURIComponent(str)+')');
}
function clone(json){
	var result = {};
	for(var key in json){
		result[key] = json[key];
	}
	return result;
}
function encryptStr(json){
	var cloneJson = clone(json);
	cloneJson = paramFilter(cloneJson);
	cloneJson = sortObjectByKey(cloneJson);
	return jsonToSearch(cloneJson);
}

function isFunction(fn){
	return isType(fn,'Function');
}
function isObject(obj){
	return isType(obj,'Object');
}
function isArray(arr){
	return isType(arr,'Array');
}
function isString(str){
	return isType(str,'String');
}
function isType(obj,type){
	return Object.prototype.toString.call(obj) === '[object '+type+']';
}
function getMD5KeyFill(md5key){
	return '&key='+md5key;
}
function checkKeyLen(key,len){
	if(!isString(key)){
		return false;
	}
	return key.length === len;
}

//rsa util

/**
@param string key
格式化rsa的私钥，64位长度为一行
@return string
*/
function formatRSAKey(key){
	var len = key.length;
	var privateLen = 64;//private key 64 length one line
	var space = Math.floor(len/privateLen);
	var flag = len%privateLen === 0 ? true : false;
	var str = "";
	for(var i = 0 ; i < space ; i++){
		str += key.substr(i*privateLen,privateLen) + '\r\n';
	}
	if(!flag){
		str += key.substring(space*privateLen) + '\r\n';
	}
	return str;
}
/**
@param string key rsa的私钥
返回标准格式的rsa的私钥
@return string
*/
function getRSAPrivateKey(key){
	return getRSAPrivateKeyPrefix() + formatRSAKey(key) + getRSAPrivateKeySuffix();
}
/**
获取rsa私钥的前缀
@return string
*/
function getRSAPrivateKeyPrefix(){
	return '-----BEGIN RSA PRIVATE KEY-----\r\n';
}
/**
获取rsa私钥的后缀
@return string
*/
function getRSAPrivateKeySuffix(){
	return '-----END RSA PRIVATE KEY-----';
}
/**
@param string key rsa的私钥
返回标准格式的rsa的公钥
@return string
*/
function getRSAPublicKey(key){
	return getRSAPublickKeyPrefix() + formatRSAKey(key) + getRSAPublicKeySuffix();
}
/**
获取rsa公钥的前缀
@return string
*/
function getRSAPublickKeyPrefix(){
	return '-----BEGIN PUBLIC KEY-----\r\n';
}
/**
获取rsa公钥的后缀
@return string
*/
function getRSAPublicKeySuffix(){
	return '-----END PUBLIC KEY-----';
}


//index util

function getStr(formatToStr){
	var str = '';
	if(isObject(formatToStr)){
		str = encryptStr(formatToStr);
	}else if(isString(formatToStr)){
		str = formatToStr;
	}
	return str;
}

function getSignType(sign_type){
	return (isString(sign_type) ? sign_type.toUpperCase(sign_type) : CONST.sign_type.MD5);
}

function searchToJson(searchStr){
	if(isObject(searchStr)){
		return searchStr;
	}
	if(!isString(searchStr)){
		return {};
	}
	var returnObj = {};
	var arr = searchStr.split('&');
	for(var i = 0 , len = arr.length ; i < len ; i++){
		var temp = arr[i].split('=');
		returnObj[temp[0]] = temp[1] || '';
	}
	return returnObj;
}

module.exports = {
	sortObjectByKey:sortObjectByKey,
	jsonToSearch:jsonToSearch,
	paramFilter:paramFilter,
	stripslashes:stripslashes,
	extend:extend,
	toString:toString,
	noop:noop,
	pick:pick,
	createLinkstringUrlencode:createLinkstringUrlencode,
	resStringToJSON:resStringToJSON,
	clone:clone,
	encryptStr:encryptStr,
	isFunction:isFunction,
	isObject:isObject,
	isArray:isArray,
	isString:isString,
	isType:isType,
	getMD5KeyFill:getMD5KeyFill,
	checkKeyLen:checkKeyLen,
	getRSAPrivateKey:getRSAPrivateKey,
	getRSAPublicKey:getRSAPublicKey,
	formatRSAKey:formatRSAKey,
	getRSAPrivateKeyPrefix:getRSAPrivateKeyPrefix,
	getRSAPrivateKeySuffix:getRSAPrivateKeySuffix,
	getRSAPublickKeyPrefix:getRSAPublickKeyPrefix,
	getRSAPublicKeySuffix:getRSAPublicKeySuffix,
	getStr:getStr,
	getSignType:getSignType,
	searchToJson:searchToJson
}