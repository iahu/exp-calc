"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("./helper");
var serialize = function (exp) {
    return exp
        .trim()
        .replace(/([+\-*/\(\)])/g, ' $1 ')
        .split(/\s+/g)
        .filter(function (v) { return v !== ''; });
};
var validate = function (tokens) {
    var valid = tokens.reduce(function (acc, op) {
        if (op === '')
            return acc;
        if (helper_1.isDigit(op))
            return (acc += 1);
        if (helper_1.isGroupStartOp(op))
            return (acc += 1);
        if (helper_1.isGroupEndOp(op))
            return (acc -= 1);
        if (helper_1.isOperator(op))
            return (acc -= 1);
        throw Error("unknown operator: " + op);
    }, 0);
    return valid === 1;
};
var parser = function (exp) {
    if (!helper_1.hasOperator(exp))
        return [helper_1.normalize(exp)];
    var tokens = serialize(exp);
    if (!validate(tokens)) {
        var err = "Expression Error: " + exp + " not a accepted expression.";
        throw Error(err);
    }
    return tokens;
};
exports.default = parser;
