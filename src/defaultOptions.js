import multilineStringTrim from './render-middleware/multilineStringTrim';

export default {
  mergeMiddleware: false,
  valueFns: [],
  renderFns: [multilineStringTrim],
  keyPrefix: '@'
};
