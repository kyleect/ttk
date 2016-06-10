import {describe, it } from 'mocha';
import {expect} from 'chai';

import multilineStringTrim from '../src/render-middleware/multilineStringTrim';

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