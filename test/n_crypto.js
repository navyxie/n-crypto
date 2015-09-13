var n_crypto = require('../lib/n_crypto');
var should = require('should');
var utf8 = require('utf8');
var CONST = require('../data/const');
//#sign_ype
var MD5 = CONST.sign_type.MD5;
var RSA = CONST.sign_type.RSA;
var DES = CONST.sign_type.DES;
var AES = CONST.sign_type.AES;
//#md5
var md5_key = CONST.index_md5_key;
var md5_encryptStr = CONST.index_encryptStr;
var md5_Md5Sign = CONST.index_encryptJson_md5Sign;
//#rsa
var merchant_pri_key = CONST.merchant_pri_key;
var merchant_pub_key = CONST.merchant_pub_key;
var npay_pub_key = CONST.npay_pub_key;
var rsaSign = CONST.index_encryptJson_rsaSign;
var rsa_encryptStr = CONST.index_encryptStr;
var strRsasign = CONST.index_encryptStr_rsaSign;
//#des
var des_key = CONST.des_key;
var encryptStr = CONST.des_encryptStr;
var encryptData = CONST.des_encryptData;
var encryptStr2 = CONST.des_encryptStr2;
var encryptData2 = CONST.des_encryptData2;
//#aes
var aes_key = CONST.aes_key;
var aes_encryptStr = CONST.des_encryptStr;
var aes_encryptData = CONST.aes_encryptData;
//#test data
var encryptJson = CONST.index_encryptJson;

describe('n_crypto',function(){
	describe('MD5',function(){
		describe('#encrypt()',function(){
			it('md5 it should be ok',function(){
				n_crypto.encrypt(md5_encryptStr,MD5,md5_key).should.be.equal(md5_Md5Sign);
			});
		});
		describe('#md5Verify()',function(){
			it('md5 it should be ok',function(){
				n_crypto.verify(md5_encryptStr,md5_Md5Sign,MD5,md5_key).should.be.equal(true);
			});
			it('md5 it should be not ok',function(){
				n_crypto.verify(encryptStr,md5_Md5Sign+'error',MD5,md5_key).should.be.equal(false);
			});
			it('md5 it should be not ok',function(){
				n_crypto.verify(encryptStr+'error',md5_Md5Sign,MD5,md5_key).should.be.equal(false);
			});
		});
	});
	describe('RSA',function(){
		describe('#encrypt()',function(){
			it('rsa it should be ok',function(){
				n_crypto.encrypt(rsa_encryptStr,RSA,merchant_pri_key).should.be.equal(strRsasign);
			});
		});
		describe('#rsaVerify()',function(){
			it('rsa it should be ok',function(){
				n_crypto.verify(rsa_encryptStr,strRsasign,RSA,merchant_pub_key).should.be.equal(true);
			});
		});
	});
	describe('DES',function(){
		describe('#encrypt()',function(){
			it('des should be ok',function(){
				n_crypto.encrypt(encryptStr,DES,des_key).should.be.equal(encryptData);
			});		
		});	
		describe('#decrypt()',function(){
			it('des should be ok',function(){
				utf8.decode(n_crypto.decrypt(encryptData,DES,des_key)).should.be.equal(encryptStr);
			});		
		});
		describe('#desVerify()',function(){
			it('des should be ok',function(){
				n_crypto.desVerify(encryptData,CONST.des_md5_sign,MD5,md5_key,des_key).should.be.equal(true);
			});		
		});
	});
	describe('AES',function(){
		describe('#encrypt()',function(){
			it('des should be ok',function(){
				n_crypto.encrypt(aes_encryptStr,AES,aes_key).should.be.equal(aes_encryptData);
			});		
		});	
		describe('#decrypt()',function(){
			it('des should be ok',function(){
				utf8.decode(n_crypto.decrypt(aes_encryptData,AES,aes_key)).should.be.equal(aes_encryptStr);
			});		
		});
		describe('#desVerify()',function(){
			it('des should be ok',function(){
				n_crypto.aesVerify(aes_encryptData,CONST.aes_md5_sign,MD5,md5_key,aes_key).should.be.equal(true);
			});		
		});
	});
});