"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("./helper");
var serialize = function (exp) {
    return exp
        .trim()
        .replace(/([+\-*/])/g, ' $1 ')
        .split(/\s+/g);
};
var validate = function (tokens) {
    var valid = tokens.reduce(function (acc, op) {
        if (helper_1.isOperator(op))
            return (acc -= 1);
        if (helper_1.isNumber(helper_1.toNumber(op)))
            return (acc += 1);
        throw Error("unknown operator: " + op);
    }, 0);
    return valid === 1;
};
var parser = function (exp) {
    if (!helper_1.hasOperator(exp))
        return [helper_1.normalize(exp)];
    var tokens = serialize(exp);
    if (!validate(tokens)) {
        throw Error("Expression Error: " + exp + " not a accepted expression.");
    }
    return tokens;
};
exports.default = parser;
