var index = require('../lib/index');
var util = require('../lib/util');
var md5_key = 'navy_test_201509110233';
var sign_type = 'MD5';
var encryptJson = {
	name:"navy",
	version:"1.0",
	country:"中国",
	age:201509110233
};
var md5Sign = 'a12b2084d8c7297a25fcfe452af8257c';
var should = require('should');
var nCrypto = new index({
	md5_key:md5_key
});
describe('index',function(){
	describe('MD5',function(){
		describe('#encrypt()',function(){
			it('it should be ok',function(){
				var signVal = nCrypto.encrypt(encryptJson,sign_type);
				signVal.should.be.equal(md5Sign);
			});
		});
		describe('#verify()',function(){
			it('it should be ok',function(){
				nCrypto.verify(encryptJson,md5Sign,sign_type).should.be.equal(true);
			});
			it('it should be not ok',function(){
				var cloneJson = util.clone(encryptJson);
				cloneJson.country = '伟大的中国';
				nCrypto.verify(cloneJson,md5Sign,sign_type).should.be.equal(false);
			});
			it('it should be not ok',function(){
				nCrypto.verify(encryptJson,md5Sign+'error',sign_type).should.be.equal(false);
			});
		});
	});
	describe('RSA',function(){
		//todo
	})
});