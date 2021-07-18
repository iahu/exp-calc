import expCalc from '../src/exp-calc'

describe('expCalc', function () {
  test('只传数字应该返回此数', function () {
    expect(expCalc('1')).toBe(1)
    expect(expCalc('999')).toBe(999)
    expect(expCalc('-1')).toBe(-1)
  })
  test('只传数字应该返回此数', function () {
    expect(expCalc('')).toBe(NaN)
  })

  test('可运算两个数字与一个运算符的四则运算', function () {
    expect(expCalc('1+2')).toEqual(3)
    expect(expCalc('1-2')).toEqual(-1)
    expect(expCalc('1*2')).toEqual(2)
    expect(expCalc('1/2')).toEqual(0.5)
  })

  test('支持小数', function () {
    expect(expCalc('0.1+0.2')).toEqual(0.3)
    expect(expCalc('1-0.1')).toEqual(0.9)
    expect(expCalc('1-0.01')).toEqual(0.99)
    expect(expCalc('1-0.001', 1000)).toEqual(0.999)
    expect(expCalc('1-0.0001', 10000)).toEqual(0.9999)
  })

  test('支持负数数字', function () {
    expect(expCalc('-1-2')).toEqual(-3)
    expect(expCalc('1+-2')).toEqual(-1)
    expect(expCalc('-1+-2')).toEqual(-3)
  })

  test('乘除法优先', function () {
    expect(expCalc('1+2*3')).toEqual(7)
    expect(expCalc('1+2/2')).toEqual(2)
    expect(expCalc('1+2/2-1')).toEqual(1)
    expect(expCalc('1+2*3-1')).toEqual(6)
    expect(expCalc('1+2*4/2+1-2')).toEqual(4)
  })

  test('小括号优先', function () {
    expect(expCalc('(1+2)*3')).toEqual(9)
    expect(expCalc('(1+2)/2')).toEqual(3 / 2)
    expect(expCalc('1+2/(2-1)')).toEqual(3)
    expect(expCalc('1+(2*3+1)-1')).toEqual(7)
    expect(expCalc('1+2*(4/2+1)-2')).toEqual(5)
  })
})
