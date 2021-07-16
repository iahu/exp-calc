"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Express = void 0;
var helper_1 = require("./helper");
var parser_1 = __importDefault(require("./parser"));
var Express = /** @class */ (function () {
    function Express(unit) {
        if (unit === void 0) { unit = 100; }
        this.value = 0;
        this.unit = 100;
        this.tokens = [];
        this.unit = unit;
    }
    Express.prototype.op = function (token) {
        var _a = this, value = _a.value, operator = _a.operator, unit = _a.unit;
        // operator
        if (helper_1.isOperator(token)) {
            this.operator = token;
            this.tokens.push(token);
        }
        // digit
        else if (helper_1.isDigit(token)) {
            if (operator === undefined) {
                this.value = helper_1.toNumber(token);
                this.tokens.push(this.value);
            }
            else {
                var op = helper_1.opMap[operator];
                var otherValue = helper_1.toNumber(token);
                var base = helper_1.isPriorityOp(operator) ? op(unit, unit) : unit;
                this.value = op(value * unit, otherValue * unit) / base;
                this.tokens.push(token);
                delete this.operator;
            }
            return this;
        }
        return this;
    };
    Express.prototype.toString = function () {
        return this.value.toString();
    };
    Express.prototype.valueOf = function () {
        return this.value;
    };
    return Express;
}());
exports.Express = Express;
/**
 * expression calcute
 */
var expCalc = function (value, unit) {
    if (unit === void 0) { unit = 100; }
    if (!helper_1.hasOperator(value)) {
        if (helper_1.isDigit(value)) {
            return helper_1.toNumber(value);
        }
        return NaN;
    }
    var tokens = parser_1.default(value);
    var i = 0;
    while (i < tokens.length) {
        var ops = [tokens[i - 2], tokens[i - 1], tokens[i]];
        var isPriorityFormula = helper_1.isPriorityOp(ops[1]) && helper_1.isFormula.apply(void 0, ops);
        // a*b or a/b
        if (isPriorityFormula) {
            var exp = ops.reduce(function (acc, op) { return acc.op(op); }, new Express(unit));
            tokens.splice(i - 2, 3, exp.value);
        }
        i = i + Math.pow(-1, Number(isPriorityFormula));
    }
    return tokens.reduce(function (acc, str) { return acc.op(str); }, new Express(unit)).value;
};
exports.default = expCalc;
