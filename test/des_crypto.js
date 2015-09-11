var des_crypto = require('../lib/des_crypto');
var md5_crypto = require('../lib/md5_crypto');
var des_key = 'des-ede3_key_length_must_be_13ok';
var encryptStr = 'country=中国&name=navy&url=https://github.com/navyxie';
var encryptData = 'ZfXzWxxCfDHRuhyoPgiWUnOHqSVCOLF2FyyXcN+ArCjDtjBaUqH/z/VR8nk8gwnpjO7zqx4h/fo=';
var encryptStr2 = 'country=中国&name=篡改&url=https://github.com/navyxie';
var encryptData2 = 'ZfXzWxxCfDHRuhyoPgiWUhLTMKqR8RON/QgO+89Vfv3QCum2s7bu8k/ETzod6wRkG3W57ErySyqpf9GwjxzgAg==';
var md5Sign = md5_crypto.md5Sign(encryptStr);
var should = require('should');
describe('des_crypto',function(){
	describe('#encrypt()',function(){
		it('it should be ok',function(){
			des_crypto.encrypt(encryptStr,des_key).should.be.equal(encryptData);
		});
	});
	describe('#decrypt()',function(){
		it('it should be ok',function(){
			des_crypto.decrypt(encryptData,des_key).should.be.equal(encryptStr);
		});
		it('it should be not ok',function(){
			des_crypto.decrypt(encryptData+'a=',des_key).should.not.be.equal(encryptStr);
		});
		it('it should be not ok',function(){
			des_crypto.decrypt(encryptData,des_key+'fail').should.be.equal('');
		});
	});
	describe('#verify()',function(){
		it('it should be ok',function(){
			des_crypto.verify(encryptData,md5Sign,des_key).should.be.equal(true);
		});
		it('it should be not ok',function(){
			des_crypto.verify(encryptData+'error=',md5Sign,des_key).should.be.equal(false);
		});
		it('it should be not ok',function(){
			des_crypto.verify(encryptData,md5Sign+'error',des_key).should.be.equal(false);
		});
		it('it should be not ok',function(){
			des_crypto.verify(encryptData2,md5Sign,des_key).should.be.equal(false);
		});
	});
});