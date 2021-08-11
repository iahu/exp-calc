import { hasOperator, isOperator, normalize, isGroupStartOp, isGroupEndOp, isDigit } from './helper'

const serialize = (exp: string) => {
  return (
    exp
      .trim()
      .replace(/([+\-*/]|[()])/g, ' $1 ')
      // safari 不支持 `?<=` 表达式，用两个 replace 弥补一下
      .replace(/([+\-*/]|^)\s+([+-])\s+(\d)/g, '$1 $2$3')
      .trim()
      .split(/\s+/g)
      .filter((v) => v !== '')
  )
}

const validate = (tokens: string[]) => {
  const valid = tokens.reduce((acc, op) => {
    if (op === '') return acc
    if (isDigit(op)) return (acc += 1)
    if (isGroupStartOp(op)) return (acc += 1)
    if (isGroupEndOp(op)) return (acc -= 1)
    if (isOperator(op)) return (acc -= 1)

    throw Error(`unknown operator: ${op}`)
  }, 0)
  return valid === 1
}

const parser = (exp: string): string[] => {
  if (!hasOperator(exp)) return [normalize(exp)]

  const tokens = serialize(exp)
  if (!validate(tokens)) {
    const err = `Expression Error: ${exp} not a accepted expression.`
    throw Error(err)
  }

  return tokens
}

export default parser
