import {describe, it } from 'mocha';
import {expect} from 'chai';

import { factory } from '../src';

describe('factory', () => {
  it('is a function', () => {
    expect(factory).to.be.a.function;
  });

  it('returns a function', () => {
    expect(factory()).to.be.a.function;
  });
});