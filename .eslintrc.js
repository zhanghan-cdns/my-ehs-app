module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:vue/essential",
  ],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    indent: [2, 2, { SwitchCase: 1 }], // 强制使用一致的缩进
    quotes: [0, "single"],
    strict: 2, // 使用严格模式
    "no-redeclare": 2, // 禁止重复声明变量
    "no-unused-expressions": 2, // 禁止无用的表达式
    "no-nested-ternary": 0, // 禁止使用嵌套的三目运算
    "no-mixed-spaces-and-tabs": [2, false], // 禁止混用tab和空格
    "no-irregular-whitespace": 2, // 不能有不规则的空格
    "no-eq-null": 2, // 禁止对null使用==或!=运算符
    "no-cond-assign": 2, // 禁止在条件表达式中使用赋值语句
    eqeqeq: 2, // 必须使用全等
    "spaced-comment": 2, // 注释风格要不要有空格什么的
    "no-func-assign": 2, // 禁止重复的函数声明
    "arrow-spacing": "error", // 箭头函数前后加空格 () => {}
    "object-curly-spacing": ["error", "always"], // 对象前后要加空格 { a: 1 }
    // 强制属性的顺序
    "vue/attributes-order": "off",
    "vue/order-in-components": [
      "error",
      {
        order: [
          "el",
          "name",
          "key",
          "parent",
          "functional",
          ["delimiters", "comments"],
          ["components", "directives", "filters"],
          "extends",
          "mixins",
          ["provide", "inject"],
          "ROUTER_GUARDS",
          "layout",
          "middleware",
          "validate",
          "scrollToTop",
          "transition",
          "loading",
          "inheritAttrs",
          "model",
          ["props", "propsData"],
          "emits",
          "setup",
          "fetch",
          "asyncData",
          "data",
          "head",
          "computed",
          "watch",
          "watchQuery",
          "LIFECYCLE_HOOKS",
          "methods",
          ["template", "render"],
          "renderError",
        ],
      },
    ],
    "vue/block-tag-newline": [
      "error",
      {
        //  标签直接的换行规范
        singleline: "always",
        multiline: "always",
        maxEmptyLines: 0,
        blocks: {
          script: {
            singleline: "always",
            multiline: "always",
            maxEmptyLines: 0,
          },
          template: {
            singleline: "always",
            multiline: "always",
            maxEmptyLines: 0,
          },
          "my-block": {
            singleline: "always",
            multiline: "always",
            maxEmptyLines: 0,
          },
        },
      },
    ],
    // 不允许重复的keys
    "vue/no-dupe-keys": "error", // 保证 v-bind:key 和 v-for 指令成对出现
    "vue/require-v-for-key": "error", // 检查默认的prop值是否有效
    "vue/require-valid-default-prop": "error", // 不允许重复的attributes
    "vue/no-duplicate-attributes": "warn",
    // 强制校验 template 根节点
    "vue/valid-template-root": "error",
    // 强制校验 v-bind 指令
    "vue/valid-v-bind": "error",
    // 强制校验 v-cloak 指令
    "vue/valid-v-cloak": "error",
    // 强制校验 v-else-if 指令
    "vue/valid-v-else-if": "error",
    // 强制校验 v-else 指令
    "vue/valid-v-else": "error",
    // 强制校验 v-for 指令
    "vue/valid-v-for": "error",
    // 强制校验 v-html 指令
    "vue/valid-v-html": "error",
    // 强制校验 v-if 指令
    "vue/valid-v-if": "error",
    // 强制校验 v-model 指令
    "vue/valid-v-model": "error",
    // 强制校验 v-on 指令
    "vue/valid-v-on": "error",
    // 强制校验 v-once 指令
    "vue/valid-v-once": "error",
    // 强制校验 v-pre 指令
    "vue/valid-v-pre": "error",
    // 强制校验 v-show 指令
    "vue/valid-v-show": "error",
    // 强制校验 v-text 指令
    "vue/valid-v-text": "error",
  },
  parserOptions: {
    parser: "@babel/eslint-parser", // 解析器
  },
};
