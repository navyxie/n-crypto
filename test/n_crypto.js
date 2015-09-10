var n_crypto = require('../lib/n_crypto');
var should = require('should');
describe('n_crypto',function(){
	describe('MD5',function(){
		var md5_key = 'navy_test_201509110233';
		var encryptStr = 'navy_encryptStr_201509110233_伟大的中国';
		var md5Sign = '482a89f2bc4f34f3f066bf6408022458';
		var sign_type = 'MD5';
		describe('#encrypt()',function(){
			it('md5 it should be ok',function(){
				n_crypto.encrypt(encryptStr,sign_type,md5_key).should.be.equal(md5Sign);
			});
		});
		describe('#md5Verify()',function(){
			it('md5 it should be ok',function(){
				n_crypto.verify(encryptStr,md5Sign,sign_type,md5_key).should.be.equal(true);
			});
			it('md5 it should be not ok',function(){
				n_crypto.verify(encryptStr,md5Sign+'error',sign_type,md5_key).should.be.equal(false);
			});
			it('md5 it should be not ok',function(){
				n_crypto.verify(encryptStr+'error',md5Sign,sign_type,md5_key).should.be.equal(false);
			});
		});
	});
	describe('RSA',function(){
		//todo
	})
});