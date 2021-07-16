"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFormula = exports.isGroupOp = exports.isGroupEndOp = exports.isGroupStartOp = exports.isPriorityOp = exports.hasOperator = exports.isOperator = exports.opMap = exports.division = exports.multiplication = exports.subtraction = exports.add = exports.isDigit = exports.isNumber = exports.isString = exports.toNumber = exports.normalize = void 0;
/**
 * 校验字符串是否为合法的数字
 * 如果是，返回数字化的字符串
 * 否则返回空字符串
 */
var normalize = function (value, warn) {
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
exports.normalize = normalize;
var toNumber = function (value, warn) {
    if (warn === void 0) { warn = true; }
    return Number(exports.normalize(value.toString(), warn));
};
exports.toNumber = toNumber;
var isString = function (v) { return typeof v === 'string'; };
exports.isString = isString;
var isNumber = function (v) { return typeof v === 'number' && !isNaN(v); };
exports.isNumber = isNumber;
var isDigit = function (v) { return exports.isNumber(v) || (exports.isString(v) && v !== '' && exports.toNumber(v) === Number(v)); };
exports.isDigit = isDigit;
var add = function (a, b) { return a + b; };
exports.add = add;
var subtraction = function (a, b) { return a - b; };
exports.subtraction = subtraction;
var multiplication = function (a, b) { return a * b; };
exports.multiplication = multiplication;
var division = function (a, b) { return a / b; };
exports.division = division;
exports.opMap = {
    '+': exports.add,
    '-': exports.subtraction,
    '*': exports.multiplication,
    '/': exports.division,
};
var operators = Object.keys(exports.opMap);
var isOperator = function (s) { return exports.isString(s) && operators.includes(s); };
exports.isOperator = isOperator;
var hasOperator = function (str) { return exports.isString(str) && !!str.match(/[+\-*/]/); };
exports.hasOperator = hasOperator;
var priorityOps = ['*', '/'];
var isPriorityOp = function (op) { return exports.isString(op) && priorityOps.includes(op); };
exports.isPriorityOp = isPriorityOp;
var groupOps = ['(', ')'];
var isGroupStartOp = function (op) { return groupOps[0] == op; };
exports.isGroupStartOp = isGroupStartOp;
var isGroupEndOp = function (op) { return groupOps[1] == op; };
exports.isGroupEndOp = isGroupEndOp;
var isGroupOp = function (op) { return exports.isString(op) && groupOps.includes(op); };
exports.isGroupOp = isGroupOp;
var isFormula = function (op1, op2, op3) {
    return exports.isOperator(op2) && exports.isDigit(op1) && exports.isDigit(op3);
};
exports.isFormula = isFormula;
