import { Operator, Token } from './helper';
export default class Formula {
    value: number;
    unit: number;
    operator?: Operator;
    tokens: Token[];
    constructor(unit?: number);
    op(token: number | string): Formula;
    toString(): string;
    valueOf(): number;
}
