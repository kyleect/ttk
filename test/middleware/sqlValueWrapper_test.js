import {describe, it } from 'mocha';
import {expect} from 'chai';

import { sqlValueWrapper } from '../../src/middleware/value';

describe('sqlValueWrapper(text)', () => {
  it('wraps strings in quotations', () => {
    expect(sqlValueWrapper('Hello World!')).to.equal(`'Hello World!'`);
  });

  it('wraps arrays as comma seperated list in paranthesis', () => {
    expect(sqlValueWrapper(['a', 'b', 1])).to.equal(`('a', 'b', 1)`);
  });
  
  it('does not wrap numbers', () => {
    expect(sqlValueWrapper(100)).to.equal(100);
  });
});