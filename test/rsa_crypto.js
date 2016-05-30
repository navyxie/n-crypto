var utf8 = require('utf8');
var crypto = require('crypto');
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
        describe('#sign()->merchant',function(){
                it('it should be ok',function(){
                        rsa_crypto.sign(merchant_encryptStr,merchant_pri_key).should.be.equal(merchant_encryptData);
                });
                it('it should be not ok',function(){
                        rsa_crypto.sign(merchant_encryptStr,merchant_pri_key+'abc').should.not.be.equal(merchant_encryptData);
                });
                it('it should be not ok',function(){
                        rsa_crypto.sign(merchant_encryptStr,merchant_pri_key+'=').should.not.be.equal(merchant_encryptData);
                });
        });
        describe('#verify()->merchant',function(){
                it('it should be ok',function(){
                        rsa_crypto.verify(merchant_encryptStr,merchant_encryptData,merchant_pub_key).should.be.equal(true);
                });
                it('it should be not ok',function(){
                        rsa_crypto.verify(merchant_encryptStr+'fail',merchant_encryptData,merchant_pub_key).should.be.equal(false);
                });
                it('it should be not ok',function(){
                        rsa_crypto.verify(merchant_encryptStr,('fail123'),merchant_pub_key).should.be.equal(false);
                });
        });
        describe('#sign()->nPay',function(){
                it('it should be ok',function(){
                        rsa_crypto.sign(nPay_encryptStr,npay_pri_key).should.be.equal(nPay_encryptData);
                });
        });
        describe('#rsaVerify()->nPay',function(){
                it('it should be ok',function(){
                        rsa_crypto.verify(nPay_encryptStr,nPay_encryptData,npay_pub_key).should.be.equal(true);
                });
        });
        describe('#encrypt()',function(){
                it('it should be ok',function(){
                        if(typeof crypto.publicEncrypt === 'function'){
                                CONST.rsa_encrypt_base64 = rsa_crypto.encrypt(utf8.encode(merchant_encryptStr),merchant_pub_key);
                                CONST.rsa_encrypt_base64.should.not.be.equal('');
                        }
                });
        });
        describe('#decrypt()',function(){
                it('it should be ok',function(){
                        if(typeof crypto.publicEncrypt === 'function'){
                                utf8.decode(rsa_crypto.decrypt(CONST.rsa_encrypt_base64,merchant_pri_key)).should.be.equal(merchant_encryptStr)
                        }
                });
        });
});