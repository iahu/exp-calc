import Formula from '../src/formula'

describe('formula.op', function () {
  const f = new Formula()
  test('返回 formula', function () {
    expect(f.op('1')).toEqual(f)
  })

  test('可(重复)接受数字和运算符', function () {
    const formula = new Formula()
    expect(() => formula.op('a')).toThrowError('illegal token: "a"')
    expect(() => formula.op(1)).not.toThrow()
    expect(() => formula.op(2.3)).not.toThrow()
    expect(() => formula.op(-3)).not.toThrow()
    expect(() => formula.op(+4)).not.toThrow()
    expect(() => formula.op('+')).not.toThrow()
    expect(() => formula.op('-')).not.toThrow()
    expect(() => formula.op('*')).not.toThrow()
    expect(() => formula.op('/')).not.toThrow()
    expect(() => formula.op('4')).not.toThrow()
    expect(() => formula.op('-5')).not.toThrow()
    expect(() => formula.op('+5')).not.toThrow()
    expect(() => formula.op('6.6')).not.toThrow()
  })

  test('不接受数字运算符之外的字符', function () {
    const formula = new Formula()
    expect(() => formula.op('a')).toThrowError('illegal token: "a"')
    expect(() => formula.op('好')).toThrowError('illegal token: "好"')
    expect(() => formula.op('(')).toThrowError('illegal token: "("')
    expect(() => formula.op('1+')).toThrowError('illegal token: "1+"')
    expect(() => formula.op('+-')).toThrowError('illegal token: "+-"')
  })
})

describe('formula.value', function () {
  test('formula.op 的结果会存到 formula.value', function () {
    const formula = new Formula()

    formula.op(1)
    formula.op('+')
    formula.op(2)
    expect(formula.value).toBe(3)
    expect(formula.value).not.toBe(0)
    expect(formula.value).not.toBe(1)
    expect(formula.value).not.toBe(-1)

    formula.op('-')
    formula.op(4)
    expect(formula.value).toBe(-1)

    formula.op('*')
    formula.op(5)
    expect(formula.value).toBe(-5)

    formula.op('/')
    formula.op(6)
    expect(formula.value).toBe(-5 / 6)

    formula.op(3)
    formula.op('/')
    formula.op(6)
    expect(formula.value).toBe(3 / 6)
  })

  test('formula.valueOf', function () {
    const formula = new Formula()
    formula.op(1)
    expect(formula.value).toBe(1)
    expect(formula.valueOf()).toBe(1)
  })

  test('formula.toString()', function () {
    const formula = new Formula()
    formula.op(1)
    expect(formula.value).toBe(1)
    expect(formula.toString()).toBe('1')
  })
})
