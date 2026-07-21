const js = require("@eslint/js");
const globals = require("globals");
const importPlugin = require("eslint-plugin-import");

module.exports = [
    js.configs.recommended,

    {
        files: ["src/**/*.js"],

        plugins: {
            import: importPlugin
        },

        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "commonjs",

            globals: {
                ...globals.node
            }
        },

        rules: {
            "no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_"
                }
            ],

            "no-unreachable": "error",
            "no-undef": "error",
            "no-empty": "warn",

            "import/no-unresolved": "error"
        },

        settings: {
            "import/resolver": {
                node: {
                    extensions: [".js", ".json"]
                }
            }
        }
    }
];