import defaultOptions from './defaultOptions';
import template from './template';

/**
 * factory
 * Returns a new template function with options applied
 * @param {Object} options
 * @param {boolean} options.mergeMiddleware If middleware defined in options should be merged with defaults. Default: false
 * @param {string} options.keyPrefix String prefix of keys in template. Default: @
 * @param {function[]} options.valueFns Array of functions to apply to values during render
 * @param {function[]} options.renderFns Array of functions to apply to the final render
 */
export default function factory (options = {}) {
  const mergeMiddleware = options.mergeMiddleware || defaultOptions.mergeMiddleware;
  const keyPrefix = options.keyPrefix || defaultOptions.keyPrefix;
  let valueFns;
  let renderFns;

  if (options.valueFns) {
    if (mergeMiddleware) {
      valueFns = defaultOptions.concat(options.valueFns);
    } else {
      valueFns = options.valueFns;
    }
  } else {
    valueFns = defaultOptions.valueFns;
  }

  if (options.renderFns) {
    if (mergeMiddleware) {
      renderFns = defaultOptions.concat(options.renderFns);
    } else {
      renderFns = options.renderFns;
    }
  } else {
    renderFns = defaultOptions.renderFns;
  }

  const binding = { keyPrefix, valueFns, renderFns };
  return template.bind({ binding });
}