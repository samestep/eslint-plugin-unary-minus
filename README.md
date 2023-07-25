# eslint-plugin-unary-minus

A [typescript-eslint][] plugin restricting [unary negation][] to [`number`][]s.

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

[`number`]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean
[eslint]: https://eslint.org/
[typescript-eslint]: https://typescript-eslint.io/
[unary negation]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_negation
