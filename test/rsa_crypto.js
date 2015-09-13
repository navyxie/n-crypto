var should = require('should');
var CONST = require('../data/const');
var rsa_crypto = require('../lib/rsa_crypto');
var merchant_pri_key = CONST.merchant_pri_key;
var merchant_pub_key = CONST.merchant_pub_key;
var npay_pri_key = CONST.npay_pri_key;
var npay_pub_key = CONST.npay_pub_key;
var merchant_encryptStr = CONST.merchant_encryptStr;
var merchant_encryptData = CONST.merchant_encryptData;
var nPay_encryptStr = CONST.nPay_encryptStr;
var nPay_encryptData = CONST.nPay_encryptData;
describe('rsa_crypto',function(){
	describe('#rsaSign()->merchant',function(){
		it('it should be ok',function(){
			rsa_crypto.rsaSign(merchant_encryptStr,merchant_pri_key).should.be.equal(merchant_encryptData);
		});
		it('it should be not ok',function(){
			rsa_crypto.rsaSign(merchant_encryptStr,merchant_pri_key+'abc').should.not.be.equal(merchant_encryptData);
		});
		it('it should be not ok',function(){
			rsa_crypto.rsaSign(merchant_encryptStr,merchant_pri_key+'=').should.not.be.equal(merchant_encryptData);
		});
	});
	describe('#rsaVerify()->merchant',function(){
		it('it should be ok',function(){
			rsa_crypto.rsaVerify(merchant_encryptStr,merchant_encryptData,merchant_pub_key).should.be.equal(true);
		});
		it('it should be not ok',function(){
			rsa_crypto.rsaVerify(merchant_encryptStr+'fail',merchant_encryptData,merchant_pub_key).should.be.equal(false);
		});
		it('it should be not ok',function(){
			rsa_crypto.rsaVerify(merchant_encryptStr,merchant_encryptData+'fail',merchant_pub_key).should.be.equal(false);
		});
	});
	describe('#rsaSign()->nPay',function(){
		it('it should be ok',function(){
			rsa_crypto.rsaSign(nPay_encryptStr,npay_pri_key).should.be.equal(nPay_encryptData);
		});
	});
	describe('#rsaVerify()->nPay',function(){
		it('it should be ok',function(){
			rsa_crypto.rsaVerify(nPay_encryptStr,nPay_encryptData,npay_pub_key).should.be.equal(true);
		});
	});
});