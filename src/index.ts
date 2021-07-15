import { isNumber, toNumber, normalize, Operator, opMap, isOperator, hasOperator } from './helper';

export class Express {
  value: number;
  operator?: Operator;
  constructor(value = 0, unit = 100) {
    this.value = value;
    this.unit = unit;
  }

  unit = 100;

  op(otherValue: number): Express {
    const { value, operator } = this;
    if (!isNumber(value)) {
      const err = `Expression Error: "${value}" is not a number`;
      throw new Error(err);
    }
    if (!isNumber(otherValue)) {
      const err = `Expression Error: "${otherValue}" is not a number`;
      throw new Error(err);
    }
    if (isNumber(value) && isNumber(otherValue) && operator) {
      const { unit } = this;
      this.value = opMap[operator]?.(value * unit, otherValue * unit) / unit;
      delete this.operator;
    }
    return this;
  }

  toString(): string {
    return this.value.toString();
  }
  valueOf(): number {
    return this.value;
  }
}

const parser = (value: string) => {
  return value
    .trim()
    .replace(/([+\-*/])/g, ' $1 ')
    .split(/\s*[+\-*/]\s*/g);
};

/**
 * expression calcute
 */
const expCalc = (value: string, unit = 100): string => {
  const expressions = parser(value);

  if (!hasOperator(value)) {
    return normalize(value);
  }

  const exp = expressions.reduce((acc, str) => {
    const num = toNumber(str);
    if (isNumber(num)) {
      acc.op(num);
    } else if (isOperator(str)) {
      acc.operator = str;
    }
    return acc;
  }, new Express(0, unit));

  return exp.toString();
};

export default expCalc;
