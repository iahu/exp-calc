import { isDigit, isOperator, isPriorityOp, opMap, toNumber } from './helper';
var Formula = /** @class */ (function () {
    function Formula(unit) {
        if (unit === void 0) { unit = 100; }
        this.value = 0;
        this.unit = 100;
        this.tokens = [];
        this.unit = unit;
    }
    Formula.prototype.op = function (token) {
        var _a = this, value = _a.value, operator = _a.operator, unit = _a.unit;
        // operator
        if (isOperator(token)) {
            this.operator = token;
            this.tokens.push(token);
        }
        // digit
        else if (isDigit(token)) {
            if (operator === undefined) {
                this.value = toNumber(token);
                this.tokens.push(this.value);
            }
            else {
                var op = opMap[operator];
                var otherValue = toNumber(token);
                var base = isPriorityOp(operator) ? op(unit, unit) : unit;
                this.value = op(value * unit, otherValue * unit) / base;
                this.tokens.push(token);
                delete this.operator;
            }
            return this;
        }
        else {
            throw Error("illegal token: \"" + token + "\"");
        }
        return this;
    };
    Formula.prototype.toString = function () {
        return this.value.toString();
    };
    Formula.prototype.valueOf = function () {
        return this.value;
    };
    return Formula;
}());
export default Formula;
