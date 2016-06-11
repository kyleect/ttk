import {describe, it } from 'mocha';
import {expect} from 'chai';

const { multilineStringTrim } = require('../../src/middleware/render');

describe('multilineStringTrim(text)', () => {
  it('trims multiline string', () => {
    expect(multilineStringTrim(`
    Hello World!
    `)).to.equal(`Hello World!`);
  });

  it(`trims single line string`, () => {
    expect(multilineStringTrim(`Hello World!`)).to.equal(`Hello World!`);
  });

  it(`trims single line string with leading whitespace`, () => {
    expect(multilineStringTrim(`   Hello World!`)).to.equal(`Hello World!`);
  });

  it(`trims single line string with trailing whitespace`, () => {
    expect(multilineStringTrim(`Hello World!   `)).to.equal(`Hello World!`);
  });

  it(`trims single line string with leading & trailing whitespace`, () => {
    expect(multilineStringTrim(`   Hello World!   `)).to.equal(`Hello World!`);
  });
});