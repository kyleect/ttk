/**
 * 
 */
export default function sqlValueWrapper (value) {
  const wrapString = (value) => `'${value}'`;
  const wrapArray = (value) => `(${value.map(v => sqlValueWrapper(v)).join(', ')})`;
  const wrapNumber = (value) => value;
  const wrapToString = (value) => wrapString(value.toString());
  
  switch (Object.prototype.toString.call(value)) {
  case '[object String]':
    return wrapString(value);
  case '[object Array]':
    return wrapArray(value);
  case '[object Number]':
    return wrapNumber(value);
  default:
    try {
      return wrapToString(value);
    } catch (e) {
      return value;
    }
  }
}
