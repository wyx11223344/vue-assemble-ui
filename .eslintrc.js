module.exports = {
    root: true,
    env: {
        es6: true
    },
    'plugins': ['@typescript-eslint'],
    'extends': [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/typescript/recommended'
    // 'plugin:@typescript-eslint/recommended'
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020
    },
    rules: {
        '@typescript-eslint/no-explicit-any': 0,
        'vue/max-attributes-per-line': [
            2,
            {
                singleline: 12,
                multiline: {
                    max: 1,
                    allowFirstLine: false
                }
            }
        ],
        'vue/singleline-html-element-content-newline': 'off',
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'never',
                    component: 'any'
                },
                svg: 'any',
                math: 'any'
            }
        ],
        'vue/multiline-html-element-content-newline': 'off',
        'vue/name-property-casing': ['error', 'PascalCase'],
        'vue/no-v-html': 'off',
        'vue/html-indent': ['error', 4, { baseIndent: 1 }],
        'vue/script-indent': ['error', 4, { baseIndent: 0 }],
        'accessor-pairs': 2,
        'arrow-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],
        'block-spacing': [2, 'always'],
        'brace-style': [
            2,
            '1tbs',
            {
                allowSingleLine: true
            }
        ],
        camelcase: [
            0,
            {
                properties: 'always'
            }
        ],
        'comma-dangle': [2, 'never'],
        'comma-spacing': [
            2,
            {
                before: false,
                after: true
            }
        ],
        'comma-style': [2, 'last'],
        'constructor-super': 2,
        curly: [2, 'multi-line'],
        'dot-location': [2, 'property'],
        'eol-last': 2,
        eqeqeq: ['error', 'always', { null: 'ignore' }],
        'generator-star-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],
        'handle-callback-err': [2, '^(err|error)$'],
        'jsx-quotes': [2, 'prefer-single'],
        'key-spacing': [
            2,
            {
                beforeColon: false,
                afterColon: true
            }
        ],
        'keyword-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],
        'new-cap': [
            2,
            {
                newIsCap: true,
                capIsNew: false
            }
        ],
        'new-parens': 2,
        'no-array-constructor': 2,
        'no-caller': 2,
        'no-console': 'off',
        'no-class-assign': 2,
        'no-cond-assign': 2,
        'no-const-assign': 2,
        'no-control-regex': 0,
        'no-delete-var': 2,
        'no-dupe-args': 2,
        'no-dupe-class-members': 2,
        'no-dupe-keys': 2,
        'no-duplicate-case': 2,
        'no-empty-character-class': 2,
        'no-empty-pattern': 2,
        // 'no-eval': 2,
        'no-ex-assign': 2,
        'no-extend-native': 2,
        'no-extra-bind': 2,
        'no-extra-boolean-cast': 2,
        'no-extra-parens': [2, 'functions'],
        'no-fallthrough': 2,
        'no-floating-decimal': 2,
        'no-func-assign': 2,
        'no-implied-eval': 2,
        'no-inner-declarations': [2, 'functions'],
        'no-invalid-regexp': 2,
        'no-irregular-whitespace': 2,
        'no-iterator': 2,
        'no-label-var': 2,
        'no-labels': [
            2,
            {
                allowLoop: false,
                allowSwitch: false
            }
        ],
        'no-lone-blocks': 2,
        'no-mixed-spaces-and-tabs': 2,
        'no-multi-spaces': 2,
        'no-multi-str': 2,
        'no-multiple-empty-lines': [
            2,
            {
                max: 1
            }
        ],
        'no-native-reassign': 2,
        'no-negated-in-lhs': 2,
        'no-new-object': 2,
        'no-new-require': 2,
        'no-new-symbol': 2,
        'no-new-wrappers': 2,
        'no-obj-calls': 2,
        'no-octal': 2,
        'no-octal-escape': 2,
        'no-path-concat': 2,
        'no-proto': 2,
        'no-redeclare': 2,
        'no-regex-spaces': 2,
        'no-return-assign': [2, 'except-parens'],
        'no-self-assign': 2,
        'no-self-compare': 2,
        'no-sequences': 2,
        'no-shadow-restricted-names': 2,
        'no-spaced-func': 2,
        'no-sparse-arrays': 2,
        'no-this-before-super': 2,
        'no-throw-literal': 2,
        'no-trailing-spaces': 2,
        'no-undef': 2,
        'no-undef-init': 2,
        'no-unexpected-multiline': 2,
        'no-unmodified-loop-condition': 2,
        'no-unneeded-ternary': [
            2,
            {
                defaultAssignment: false
            }
        ],
        'no-unreachable': 2,
        'no-unsafe-finally': 2,
        'no-unused-vars': [
            2,
            {
                vars: 'all',
                args: 'none'
            }
        ],
        'no-useless-call': 2,
        'no-useless-computed-key': 2,
        'no-useless-constructor': 2,
        'no-useless-escape': 0,
        'no-whitespace-before-property': 2,
        'no-with': 2,
        'one-var': [
            2,
            {
                initialized: 'never'
            }
        ],
        'operator-linebreak': [
            2,
            'after',
            {
                overrides: {
                    '?': 'before',
                    ':': 'before'
                }
            }
        ],
        'padded-blocks': [2, 'never'],
        quotes: [
            2,
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true
            }
        ],
        semi: [2, 'always'],
        'semi-spacing': [
            2,
            {
                before: false,
                after: true
            }
        ],
        'space-before-blocks': [2, 'always'],
        'space-before-function-paren': [2, 'never'],
        'space-in-parens': [2, 'never'],
        'space-infix-ops': 2,
        'space-unary-ops': [
            2,
            {
                words: true,
                nonwords: false
            }
        ],
        'spaced-comment': [
            2,
            'always',
            {
                markers: ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
            }
        ],
        'template-curly-spacing': [2, 'never'],
        'use-isnan': 2,
        'valid-typeof': 2,
        'wrap-iife': [2, 'any'],
        'yield-star-spacing': [2, 'both'],
        yoda: [2, 'never'],
        'prefer-const': 2,
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'object-curly-spacing': [
            2,
            'always',
            {
                objectsInObjects: false
            }
        ],
        'array-bracket-spacing': [2, 'never'],
        // 禁止空语句块
        'no-empty': 2,
        // 禁止不必要的分号
        'no-extra-semi': 2,
        // 禁止直接使用 Object.prototypes 的内置属性
        'no-prototype-builtins': 0,
        // ////////////
        // 最佳实践 //
        // ////////////
        // 强制数组方法的回调函数中有 return 语句
        'array-callback-return': 0,
        // 强制把变量的使用限制在其定义的作用域范围内
        'block-scoped-var': 2,
        // 限制圈复杂度，也就是类似if else能连续接多少个
        // "complexity": [2, 9],
        // 要求 return 语句要么总是指定返回的值，要么不指定
        'consistent-return': 0,
        // 不允许在 case 子句中使用词法声明
        'no-case-declarations': 2,
        // 禁止出现空函数.如果一个函数包含了一条注释，它将不会被认为有问题。
        'no-empty-function': 2,
        // 禁止在没有类型检查操作符的情况下与 null 进行比较
        'no-eq-null': 1,
        // 禁用 eval()
        'no-eval': 0,
        // 禁用不必要的标签
        'no-extra-label:': 0,
        // 禁止使用短符号进行类型转换(!!fOO)
        'no-implicit-coercion': 0,
        // 禁止在全局范围内使用 var 和命名的 function 声明
        'no-implicit-globals': 1,
        // 禁止在循环中出现 function 声明和表达式
        'no-loop-func': 1,
        // 禁用魔术数字(3.14什么的用常量代替)
        'no-magic-numbers': [
            0,
            {
                'ignore': [0, -1, 1]
            }
        ],
        // 禁止在非赋值或条件语句中使用 new 操作符
        'no-new': 2,
        // 禁止对 Function 对象使用 new 操作符
        'no-new-func': 0,
        'no-script-url': 0,
        // 禁止不必要的字符串字面量或模板字面量的连接
        'no-useless-concat': 2,
        // 禁用 void 操作符
        'no-void': 0,
        // 禁止在注释中使用特定的警告术语
        'no-warning-comments': 0,
        // 强制在parseInt()使用基数参数
        'radix': 0,
        // 要求所有的 var 声明出现在它们所在的作用域顶部
        'vars-on-top': 0,
        // 不允许在变量定义之前使用它们
        'no-use-before-define': 0,
        // "SwitchCase" (默认：0) 强制 switch 语句中的 case 子句的缩进水平
        // 以方括号取对象属性时，[ 后面和 ] 前面是否需要空格, 可选参数 never, always
        'computed-property-spacing': [2, 'never'],
        // 强制使用命名的 function 表达式
        'func-names': 0,
        'indent': [
            2,
            4,
            {
                'SwitchCase': 1
            }
        ],
        // 强制使用一致的换行风格
        // "linebreak-style": [1, "unix"],
        // 要求在注释周围有空行 ( 要求在块级注释之前有一空行)
        'lines-around-comment': [
            1,
            {
                'beforeBlockComment': true
            }
        ],
        // 强制回调函数最大嵌套深度 5层
        'max-nested-callbacks': [1, 5],
        // 强制一行的最大长度
        'max-len': 0,
        // 强制最大行数
        'max-lines': 0,
        // 强制 function 块最多允许的的语句数量
        'max-statements': [1, 200],
        // 要求方法链中每个调用都有一个换行符
        'newline-per-chained-call': 0,
        // 禁止使用 Object 的构造函数
        'func-call-spacing': 2,
        // 强制将对象的属性放在不同的行上
        'object-property-newline': 0,
        // 要求对象字面量属性名称用引号括起来
        'quote-props': 0,
        // 要求使用 JSDoc 注释
        'require-jsdoc': [
            0,
            {
                'require': {
                    'FunctionDeclaration': true,
                    'MethodDefinition': true,
                    'ClassDeclaration': false,
                    'ArrowFunctionExpression': true,
                    'FunctionExpression': false
                }
            }
        ],
        // 强制要求注释使用jsdoc类型
        'valid-jsdoc': 2,
        // ////////////
        // ES6.相关 //
        // ////////////
        // 要求箭头函数体使用大括号
        'arrow-body-style': 2,
        // 要求箭头函数的参数使用圆括号
        'arrow-parens': 2,
        // 不允许箭头功能，在那里他们可以混淆的比较
        'no-confusing-arrow': 0,
        // 不允许复制模块的进口
        'no-duplicate-imports': 0,
        // 允许指定模块加载时的进口
        'no-restricted-imports': 0,
        // 要求使用 let 或 const 而不是 var
        'no-var': 0,
        // 要求或禁止对象字面量中方法和属性使用简写语法
        'object-shorthand': 0,
        // 要求使用箭头函数作为回调
        'prefer-arrow-callback': 0,
        // 要求在合适的地方使用 Reflect 方法
        'prefer-reflect': 0,
        // 要求使用扩展运算符而非 .apply()
        'prefer-spread': 0,
        // 要求使用模板字面量而非字符串连接
        'prefer-template': 0,
        // Suggest using the rest parameters instead of arguments
        'prefer-rest-params': 0,
        // 要求generator 函数内有 yield
        'require-yield': 0,
        // enforce spacing between rest and spread operators and their expressions
        'rest-spread-spacing': 0,
        // 强制模块内的 import 排序
        'sort-imports': 0
    },
    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)'
            ],
            env: {
                mocha: true
            }
        }
    ],
    globals: {
        'module': true,
        'process': true
    }
};
