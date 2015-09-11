var md5_crypto = require('../lib/md5_crypto');
var md5_key = '0123456789abcd0123456789';
var encryptStr = 'navy_encryptStr_201509110233_伟大的中国';
var md5Sign = '532885a7bb2beb8de68a3a4b3f5edf57';
var should = require('should');
describe('md5_crypto',function(){
	describe('#md5Sign()',function(){
		it('it should be ok',function(){
			md5_crypto.md5Sign(encryptStr).should.be.equal(md5Sign);
		});
	});
	describe('#md5Verify()',function(){
		it('it should be ok',function(){
			md5_crypto.md5Verify(encryptStr,md5Sign).should.be.equal(true);
		});
		it('it should be not ok',function(){
			md5_crypto.md5Verify(encryptStr,md5Sign+'error').should.be.equal(false);
		});
		it('it should be not ok',function(){
			md5_crypto.md5Verify(encryptStr+'error',md5Sign).should.be.equal(false);
		});
	});
});