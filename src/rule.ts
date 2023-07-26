import { ESLintUtils, TSESLint } from "@typescript-eslint/utils";

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
        const checker = services.program.getTypeChecker();
        // https://github.com/microsoft/TypeScript/issues/9879
        const internal = checker as any;
        if (
          !internal.isTypeAssignableTo(
            services.getTypeAtLocation(node.argument),
            internal.getUnionType([
              checker.getNumberType(),
              checker.getBigIntType(),
            ]),
          )
        )
          context.report({ messageId: "unary-minus", node });
      },
    };
  },
});
