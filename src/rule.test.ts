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
    "(x: number) => -x",
    "(x: any) => -x",
    "(x: 1 | 2) => -x",
  ],
  invalid: [
    { code: "(x: string) => -x", errors: [{ messageId: "unary-minus" }] },
  ],
});
