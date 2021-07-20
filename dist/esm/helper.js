/**
 * 校验字符串是否为合法的数字
 * 如果是，返回数字化的字符串
 * 否则返回空字符串
 */
export var normalize = function (value, warn) {
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
export var toNumber = function (value, warn) {
    if (warn === void 0) { warn = true; }
    return Number(normalize(value.toString(), warn));
};
export var isString = function (v) { return typeof v === 'string'; };
export var isNumber = function (v) { return typeof v === 'number' && !isNaN(v); };
export var isDigit = function (v) {
    return isNumber(v) || (isString(v) && v !== '' && toNumber(v, false) === Number(v));
};
export var add = function (a, b) { return a + b; };
export var subtraction = function (a, b) { return a - b; };
export var multiplication = function (a, b) { return a * b; };
export var division = function (a, b) { return a / b; };
export var unGroup = function (a, b) { return b; };
export var opMap = {
    '+': add,
    '-': subtraction,
    '*': multiplication,
    '/': division,
};
var operators = Object.keys(opMap);
export var isOperator = function (s) { return isString(s) && operators.includes(s); };
export var hasOperator = function (str) { return isString(str) && !!str.match(/[+\-*/]/); };
var priorityOps = ['*', '/'];
export var isPriorityOp = function (op) { return isString(op) && priorityOps.includes(op); };
var groupOps = ['(', ')'];
export var isGroupStartOp = function (op) { return groupOps[0] == op; };
export var isGroupEndOp = function (op) { return groupOps[1] == op; };
export var isGroupOp = function (op) { return isString(op) && groupOps.includes(op); };
export var isFormula = function (op1, op2, op3) {
    return isOperator(op2) && isDigit(op1) && isDigit(op3);
};
