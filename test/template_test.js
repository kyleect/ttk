import {describe, it } from 'mocha';
import {expect} from 'chai';

import { template } from '../src';
import defaultOptions from '../src/defaultOptions';

describe('template', () => {
  const binding = defaultOptions;
  const boundTemplate = template.bind({ binding });

  it('is a function', () => {
    expect(boundTemplate).to.be.a.function;
  });

  it('returns a function', () => {
    expect(boundTemplate``).to.be.a.function;
  });

  it('throws error if not used with string literal', () => {
    expect(() => boundTemplate()).to.throw('You must use template with template literal');
  });

  it('throws error function is called without binding first', () => {
    expect(() => template``).to.throw('You must bind template function if not using factory');
  });
});