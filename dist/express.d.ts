import { Operator, Token } from './helper';
export default class Express {
    value: number;
    unit: number;
    operator?: Operator;
    tokens: Token[];
    constructor(unit?: number);
    op(token: number | string): Express;
    toString(): string;
    valueOf(): number;
}
