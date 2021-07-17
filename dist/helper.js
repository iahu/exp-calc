"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 校验字符串是否为合法的数字
 * 如果是，返回数字化的字符串
 * 否则返回空字符串
 */
exports.normalize = function (value, warn) {
    if (warn === void 0) { warn = true; }
    var trueValue = value.trim();
    if (trueValue === '')
        return value;
    var dotCount = 0;
    var digit = trueValue.replace(/\./g, function (str) {
        dotCount += 1;
        return dotCount === 1 ? str : '';
    });
    var number = Number(digit);
    if (!isNaN(number)) {
        return number.toString();
    }
    if (warn) {
        console.warn(trueValue + " is not a Number");
    }
    return '';
};
exports.toNumber = function (value, warn) {
    if (warn === void 0) { warn = true; }
    return Number(exports.normalize(value.toString(), warn));
};
exports.isString = function (v) { return typeof v === 'string'; };
exports.isNumber = function (v) { return typeof v === 'number' && !isNaN(v); };
exports.isDigit = function (v) {
    return exports.isNumber(v) || (exports.isString(v) && v !== '' && exports.toNumber(v, false) === Number(v));
};
exports.add = function (a, b) { return a + b; };
exports.subtraction = function (a, b) { return a - b; };
exports.multiplication = function (a, b) { return a * b; };
exports.division = function (a, b) { return a / b; };
exports.unGroup = function (a, b) { return b; };
exports.opMap = {
    '+': exports.add,
    '-': exports.subtraction,
    '*': exports.multiplication,
    '/': exports.division,
};
var operators = Object.keys(exports.opMap);
exports.isOperator = function (s) { return exports.isString(s) && operators.includes(s); };
exports.hasOperator = function (str) { return exports.isString(str) && !!str.match(/[+\-*/]/); };
var priorityOps = ['*', '/'];
exports.isPriorityOp = function (op) { return exports.isString(op) && priorityOps.includes(op); };
var groupOps = ['(', ')'];
exports.isGroupStartOp = function (op) { return groupOps[0] == op; };
exports.isGroupEndOp = function (op) { return groupOps[1] == op; };
exports.isGroupOp = function (op) { return exports.isString(op) && groupOps.includes(op); };
exports.isFormula = function (op1, op2, op3) {
    return exports.isOperator(op2) && exports.isDigit(op1) && exports.isDigit(op3);
};
