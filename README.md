# eslint-plugin-unary-minus ![npm](https://img.shields.io/npm/v/eslint-plugin-unary-minus)

A [typescript-eslint][] plugin restricting [unary negation][] to numbers.

As explained [on Stack Overflow][so], TypeScript does not prevent you from
putting a minus sign before things other than numbers:

```typescript
const f = (a: string) => -a; // OK
const g = (a: {}) => -a; // also OK

console.log(f("hi there")); // NaN
console.log(g("hi there")); // NaN
```

This ESLint plugin catches that sort of bug by checking that every usage of
unary negation has an argument with type assignable to `number | bigint`.

## Installation

You'll first need to install [ESLint][eslint] and [typescript-eslint][]:

```sh
npm i eslint @typescript-eslint/eslint-plugin --save-dev
```

Next, install `eslint-plugin-unary-minus`:

```sh
npm install eslint-plugin-unary-minus --save-dev
```

## Usage

Add `unary-minus` to the plugins section of your `.eslintrc` configuration file.
You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["unary-minus"]
}
```

Then add this rule under the rules section.

```json
{
  "rules": {
    "unary-minus": "error"
  }
}
```

[eslint]: https://eslint.org/
[so]: https://stackoverflow.com/q/59573311/5044950
[typescript-eslint]: https://typescript-eslint.io/
[unary negation]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_negation
