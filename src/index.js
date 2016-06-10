import defaultOptions from './defaultOptions';

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

/**
 * template
 * Tagged template literal function
 * @param {string[]} strings
 * @param {any[]} keys
 * @returns {function}
 */
export function template (strings, ...keys) {
  if (typeof strings === 'undefined') {
    throw new Error('You must use template with template literal');
  }

  try {
    const binding = Object.assign(this.binding, { strings, keys });
    return render.bind({ binding });
  } catch (e) {
    throw new Error(`You must bind template function if not using factory`);
  }
}

/**
 * render
 * Render template to string using context data
 * @param {Object} context - Data to render in the template`
 */
export function render (context = {}) {
  const { strings, keys, keyPrefix, valueFns, renderFns } = this.binding;

  /**
   * Raw rendered string without middleware functions ran
   */
  const rawRenderedString = keys
    .reduce((result, key, index) => {
      /**
       * Regex pattern to test for key prefix
       */
      const keyPrefixPattern = new RegExp(`^${keyPrefix}`);
      
      /**
       * Key with key prefix removed
       */
      let contextKey = keyPrefixPattern
        .test(key) ? key.substring(keyPrefix.length) : key;
        
      /**
       * Raw value not processed through value middleware functions
       */
      const rawValue = context[contextKey] || key;
      
      /**
       * Value processed through value middleware functions
       */
      const value = valueFns
        .filter(fn => typeof fn === 'function')
        .reduce((value, fn) => fn(value), rawValue);
      
      return [...result, value, strings[index + 1]];
    }, [strings[0]])
    .join('');
  
  /**
   * Raw rendered string processed through render middleware functions
   */
  const renderedString = renderFns
    .filter(fn => typeof fn === 'function')
    .reduce((result, fn) => fn(result), rawRenderedString);
    
  return renderedString;
}