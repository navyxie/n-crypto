var md5_crypto = require('../lib/md5_crypto');
var CONST = require('../data/const');
var md5_key = CONST.md5_key;
var encryptStr = CONST.md5_encryptStr;
var md5Sign = CONST.md5Sign;
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