import { hasOperator, isDigit, isFormula, isOperator, isPriorityOp, Operator, opMap, Token, toNumber } from './helper'
import parser from './parser'

export class Express {
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

/**
 * expression calcute
 */
const expCalc = (value: string, unit = 100): number => {
  if (!hasOperator(value)) {
    return toNumber(value)
  }

  const tokens = parser(value) as Token[]
  let i = 0
  while (i < tokens.length) {
    const ops = [tokens[i - 2], tokens[i - 1], tokens[i]] as const
    const isPriorityFormula = isPriorityOp(ops[1]) && isFormula(...ops)

    // a*b or a/b
    if (isPriorityFormula) {
      const exp = ops.reduce((acc, op) => acc.op(op), new Express(unit))
      tokens.splice(i - 2, 3, exp.value)
    }
    i = i + Math.pow(-1, Number(isPriorityFormula))
  }

  return tokens.reduce((acc, str) => acc.op(str), new Express(unit)).value
}

export default expCalc
