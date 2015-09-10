var rsa_crypto = require('../lib/rsa_crypto');
var md5_key = 'navy_test_201509110233';
var encryptStr = 'navy_encryptStr_201509110233_伟大的中国';
var md5Sign = '532885a7bb2beb8de68a3a4b3f5edf57';
var should = require('should');
describe('rsa_crypto',function(){
	describe('#rsaSign()',function(){
		//todo
		// it('it should be ok',function(){
		// 	rsa_crypto.rsaSign(encryptStr).should.be.equal(md5Sign);
		// });
	});
	describe('#rsaVerify()',function(){
		//todo
		// it('it should be ok',function(){
		// 	rsa_crypto.rsaVerify(encryptStr,md5Sign).should.be.equal(true);
		// });
		// it('it should be not ok',function(){
		// 	rsa_crypto.rsaVerify(encryptStr,md5Sign+'error').should.be.equal(false);
		// });
		// it('it should be not ok',function(){
		// 	rsa_crypto.rsaVerify(encryptStr+'error',md5Sign).should.be.equal(false);
		// });
	});
});