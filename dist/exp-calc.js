"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expCalc = void 0;
var helper_1 = require("./helper");
var formula_1 = __importDefault(require("./formula"));
var parser_1 = __importDefault(require("./parser"));
/**
 * expression calculate
 */
var expCalc = function (exp, unit) {
    if (unit === void 0) { unit = 100; }
    if (!helper_1.hasOperator(exp)) {
        if (helper_1.isDigit(exp)) {
            return helper_1.toNumber(exp);
        }
        return NaN;
    }
    var tokens = parser_1.default(exp);
    var i = 0;
    var groupStart = NaN;
    while (i < tokens.length) {
        var op = tokens[i];
        var ops = [tokens[i - 2], tokens[i - 1], op];
        var isPriorityFormula = helper_1.isPriorityOp(ops[1]) && helper_1.isFormula.apply(void 0, ops);
        if (helper_1.isGroupStartOp(op)) {
            groupStart = i;
        }
        else if (helper_1.isGroupEndOp(op)) {
            var subExp = tokens.slice(groupStart + 1, i).join('');
            var subExpLength = i - groupStart + 1;
            var subExpResult = exports.expCalc(subExp);
            tokens.splice(groupStart, subExpLength, subExpResult);
            i -= subExpLength;
            groupStart = NaN;
        }
        else if (isPriorityFormula) {
            var exp_1 = ops.reduce(function (acc, op) { return acc.op(op); }, new formula_1.default(unit));
            tokens.splice(i - 2, 3, exp_1.value);
            i -= 2;
        }
        i += 1;
    }
    return tokens.reduce(function (acc, str) { return acc.op(str); }, new formula_1.default(unit)).value;
};
exports.expCalc = expCalc;
exports.default = exports.expCalc;
//# sourceMappingURL=exp-calc.js.map