var util = require('../lib/util');
var should = require('should');
describe('util',function(){
        it('#clone()',function(){
                var a = {num:1};
                var b = util.clone(a);
                b.should.have.properties({num:1});
                a.num = 2;
                a.should.have.properties({num:2});
                b.should.have.properties({num:1});
        });
        it('#paramFilter()',function(){
                var a = {
                        num:1,
                        name:'navy',
                        empty:'',
                        sign:'ok'
                };
                var b = util.paramFilter(a);
                b.should.have.properties({num:1,name:'navy'});
        });
        it('#jsonToSearch()',function(){
                var a = {
                        num:1,
                        name:'navy',
                        empty:'',
                        sign:'ok'
                };
                var b = util.jsonToSearch(a);
                b.should.be.equal('num=1&name=navy&empty=&sign=ok');
        });
        it('#encryptStr()',function(){
                var a = {
                        num:1,
                        name:'navy',
                        empty:'',
                        sign:'ok'
                };
                var b = util.encryptStr(a);
                b.should.be.equal('name=navy&num=1&sign=ok');
        });
});