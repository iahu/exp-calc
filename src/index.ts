/**
 * 校验字符串是否为合法的数字
 * 如果是，返回数字化的字符串
 * 否则返回空字符串
 * @type {[type]}
 */
export const normalize = (value: string): string => {
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
  console.warn(`${trueValue} is not a Number`)
  return ''
}

const operators = ['+', '-', '*', '/'] as const
type Operator = typeof operators[number]
export const isOperator = (s: string): s is Operator => operators.includes(s as Operator)

export const isNumber = <T = unknown>(v: T): boolean => typeof v === 'number' && !isNaN(v)
export const add = (a: number, b: number): number => a + b
export const subtraction = (a: number, b: number): number => a - b
export const multiplication = (a: number, b: number): number => a * b
export const division = (a: number, b: number): number => a / b

const opMap = {
  '+': add,
  '-': subtraction,
  '*': multiplication,
  '/': division,
}

export class Express {
  value: number
  operator: Operator = '+'
  constructor(value = 0) {
    this.value = value
  }

  unit = 100

  op(otherValue: number): Express {
    const { value, operator } = this
    if (!isNumber(value)) {
      throw new Error(`Expression Error: ${value} is not a number`)
    }
    if (!isNumber(otherValue)) {
      throw new Error(`Expression Error: ${otherValue} is not a number`)
    }
    if (isNumber(value) && isNumber(otherValue) && operator) {
      const { unit } = this
      this.value = opMap[operator]?.(value * unit, otherValue * unit) / unit
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

export const hasOperator = (str: string): boolean => !!str.match(/[+\-*/]/)

/**
 * expression calcute
 */

const expCalc = (value: string): string => {
  const expressions = value
    .trim()
    .replace(/([+\-*/])/g, ' $1 ')
    .split(/\s*[+\-*/]\s*/g)

  if (!hasOperator(value)) {
    return normalize(value)
  }

  const exp = expressions.reduce((acc, str) => {
    const normalizedValue = normalize(str)
    const num = Number(normalizedValue)
    if (isNumber(num)) {
      acc.op(num)
    } else if (isOperator(str)) {
      acc.operator = str
    }
    return acc
  }, new Express(0))

  return exp.toString()
}

export default expCalc
