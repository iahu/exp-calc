import { hasOperator, isDigit, isFormula, isPriorityOp, Token, toNumber, isGroupStartOp, isGroupEndOp } from './helper'
import Express from './express'
import parser from './parser'

/**
 * expression calculate
 */
export const expCalc = (exp: string, unit = 100): number => {
  if (!hasOperator(exp)) {
    if (isDigit(exp)) {
      return toNumber(exp)
    }
    return NaN
  }

  const tokens = parser(exp) as Token[]
  let i = 0
  let groupStart = NaN

  while (i < tokens.length) {
    const op = tokens[i]
    const ops = [tokens[i - 2], tokens[i - 1], op] as const
    const isPriorityFormula = isPriorityOp(ops[1]) && isFormula(...ops)

    if (isGroupStartOp(op)) {
      groupStart = i
    } else if (isGroupEndOp(op)) {
      const subExp = tokens.slice(groupStart + 1, i).join('')
      const subExpLength = i - groupStart + 1
      const subExpResult = expCalc(subExp)
      tokens.splice(groupStart, subExpLength, subExpResult)
      i -= subExpLength
      groupStart = NaN
    } else if (isPriorityFormula) {
      const exp = ops.reduce((acc, op) => acc.op(op), new Express(unit))
      tokens.splice(i - 2, 3, exp.value)
      i -= 2
    }
    i += 1
  }

  return tokens.reduce((acc, str) => acc.op(str), new Express(unit)).value
}

export default expCalc
