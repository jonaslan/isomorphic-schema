var assert = require('assert');
var expect = require('expect.js');

var validators = require('../../lib/field_validators');
var Schema = require('../../lib/schema');

describe('Telephone field', function() {
    it('accepts international phonenumber', function() {        
        var phoneField = validators.telephoneField({required: true});
    
        var tmp = phoneField.validate("+46 707 555 555");
        expect(tmp).to.be(undefined);
    });

    it('accepts local phonenumber', function() {        
        var phoneField = validators.telephoneField({required: true});
    
        var tmp = phoneField.validate("0707-55 55 55");
        expect(tmp).to.be(undefined);
    });

    it('throws error on undefined if required', function() {        
        var phoneField = validators.telephoneField({required: true});
        var tmp = phoneField.validate();
        expect(tmp).to.not.be(undefined);
    });
    
    it('throws error on malformed phonenumber', function() {        
        var phoneField = validators.telephoneField({required: false});
        var tmp = phoneField.validate("+4567$707 555 555");
        expect(tmp).to.not.be(undefined);
    });

    it('throws error on too many characters', function() {        
        var phoneField = validators.telephoneField({required: false});
        var tmp = phoneField.validate("1234567890123456");
        expect(tmp).to.not.be(undefined);
    });
});