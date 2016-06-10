import render from './render';

/**
 * template
 * Tagged template literal function
 * @param {string[]} strings
 * @param {any[]} keys
 * @returns {function}
 */
export default function template (strings, ...keys) {
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