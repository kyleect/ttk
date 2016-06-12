[![Build Status](https://travis-ci.org/maexsoftware/ttk.svg?branch=master)](https://travis-ci.org/maexsoftware/ttk)

# TTK <small>Template Tool Kit</small>

String template literals plus.

## Installation

```sh
$ npm install --save ttk
```

## Basic Usage

```js
const ttk = require('ttk');

const t = ttk.factory();
const render = t`Hello, ${'@name'}!`;

render({ name: 'World' }); // Hello, World!
```

## Configuration

### keyPrefix [default: @]

String prefix to identify the context value placeholders in the template.

```js
const ttk = require('ttk');

const t = ttk.factory({
  keyPrefix: '#'
});

const render = t`Hello, ${'#name'}!`;

render({ name: 'World' }); // Hello, World!
```

### mergeMiddleware [default: false]

Boolean to detirmine if middleware arrays should merge/concat from passed options or override.

### valueFns

Array of middleware functions that context values are processed through.

### renderFns

Array of middleware functions that the final render string is processed through.

## Examples

### SQL Queries with sqlValueWrapper

```js
const ttk = require('ttk');

const sql = ttk.factory({
  valueFns: [ttk.middleware.value.sqlValueWrapper]
});

const render = sql`
SELECT firstname, lastname
FROM person
WHERE gender = ${'@gender'}
AND state IN ${'@states'}
AND age > ${'@age'}
`;

render({ age: 30, gender: 'male', states: ['NY', 'CA'] });

// SELECT firstname, lastname
// FROM person
// WHERE gender = 'male'
// AND state IN ('NY', 'CA')
// AND age > 30
```