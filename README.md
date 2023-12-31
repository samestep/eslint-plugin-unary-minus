# eslint-plugin-unary-minus [![npm](https://img.shields.io/npm/v/eslint-plugin-unary-minus)](https://www.npmjs.com/package/eslint-plugin-unary-minus) [![license](https://img.shields.io/github/license/samestep/eslint-plugin-unary-minus)](LICENSE) [![Build](https://github.com/samestep/eslint-plugin-unary-minus/actions/workflows/build.yml/badge.svg)](https://github.com/samestep/eslint-plugin-unary-minus/actions/workflows/build.yml)

**DEPRECATION NOTICE: This plugin is no longer necessary as of
[typescript-eslint v6.14.0]. Use the
[`@typescript-eslint/no-unsafe-unary-minus`][] rule instead of this package.**

---

A [typescript-eslint][] plugin restricting [unary negation][] to numbers.
Requires [TypeScript][] v5.1+.

As explained [on Stack Overflow][so], TypeScript does not prevent you from
putting a minus sign before things other than numbers:

```typescript
const f = (a: string) => -a; // OK
const g = (a: {}) => -a; // also OK

console.log(f("hi there")); // NaN
console.log(g({})); // NaN
```

This [ESLint][] plugin catches that sort of bug by checking that every usage of
unary negation has an argument with type assignable to `number | bigint`.

## Installation

You'll first need to install ESLint, TypeScript, and typescript-eslint:

```sh
npm i --save-dev eslint typescript @typescript-eslint/eslint-plugin
```

Next, install `eslint-plugin-unary-minus`:

```sh
npm i --save-dev eslint-plugin-unary-minus
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
    "unary-minus/only-numbers": "error"
  }
}
```

[`@typescript-eslint/no-unsafe-unary-minus`]: https://typescript-eslint.io/rules/no-unsafe-unary-minus
[eslint]: https://eslint.org/
[so]: https://stackoverflow.com/q/59573311/5044950
[typescript]: https://www.typescriptlang.org/
[typescript-eslint]: https://typescript-eslint.io/
[typescript-eslint v6.14.0]: https://github.com/typescript-eslint/typescript-eslint/releases/tag/v6.14.0
[unary negation]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_negation
