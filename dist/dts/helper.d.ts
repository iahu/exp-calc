/**
 * 校验字符串是否为合法的数字
 * 如果是，返回数字化的字符串
 * 否则返回空字符串
 */
export declare const normalize: (value: string, warn?: boolean) => string;
export declare type Token = string | number;
export declare const toNumber: (value: Token, warn?: boolean) => number;
export declare const isString: (v: unknown) => v is string;
export declare const isNumber: (v: unknown) => v is number;
export declare const isDigit: (v: unknown) => boolean;
export declare const add: (a: number, b: number) => number;
export declare const subtraction: (a: number, b: number) => number;
export declare const multiplication: (a: number, b: number) => number;
export declare const division: (a: number, b: number) => number;
export declare const unGroup: (a: '(', b: number) => number;
export declare const opMap: {
    '+': (a: number, b: number) => number;
    '-': (a: number, b: number) => number;
    '*': (a: number, b: number) => number;
    '/': (a: number, b: number) => number;
};
export declare type Operator = keyof typeof opMap;
export declare const isOperator: (s: Token) => s is "+" | "-" | "*" | "/";
export declare const hasOperator: (str: Token) => boolean;
export declare const isPriorityOp: (op: Token) => boolean;
export declare const isGroupStartOp: (op: Token) => boolean;
export declare const isGroupEndOp: (op: Token) => boolean;
export declare const isGroupOp: (op: Token) => boolean;
export declare const isFormula: (op1: Token, op2: Token, op3: Token) => boolean;
