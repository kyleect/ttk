import {describe, it, beforeEach} from 'mocha';
import {expect} from 'chai';

import taggedTemplateFactory from '../src';

describe('tagged-template', () => {
  describe('function taggedTemplateFactory(options = { key: value, ... })', () => {    
    describe('return function taggedTemplate(strings, ...keys)', () => {
      let taggedTemplate;
      
      beforeEach(() => {
        taggedTemplate = taggedTemplateFactory();
      });
      
      it('returns a function when used with template literal', () => {
        expect(taggedTemplate``).to.be.a.function;
      });
      
      describe('return function render(context = { key: value, ...})', () => {
        let render;
        
        beforeEach(() => {
          render = taggedTemplate`Hello, ${'@name'}`;
        });
        
        describe('key not defined in context', () => {
          it('inserts key value as tag value', () => {
            expect(render()).to.equal('Hello, @name');
          });
        });
        
        describe('key is defined in context', () => {
          it('inserts context value as tag value', () => {
            expect(render({ name: 'World' })).to.equal(`Hello, World`);
          });
        });
        
        describe(`key's prefix not matching options.keyPrefix`, () => {
          it('inserts key value as tag value', () => {
            render = taggedTemplate`Hello, ${'name'}`;
            expect(render({ name: 'World' })).to.equal('Hello, World');
          });
        });
      });
    });
  });
});