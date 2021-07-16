import { Operator, Token } from './helper';
export declare class Express {
    value: number;
    unit: number;
    operator?: Operator;
    tokens: Token[];
    constructor(unit?: number);
    op(token: number | string): Express;
    toString(): string;
    valueOf(): number;
}
/**
 * expression calcute
 */
declare const expCalc: (value: string, unit?: number) => number;
export default expCalc;
