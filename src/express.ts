import { isDigit, isOperator, isPriorityOp, Operator, opMap, Token, toNumber } from './helper'

export default class Express {
  value = 0
  unit = 100
  operator?: Operator
  tokens = [] as Token[]
  constructor(unit = 100) {
    this.unit = unit
  }
  op(token: number | string): Express {
    const { value, operator, unit } = this

    // operator
    if (isOperator(token)) {
      this.operator = token
      this.tokens.push(token)
    }
    // digit
    else if (isDigit(token)) {
      if (operator === undefined) {
        this.value = toNumber(token)
        this.tokens.push(this.value)
      } else {
        const op = opMap[operator]
        const otherValue = toNumber(token)
        const base = isPriorityOp(operator) ? op(unit, unit) : unit
        this.value = op(value * unit, otherValue * unit) / base
        this.tokens.push(token)
        delete this.operator
      }
      return this
    }
    return this
  }
  toString(): string {
    return this.value.toString()
  }
  valueOf(): number {
    return this.value
  }
}
