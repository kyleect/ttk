# TTK <small>Template Tool Kit</small>

String template literals plus.

## Basic Usage

```js
import { default as ttk } from '@maexsoftware/ttk'

const t = ttk();
const render = t`Hello, ${'@name'}!`;

render({ name: 'World' }); // Hello, World!
```

## Configuration

### keyPrefix [default: @]

String prefix to identify the context value placeholders in the template.

```js
import { default as ttk } from '@maexsoftware/ttk'

const t = ttk({
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
import { default as ttk } from '@maexsoftware/ttk'
import sqlValueWrapper from '@maexsoftware/ttk/value-middleware'

const sql = ttk({
  valueFns: [sqlValueWrapper]
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