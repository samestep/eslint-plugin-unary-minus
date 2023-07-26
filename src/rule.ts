import { ESLintUtils, TSESLint } from "@typescript-eslint/utils";
import * as ts from "typescript";

interface TypeChecker extends ts.TypeChecker {
  // https://github.com/microsoft/TypeScript/issues/9879
  isTypeAssignableTo(source: ts.Type, target: ts.Type): boolean;
  getUnionType(types: ts.Type[]): ts.Type;
}

const createRule = ESLintUtils.RuleCreator(
  () => "https://npmjs.com/package/eslint-plugin-unary-minus",
);

export type Rule = TSESLint.RuleModule<
  "unary-minus",
  never[],
  TSESLint.RuleListener
>;

export const rule: Rule = createRule({
  name: "only-numbers",
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
        const checker = services.program.getTypeChecker() as TypeChecker;
        if (
          !checker.isTypeAssignableTo(
            services.getTypeAtLocation(node.argument),
            checker.getUnionType([
              checker.getNumberType(), // first exposed in TypeScript v5.1
              checker.getBigIntType(), // first added in TypeScript v5.1
            ]),
          )
        )
          context.report({ messageId: "unary-minus", node });
      },
    };
  },
});
