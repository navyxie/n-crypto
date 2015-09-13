var des_crypto = require('../lib/des_crypto');
var CONST = require('../data/const');
var des_key = CONST.des_key;
var encryptStr = CONST.des_encryptStr;
var encryptData = CONST.des_encryptData;
var should = require('should');
var utf8 = require('utf8');
describe('des_crypto',function(){
	describe('#encrypt()',function(){
		it('it should be ok',function(){
			des_crypto.encrypt(utf8.encode(encryptStr),des_key).should.be.equal(encryptData);
		});
	});
	describe('#decrypt()',function(){
		it('it should be ok',function(){
			utf8.decode(des_crypto.decrypt(encryptData,des_key)).should.be.equal(encryptStr);
		});
		it('it should be not ok',function(){
			utf8.decode(des_crypto.decrypt(encryptData+'a=',des_key)).should.not.be.equal(encryptStr);
		});
		it('it should be not ok',function(){
			utf8.decode(des_crypto.decrypt(encryptData,des_key+'fail')).should.be.equal('');
		});
	});
});