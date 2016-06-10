module.exports = {
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  "env": {
    "node": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "prefer-template": "error",
    "semi": [
      "error",
      "always"
    ],
    "no-console": [
      "error",
      {
        "allow": ["log", "warn", "error", "group", "groupEnd"]
      }
    ]
  }
};