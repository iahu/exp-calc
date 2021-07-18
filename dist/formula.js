"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("./helper");
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
exports.default = Formula;
//# sourceMappingURL=formula.js.map