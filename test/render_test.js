import {describe, it } from 'mocha';
import {expect} from 'chai';

import { render } from '../src';
import defaultOptions from '../src/defaultOptions';

describe('render', () => {
  const strings = ["Hello, ", ""];
  const keys = ["@name"];
  const binding = Object.assign(defaultOptions, { strings, keys});
  const boundRender = render.bind({ binding });

  it('is a function', () => {
    expect(render).to.be.a.function;
  });

  it('returns a string', () => {
    expect(boundRender()).to.be.a.string;
  });

  it('inserts key value as tag value if no context passed', () => {
    expect(boundRender()).to.equal('Hello, @name');
  });

  it('inserts key value as tag value if key not in passed context', () => {
    expect(boundRender({})).to.equal('Hello, @name');
  });

  it('inserts context value as tag value if key is in passed context', () => {
    expect(boundRender({ 'name': 'World' })).to.equal('Hello, World');
  });

  it('inserts key value as tag value if key prefix doesnt match options.keyPrefix', () => {
    const strings = ["Hello, ", ""];
    const keys = ["@name"];
    const binding = Object.assign(defaultOptions, { strings, keys, keyPrefix: '!' });
    const boundRender = render.bind({ binding });

    expect(boundRender()).to.equal('Hello, @name');
  });
});