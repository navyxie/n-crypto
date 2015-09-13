var utf8 = require('utf8');
var md5_crypto = require('../lib/md5_crypto');
var CONST = require('../data/const');
var md5_key = CONST.md5_key;
var encryptStr = utf8.encode(CONST.md5_encryptStr);
var md5Sign = CONST.md5Sign;
var should = require('should');
describe('md5_crypto',function(){
	describe('#sign()',function(){
		it('it should be ok',function(){
			md5_crypto.sign(encryptStr).should.be.equal(md5Sign);
		});
	});
	describe('#verify()',function(){
		it('it should be ok',function(){
			md5_crypto.verify(encryptStr,md5Sign).should.be.equal(true);
		});
		it('it should be not ok',function(){
			md5_crypto.verify(encryptStr,md5Sign+'error').should.be.equal(false);
		});
		it('it should be not ok',function(){
			md5_crypto.verify(encryptStr+'error',md5Sign).should.be.equal(false);
		});
	});
});