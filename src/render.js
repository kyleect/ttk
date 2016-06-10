/**
 * render
 * Render template to string using context data
 * @param {Object} context - Data to render in the template`
 */
export default function render (context = {}) {
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