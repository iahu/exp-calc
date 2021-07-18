import parser from '../src/parser'

describe('parser', function () {
  test('可以不包含运算符', function () {
    expect(parser('')).toEqual([''])
    expect(parser('1')).toEqual(['1'])
    expect(parser('1.2')).toEqual(['1.2'])
    expect(parser('-1.2')).toEqual(['-1.2'])
    expect(parser('1 1')).toEqual([''])
  })

  test('正数包括多个小数点只保留第一个', function () {
    expect(parser('1.0.0.0')).toEqual(['1'])
    expect(parser('1.2.3')).toEqual(['1.23'])
  })

  test('正数以小数点开头会转成 0.x', function () {
    expect(parser('.1')).toEqual(['0.1'])
    expect(parser('.1.2.3')).toEqual(['0.123'])
  })

  test('可分离数字与运算符', function () {
    expect(parser('1+2')).toEqual(['1', '+', '2'])
    expect(parser('1-2')).toEqual(['1', '-', '2'])
    expect(parser('1*2')).toEqual(['1', '*', '2'])
    expect(parser('1/2')).toEqual(['1', '/', '2'])

    expect(parser('-1+2')).toEqual(['-1', '+', '2'])
    expect(parser('1+-2')).toEqual(['1', '+', '-2'])
    expect(parser('1++2')).toEqual(['1', '+', '+2'])
    expect(parser('1-+2')).toEqual(['1', '-', '+2'])
    expect(parser('1*-2')).toEqual(['1', '*', '-2'])
    expect(parser('1/-2')).toEqual(['1', '/', '-2'])
    expect(parser('1*+2')).toEqual(['1', '*', '+2'])
    expect(parser('1/+2')).toEqual(['1', '/', '+2'])
    expect(parser('1+1+-2')).toEqual(['1', '+', '1', '+', '-2'])

    expect(() => parser('1+1++-2')).toThrowError()
    expect(() => parser('a+b')).toThrowError()
    expect(() => parser('1+2+')).toThrowError()
  })

  test('可用空格进行格式化', function () {
    expect(parser('1 + 2')).toEqual(['1', '+', '2'])
    expect(parser('1 - 2')).toEqual(['1', '-', '2'])
    expect(parser('1 * 2')).toEqual(['1', '*', '2'])
    expect(parser('1 / 2')).toEqual(['1', '/', '2'])
  })

  test('可识别小数点', function () {
    expect(parser('1.0+2.000')).toEqual(['1.0', '+', '2.000'])
    expect(parser('1.23+2.34')).toEqual(['1.23', '+', '2.34'])
  })

  test('可识别连续多个运算符表达式', function () {
    expect(parser('1+2-4*5-6')).toEqual(['1', '+', '2', '-', '4', '*', '5', '-', '6'])
  })

  test('可识别出小括号', function () {
    expect(parser('(1+2)-4*(5-6)')).toEqual(['(', '1', '+', '2', ')', '-', '4', '*', '(', '5', '-', '6', ')'])
    expect(() => parser('((1+2)')).toThrow()
    expect(() => parser('(1+2))')).toThrow()
  })
})
