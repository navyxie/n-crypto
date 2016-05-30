var md5_crypto = require('./md5_crypto');
var des_crypto = require('./des_crypto');
var aes_crypto = require('./aes_crypto');
var rsa_crypto = require('./rsa_crypto');
var util = require('./util');
var CONST = require('../data/const');
/**
@param plaintext:明文
@param sign_type:明文加密的签名方式
@param encryptKey:明文加密的签名方式的秘钥
*/
function sign(plaintext,sign_type,encryptKey){
        var returnStr = '';
        switch(sign_type){
                case CONST.sign_type.MD5:
                        returnStr = md5_crypto.sign(plaintext+util.getMD5KeyFill(encryptKey));
                        break;
                case CONST.sign_type.RSA:
                        returnStr = rsa_crypto.sign(plaintext,encryptKey);
                        break;
                default:                
        }
        return returnStr;
}
/**
@param plaintext:明文
@param sign_value:明文加密后的值
@param sign_type:明文加密的签名方式
@param decryptKey:明文加密的签名方式的秘钥
*/
function verify(plaintext,sign_value,sign_type,decryptKey){
        var returnBoolean = false;
        switch(sign_type){
                case CONST.sign_type.MD5:
                        returnBoolean = md5_crypto.verify(plaintext+util.getMD5KeyFill(decryptKey),sign_value);
                        break;
                case CONST.sign_type.RSA:
                        returnBoolean = rsa_crypto.verify(plaintext,sign_value,decryptKey);
                        break;
                default:                
        }
        return returnBoolean;
}
/**
@param plaintext:明文
@param sign_type:明文加密的签名方式
@param encryptKey:明文加密的签名方式的秘钥
*/
function encrypt(plaintext,sign_type,encryptKey){
        var returnStr = '';
        switch(sign_type){
                case CONST.sign_type.DES:
                        returnStr = des_crypto.encrypt(plaintext,encryptKey);
                        break;
                case CONST.sign_type.AES:
                        returnStr = aes_crypto.encrypt(plaintext,encryptKey);
                        break;
                case CONST.sign_type.RSA:
                        returnStr = rsa_crypto.encrypt(plaintext,encryptKey);
                        break;
                default:                
        }
        return returnStr;
}
/**
@param ciphertext:密文
@param sign_type:明文加密的方式
@param decryptKey:明文加密方式的秘钥
*/
function decrypt(ciphertext,sign_type,decryptKey){
        var returnStr = '';
        switch(sign_type){
                case CONST.sign_type.DES:
                        returnStr = des_crypto.decrypt(ciphertext,decryptKey);
                        break;
                case CONST.sign_type.AES:
                        returnStr = aes_crypto.decrypt(ciphertext,decryptKey);
                        break;
                case CONST.sign_type.RSA:
                        returnStr = rsa_crypto.decrypt(ciphertext,decryptKey);
                        break;
                default:                
        }
        return returnStr;
}
module.exports = {
        sign:sign,        
        verify:verify,
        encrypt:encrypt,
        decrypt:decrypt
}