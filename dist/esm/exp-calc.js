import { hasOperator, isDigit, isFormula, isPriorityOp, toNumber, isGroupStartOp, isGroupEndOp } from './helper';
import Formula from './formula';
import parser from './parser';
/**
 * expression calculate
 */
export var expCalc = function (exp, unit) {
    if (unit === void 0) { unit = 100; }
    if (!hasOperator(exp)) {
        if (isDigit(exp)) {
            return toNumber(exp);
        }
        return NaN;
    }
    var tokens = parser(exp);
    var i = 0;
    var groupStart = NaN;
    while (i < tokens.length) {
        var op = tokens[i];
        var ops = [tokens[i - 2], tokens[i - 1], op];
        var isPriorityFormula = isPriorityOp(ops[1]) && isFormula.apply(void 0, ops);
        if (isGroupStartOp(op)) {
            groupStart = i;
        }
        else if (isGroupEndOp(op)) {
            var subExp = tokens.slice(groupStart + 1, i).join('');
            var subExpLength = i - groupStart + 1;
            var subExpResult = expCalc(subExp);
            tokens.splice(groupStart, subExpLength, subExpResult);
            i -= subExpLength;
            groupStart = NaN;
        }
        else if (isPriorityFormula) {
            var exp_1 = ops.reduce(function (acc, op) { return acc.op(op); }, new Formula(unit));
            tokens.splice(i - 2, 3, exp_1.value);
            i -= 2;
        }
        i += 1;
    }
    return tokens.reduce(function (acc, str) { return acc.op(str); }, new Formula(unit)).value;
};
export default expCalc;
