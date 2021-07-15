/**
 * 校验字符串是否为合法的数字
 * 如果是，返回数字化的字符串
 * 否则返回空字符串
 */
export const normalize = (value: string, warn = true): string => {
  const trueValue = value.trim();
  if (trueValue === '') return value;

  let dotCount = 0;
  const digit = trueValue.replace(/\./g, (str: string) => {
    dotCount += 1;
    return dotCount === 1 ? str : '';
  });
  const number = Number(digit);

  if (!isNaN(number)) {
    return number.toString();
  }
  if (warn) {
    console.warn(`${trueValue} is not a Number`);
  }
  return '';
};

export const toNumber = (value: string, warn = true) => Number(normalize(value, warn));

export const isNumber = <T = unknown>(v: T): boolean => typeof v === 'number' && !isNaN(v);
export const add = (a: number, b: number): number => a + b;
export const subtraction = (a: number, b: number): number => a - b;
export const multiplication = (a: number, b: number): number => a * b;
export const division = (a: number, b: number): number => a / b;

export const opMap = {
  '+': add,
  '-': subtraction,
  '*': multiplication,
  '/': division,
};

export type Operator = keyof typeof opMap;
const operators = Object.keys(opMap);
export const isOperator = (s: string): s is Operator => operators.includes(s);
export const hasOperator = (str: string): boolean => !!str.match(/[+\-*/]/);

const priorityOps = ['*', '/'];
export const isPriorityOp = (op: string) => priorityOps.includes(op);

const groupOps = ['(', ')'];
export const isGroupStartOp = (op: string) => groupOps[0] == op;
export const isGroupEndOp = (op: string) => groupOps[1] == op;
export const isGroupOp = (op: string) => groupOps.includes(op);
