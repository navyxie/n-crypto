var should = require('should');
var index = require('../lib/index');
var util = require('../lib/util');
var CONST = require('../data/const');
//##sign_ype
var MD5 = CONST.sign_type.MD5;
var RSA = CONST.sign_type.RSA;
var DES = CONST.sign_type.DES;
var AES = CONST.sign_type.AES;
//##MD5
var md5_key = CONST.index_md5_key;
var md5Sign = CONST.index_encryptJson_md5Sign;
//##RSA
var merchant_pri_key = CONST.merchant_pri_key;
var merchant_pub_key = CONST.merchant_pub_key;
var npay_pub_key = CONST.npay_pub_key;
var rsaSign = CONST.index_encryptJson_rsaSign;
var strRsasign = CONST.index_encryptStr_rsaSign;
//DES
var des_key = CONST.des_key;
var encryptStr = CONST.des_encryptStr;
var encryptData = CONST.des_encryptData;
var encryptStr2 = CONST.des_encryptStr2;
var encryptData2 = CONST.des_encryptData2;
//#aes
var aes_key = CONST.aes_key;
var aes_encryptStr = CONST.des_encryptStr;
var aes_encryptData = CONST.aes_encryptData;
//##test data
var index_encryptStr = CONST.index_encryptStr;
var encryptJson = CONST.index_encryptJson;

var nCrypto = new index({
	md5_key:md5_key,
	des_key:des_key,
	aes_key:aes_key,
	merchant_pri_key:merchant_pri_key,
	npay_pub_key:npay_pub_key
});
describe('index',function(){
	describe('MD5',function(){
		describe('#encrypt()',function(){
			it('it should be ok',function(){
				var signVal = nCrypto.encrypt(encryptJson,MD5);
				signVal.should.be.equal(md5Sign);
			});
			it('it should be ok',function(){
				var signVal = nCrypto.encrypt(encryptJson,'md5');
				signVal.should.be.equal(md5Sign);
			});
			it('it should be ok',function(){
				var signVal = nCrypto.encrypt(encryptJson);
				signVal.should.be.equal(md5Sign);
			});
			it('it should be ok',function(){
				var signVal = nCrypto.encrypt(index_encryptStr,MD5);
				signVal.should.be.equal(md5Sign);
			});
		});
		describe('#verify()',function(){
			it('it should be ok',function(){
				nCrypto.verify(encryptJson,md5Sign,MD5).should.be.equal(true);
			});
			it('it should be not ok',function(){
				var cloneJson = util.clone(encryptJson);
				cloneJson.country = '伟大的中国';
				nCrypto.verify(cloneJson,md5Sign,MD5).should.be.equal(false);
			});
			it('it should be not ok',function(){
				nCrypto.verify(encryptJson,md5Sign+'error',MD5).should.be.equal(false);
			});
		});
	});
	describe('RSA',function(){
		describe('#encrypt()',function(){
			it('it should be ok',function(){
				var signVal = nCrypto.encrypt(encryptJson,RSA);
				signVal.should.be.equal(rsaSign);
			});
			it('it should be ok',function(){
				var signVal = nCrypto.encrypt(encryptJson,'rsa');
				signVal.should.be.equal(rsaSign);
			});
			it('it should be ok',function(){
				var signVal = nCrypto.encrypt(index_encryptStr,RSA);
				signVal.should.be.equal(strRsasign);
			});
		});
		describe('#verify()',function(){
			var RsanCrypto = new index({
				npay_pub_key:merchant_pub_key
			});
			it('it should be ok',function(){
				RsanCrypto.verify(encryptJson,rsaSign,RSA).should.be.equal(true);
			});
			it('it should be ok',function(){
				RsanCrypto.verify(index_encryptStr,strRsasign,RSA).should.be.equal(true);
			});
			it('it should be not ok',function(){
				var cloneJson = util.clone(encryptJson);
				cloneJson.country = '伟大的中国';
				RsanCrypto.verify(cloneJson,strRsasign,RSA).should.be.equal(false);
			});
			it('it should be not ok',function(){
				RsanCrypto.verify(index_encryptStr+'fail',strRsasign,RSA).should.be.equal(false);
			});
		});
	});
	describe('DES',function(){
		describe('#encrypt()',function(){
			it('it should be ok',function(){
				var signVal = nCrypto.encrypt(encryptStr,DES);
				signVal.should.be.equal(encryptData);
			});
			it('it should be ok',function(){
				var signVal = nCrypto.encrypt(encryptStr,'des');
				signVal.should.be.equal(encryptData);
			});
			it('it should be ok',function(){
				var signVal = nCrypto.encrypt(encryptStr2,DES);
				signVal.should.be.equal(encryptData2);
			});
			it('it should be ok',function(){
				var signVal = nCrypto.encrypt(encryptStr2,'des');
				signVal.should.be.equal(encryptData2);
			});
		});
		describe('#verify()',function(){
			it('it should be ok',function(){
				nCrypto.verify(encryptData,CONST.des_md5_sign,MD5,DES).should.be.equal(true);
			});
			it('it should be not ok',function(){
				nCrypto.verify(encryptData,CONST.des_md5_sign+'error',MD5,DES).should.be.equal(false);
			});
		});
		describe('#decrypt()',function(){
			it('it should be ok',function(){
				var signVal = nCrypto.decrypt(encryptData,DES);
				signVal.should.be.equal(encryptStr);
			});
			it('it should be ok',function(){
				var signVal = nCrypto.decrypt(encryptData2,DES);
				signVal.should.be.equal(encryptStr2);
			});
		});
		describe('#encrypt()->JSON',function(){
			it('it should be ok',function(){
				var signVal = nCrypto.encrypt(encryptJson,DES);
				signVal.should.be.equal(CONST.des_encrypt_json_str);
			});
		});
		describe('#decrypt()->JSON',function(){
			it('it should be ok',function(){
				var jsonData = nCrypto.decrypt(CONST.des_encrypt_json_str,DES,true);
				jsonData.name.should.be.equal(encryptJson.name)
			});
		});
	});
	describe('AES',function(){
		describe('#encrypt()',function(){
			it('it should be ok',function(){
				var signVal = nCrypto.encrypt(aes_encryptStr,AES);
				signVal.should.be.equal(aes_encryptData);
			});
		});
		describe('#verify()',function(){
			it('it should be ok',function(){
				nCrypto.verify(aes_encryptData,CONST.aes_md5_sign,MD5,AES).should.be.equal(true);
			});
			it('it should be not ok',function(){
				nCrypto.verify(aes_encryptData,CONST.aes_md5_sign+'error',MD5,AES).should.be.equal(false);
			});
		});
		describe('#verify()',function(){
			it('it should be not ok',function(){
				nCrypto.verify(aes_encryptData,CONST.aes_md5_sign+'error',MD5,RSA).should.be.equal(false);
			});
		});
		describe('#decrypt()',function(){
			it('it should be ok',function(){
				var signVal = nCrypto.decrypt(aes_encryptData,AES);
				signVal.should.be.equal(aes_encryptStr);
			});
		});
		describe('#encrypt()->JSON',function(){
			it('it should be ok',function(){
				var signVal = nCrypto.encrypt(encryptJson,AES);
				signVal.should.be.equal(CONST.aes_encrypt_json_str);
			});
		});
		describe('#decrypt()->JSON',function(){
			it('it should be ok',function(){
				var jsonData = nCrypto.decrypt(CONST.aes_encrypt_json_str,AES,true);
				jsonData.name.should.be.equal(encryptJson.name)
			});
		});
	});
});