var assert = require('assert');
var expect = require('expect.js');

var validators = require('../../lib/field_validators');
var Schema = require('../../lib/schema');

describe('Select field', function() {
    describe('Select field with options array', function() {
        it('allows you to select a value from the list', function() {        
            var theField = validators.selectField({
                required: true,
                valueType: validators.textField({required: true}),
                options: [
                    {name: "select-me", title: "Select Me"},
                    {name: "do-not-select", title: "Don't Select Me"}
                ]});
        
            var tmp = theField.validate("select-me");
            expect(tmp).to.be(undefined);
        });
        
        it('allows undefined or null if not required', function() {        
            var theField = validators.selectField({
                required: false,
                valueType: validators.textField({required: true}),
                options: [
                    {name: "select-me", title: "Select Me"},
                    {name: "do-not-select", title: "Don't Select Me"}
                ]});
        
            var tmp = theField.validate(undefined);
            expect(tmp).to.be(undefined);
            var tmp = theField.validate(null);
            expect(tmp).to.be(undefined);
            
        });

        it('throws an error if selected value is outside list', function() {        
            var theField = validators.selectField({
                required: true,
                valueType: validators.textField({required: true}),
                options: [
                    {name: "select-me", title: "Select Me"},
                    {name: "do-not-select", title: "Don't Select Me"}
                ]});
        
            var tmp = theField.validate("outside-list");
            expect(tmp).to.not.be(undefined);
        });
        
        

        it('throws an error if wrong type', function() {        
            var theField = validators.selectField({
                required: true,
                valueType: validators.emailField({required: true}),
                options: [
                    {name: "select-me", title: "Select Me"},
                    {name: "do-not-select", title: "Don't Select Me"}
                ]});
        
            var tmp = theField.validate("select-me");
            expect(tmp).to.not.be(undefined);
        });

        it('can convert a value to a title', function() {        
            var theField = validators.selectField({
                required: true,
                valueType: validators.textField({required: true}),
                options: [
                    {name: "select-me", title: "Select Me"},
                    {name: "do-not-select", title: "Don't Select Me"}
                ]});
        
            var tmp = theField.getOptionTitle("select-me");
            expect(tmp).to.equal('Select Me');
        });

        it('convert a value to a title handles undefined', function() {        
            var theField = validators.selectField({
                required: true,
                valueType: validators.textField({required: true}),
                options: [
                    {name: "select-me", title: "Select Me"},
                    {name: "do-not-select", title: "Don't Select Me"}
                ]});
        
            var tmp = theField.getOptionTitle("no exist");
            expect(tmp).to.be(undefined);
        });
    });
});