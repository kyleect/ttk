type middlewareFn = (value:string) => string;

interface factoryOptions {
  keyPrefix?:string,
  mergeMiddleware?:boolean,
  valueFns?: middlewareFn[],
  renderFns?: middlewareFn[]
}

type defaultOptions = {
  keyPrefix:string;
  mergeMiddleware:boolean;
  valueFns: middlewareFn[];
  renderFns: middlewareFn[];
}

interface middlewareStack {
  [s:string]:middlewareFn;
}

interface valueMiddlewareStack extends middlewareStack {
  /** Wraps values for use in sql statements */
  sqlValueWrapper:middlewareFn;
}

interface renderMiddlewareStack extends middlewareStack {
  /** Trims multiline strings and normalizes indentation */
  multilineStringTrim:middlewareFn;
}

type factoryFn = (options:factoryOptions) => templateFn;
type templateFn = (strings:string[], keys?:any[]) => renderFn;
type renderFn = (context:Object) => string;

interface ttk {
  /** Returns a new template function with options applied */
  factory:factoryFn;
  /** Tagged template literal function */
  template:templateFn;
  /** Render template to string using context data */
  render:renderFn;
  /** Default options for factory */
  defaultOptions: defaultOptions;
  /** Middleware stacks */
  middleware: {
    /** Value middleware stack */
    value:valueMiddlewareStack,
    /** Render middleware stack */
    render:renderMiddlewareStack
  }
}

declare var ttk: ttk;

export = ttk;