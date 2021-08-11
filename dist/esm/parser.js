import { hasOperator, isOperator, normalize, isGroupStartOp, isGroupEndOp, isDigit } from './helper';
var serialize = function (exp) {
    return (exp
        .trim()
        .replace(/([+\-*/]|[()])/g, ' $1 ')
        // safari 不支持 `?<=` 表达式，用两个 replace 弥补一下
        .replace(/([+\-*/]|^)\s+([+-])\s+(\d)/g, '$1 $2$3')
        .trim()
        .split(/\s+/g)
        .filter(function (v) { return v !== ''; }));
};
var validate = function (tokens) {
    var valid = tokens.reduce(function (acc, op) {
        if (op === '')
            return acc;
        if (isDigit(op))
            return (acc += 1);
        if (isGroupStartOp(op))
            return (acc += 1);
        if (isGroupEndOp(op))
            return (acc -= 1);
        if (isOperator(op))
            return (acc -= 1);
        throw Error("unknown operator: " + op);
    }, 0);
    return valid === 1;
};
var parser = function (exp) {
    if (!hasOperator(exp))
        return [normalize(exp)];
    var tokens = serialize(exp);
    if (!validate(tokens)) {
        var err = "Expression Error: " + exp + " not a accepted expression.";
        throw Error(err);
    }
    return tokens;
};
export default parser;
