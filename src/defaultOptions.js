import { multilineStringTrim } from './middleware/render';

export default {
  mergeMiddleware: false,
  valueFns: [],
  renderFns: [multilineStringTrim],
  keyPrefix: '@'
};
