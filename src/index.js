import defaultOptions from './defaultOptions';

/**
 * templateFactory
 * Returns a new template function with defined middleware applied
 * @param {(() => string)[]} valueFns - Value middleware functions
 * @param {(() => string)[]} renderFns - Render middleware functions
 * @param {string} keyPrefix - String prefix for keys in template
 */
export default function taggedTemplateFactory (options = {}) {
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
  
  /**
   * Tagged template literal function
   * @param {string[]} strings
   * @param {any[]} keys
   * @returns {((context:Object) => string)}
   */
  function taggedTemplate (strings, ...keys) {
    /**
     * Render template to string using context data
     * @param {Object} context - Data to render in the template`
     */
    function render (context = {}) {
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
    
    return render;
  }
  
  return taggedTemplate;
}
