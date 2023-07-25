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
    "-42",
    "-42n",
    "(a: number) => -a",
    "(a: any) => -a",
    "(a: 1 | 2) => -a",
  ],
  invalid: [
    { code: "(a: string) => -a", errors: [{ messageId: "unary-minus" }] },
    { code: "(a: {}) => -a", errors: [{ messageId: "unary-minus" }] },
  ],
});
