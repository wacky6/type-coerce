coerce
===
helper to coerce value to expected type  
useful to parse query-string parameters

## Install
`npm install type-coerce`

## Usage
```JavaScript
let coerce = require('type-coerce')
let val = coerce.int('123')
// val = 123

let arr = coerce.array('a,b,c')
// val = ['a', 'b', 'c']
```

## API
* on success: => coerced value
* on failure: => `undefined`

#### coerce.int(val) => `Number`, an integer

#### coerce.floar(val) => `Number`

#### coerce.bool(val) => `true` or `false`
* `true`, `'true'`, `'True'`, `'TRUE'`,  `'1'`, `1` returns `true`
* `false`, `'false'`, `'False'`, `'FALSE'`, `'0'`, `0` returns `false`
* anything else fails the coercion

#### coerce.string(val) => `String`
* if `val` is `string` => `val`
* otherwise, => `util.inspect(val)`

#### coerce.array(val, elemT, sep)  => Array of String
* val:
  * `string`: parse into Array, split by `sep`, parse element by `elemT`
  * `null`, `undefined`: `undefined`
  * `Array`:   parse elements with `elemT`
  * otherwise, `[val]`
* sep: explicitly specify separator, `string` or `RegExp`
  * default: `\s*,\s*`, this splits string with `,` and trims spaces
* elemT: element parser, `(str)=>element`
  * a function that parses array element
  * default: `coerce.any`
* `sep` or `elemT` can be omitted, or passed in reverse order

#### coerce.typedArray(sep, elemT)  => `(val)=>coerce.array(val, sep, elemT)`
* create a partial initialized function to use later
* take `sep`, `elemT` as arguments

#### coerce.any(val) => `val`
* => `val`

#### coerce.date(val) => `Date`
* `val` is passed to `new Date()`





## LICENSE
MIT (C) wacky6/Jiewei Qian


