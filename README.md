# expCalc.js

![Build Status](https://travis-ci.com/iahu/exp-calc.svg?branch=master&status=started)
[![codecov](https://codecov.io/gh/iahu/exp-calc/branch/master/graph/badge.svg?token=2NOW2ZITTH)](https://codecov.io/gh/iahu/exp-calc)

JavaScript 四则运算库

## Install

```sh
yarn add https://github.com/iahu/exp-calc.git
```

## Examples

```ts
import expCalc from 'exp-calc'

expCalc('1 + 2') // 3 简单运算，运算符之间空格可有可无
expCalc('1 + 2 * 3 / 4 - 5') // -2.5 乘除法优先
expCalc('1 + -2') // -1 乘除法优先
expCalc('1 + (2 - 3) / 4 * 6 - (7 + 8 * 9)') // -79.5 小括号优先
expCalc('0.0001 + 0.0002', 10000) // 0.0003 默认精度为 `100`，即保留两位小数
expCalc('.1 + .2') // 0.3 正数可以小数省略前而的 `0`
```

更多例子可查看 [test](./test) 目录下的测试用例

## License

MIT
