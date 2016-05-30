var utf8 = require('utf8');
var aes_crypto = require('../lib/aes_crypto');
var CONST = require('../data/const');
var aes_key = CONST.aes_key;
var aes_encryptStr = CONST.des_encryptStr;
var aes_encryptData = CONST.aes_encryptData;
var should = require('should');
describe('aes_crypto',function(){
        describe('#encrypt()',function(){
                it('it should be ok',function(){
                        console.log('aes_key',aes_key);
                        aes_crypto.encrypt(utf8.encode(aes_encryptStr),aes_key).should.be.equal(aes_encryptData);
                });
        });
        describe('#decrypt()',function(){
                it('it should be ok',function(){
                        utf8.decode(aes_crypto.decrypt(aes_encryptData,aes_key)).should.be.equal(aes_encryptStr);
                });
                it('it should be not ok',function(){
                        utf8.decode(aes_crypto.decrypt('a=',aes_key)).should.not.be.equal(aes_encryptStr);
                });
                it('it should be not ok',function(){
                        utf8.decode(aes_crypto.decrypt(aes_encryptData,aes_key+'fail')).should.be.equal('');
                });
        });
});