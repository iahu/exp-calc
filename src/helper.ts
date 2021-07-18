/**
 * 校验字符串是否为合法的数字
 * 如果是，返回数字化的字符串
 * 否则返回空字符串
 */
export const normalize = (value: string, warn = true): string => {
  const trueValue = value.trim()
  if (trueValue === '') return value

  let dotCount = 0
  const digit = trueValue.replace(/\./g, (str: string) => {
    dotCount += 1
    return dotCount === 1 ? str : ''
  })
  const number = Number(digit)

  if (!isNaN(number)) {
    return number.toString()
  }
  if (warn) {
    console.warn(`${trueValue} is not a Number`)
  }
  return ''
}

export type Token = string | number

export const toNumber = (value: Token, warn = true): number => Number(normalize(value.toString(), warn))

export const isString = (v: unknown): v is string => typeof v === 'string'
export const isNumber = (v: unknown): v is number => typeof v === 'number' && !isNaN(v)
export const isDigit = (v: unknown): boolean =>
  isNumber(v) || (isString(v) && v !== '' && toNumber(v, false) === Number(v))
export const add = (a: number, b: number): number => a + b
export const subtraction = (a: number, b: number): number => a - b
export const multiplication = (a: number, b: number): number => a * b
export const division = (a: number, b: number): number => a / b
export const unGroup = (a: '(', b: number): number => b

export const opMap = {
  '+': add,
  '-': subtraction,
  '*': multiplication,
  '/': division,
}

export type Operator = keyof typeof opMap
const operators = Object.keys(opMap)
export const isOperator = (s: Token): s is Operator => isString(s) && operators.includes(s)
export const hasOperator = (str: Token): boolean => isString(str) && !!str.match(/[+\-*/]/)

const priorityOps = ['*', '/']
export const isPriorityOp = (op: Token): boolean => isString(op) && priorityOps.includes(op)

const groupOps = ['(', ')']
export const isGroupStartOp = (op: Token): boolean => groupOps[0] == op
export const isGroupEndOp = (op: Token): boolean => groupOps[1] == op
export const isGroupOp = (op: Token): boolean => isString(op) && groupOps.includes(op)

export const isFormula = (op1: Token, op2: Token, op3: Token): boolean =>
  isOperator(op2) && isDigit(op1) && isDigit(op3)
