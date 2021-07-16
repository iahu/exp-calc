import { hasOperator, isNumber, isOperator, normalize, toNumber } from './helper'

const serialize = (exp: string) => {
  return exp
    .trim()
    .replace(/([+\-*/])/g, ' $1 ')
    .split(/\s+/g)
}

const validate = (tokens: string[]) => {
  const valid = tokens.reduce((acc, op) => {
    if (isOperator(op)) return (acc -= 1)
    if (isNumber(toNumber(op))) return (acc += 1)

    throw Error(`unknown operator: ${op}`)
  }, 0)

  return valid === 1
}

const parser = (exp: string): string[] => {
  if (!hasOperator(exp)) return [normalize(exp)]

  const tokens = serialize(exp)
  if (!validate(tokens)) {
    throw Error(`Expression Error: ${exp} not a accepted expression.`)
  }

  return tokens
}

export default parser
