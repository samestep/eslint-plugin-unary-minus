import { ESLintUtils, TSESLint } from "@typescript-eslint/utils";
import * as ts from "typescript";

const createRule = ESLintUtils.RuleCreator(
  () => "https://npmjs.com/package/eslint-plugin-unary-minus",
);

export type Rule = TSESLint.RuleModule<
  "unary-minus",
  never[],
  TSESLint.RuleListener
>;

export const rule: Rule = createRule({
  name: "unary-minus",
  meta: {
    docs: { description: "Restrict unary negation to numbers." },
    messages: { "unary-minus": "Don't use unary negation on a non-number." },
    type: "problem",
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      UnaryExpression(node) {
        if (node.operator !== "-") return;
        const services = ESLintUtils.getParserServices(context);
        const type = services.getTypeAtLocation(node.argument);
        if (
          type.flags &
          (ts.TypeFlags.Any | ts.TypeFlags.Number | ts.TypeFlags.NumberLiteral)
        )
          return;
        context.report({
          messageId: "unary-minus",
          node: node.argument,
        });
      },
    };
  },
});
