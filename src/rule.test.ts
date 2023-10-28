import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "vitest";
import { rule } from "./rule.js";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "../tsconfig.json",
    tsconfigRootDir: __dirname,
  },
});

ruleTester.run("unary-minus", rule, {
  valid: [
    "+42",
    "-42",
    "-42n",
    "(a: number) => -a",
    "(a: bigint) => -a",
    "(a: number | bigint) => -a",
    "(a: any) => -a",
    "(a: 1 | 2) => -a",
    "(a: string) => +a",
    "(a: number[]) => -a[0]",
    "<T>(t: T & number) => -t",
    "(a: { x: number }) => -a.x",
    "(a: never) => -a",
    "<T extends number>(t: T) => -t",
  ],
  invalid: [
    { code: "(a: string) => -a", errors: [{ messageId: "unary-minus" }] },
    { code: "(a: {}) => -a", errors: [{ messageId: "unary-minus" }] },
    { code: "(a: number[]) => -a", errors: [{ messageId: "unary-minus" }] },
    { code: "-'hello'", errors: [{ messageId: "unary-minus" }] },
    { code: "-`hello`", errors: [{ messageId: "unary-minus" }] },
    {
      code: "(a: { x: number }) => -a",
      errors: [{ messageId: "unary-minus" }],
    },
    { code: "(a: unknown) => -a", errors: [{ messageId: "unary-minus" }] },
    { code: "(a: void) => -a", errors: [{ messageId: "unary-minus" }] },
    { code: "<T>(t: T) => -t", errors: [{ messageId: "unary-minus" }] },
  ],
});
