# expCalc.js

JavaScript 四则运算库

## Examples

```ts
import expCalc from 'exp-calc'

expCalc('1 + 2') // 3 简单运算，运算符之间空格可有可无
expCalc('1 + 2 * 3 / 4 - 5') // -2.5 乘除法优先
expCalc('1 + (2 - 3) / 4 * 6 - (7 + 8 * 9)') // -79.5 小括号优先
expCalc('0.1 + 0.2', 100) // 0.3 默认精度为 `100`，即保留两位小数
```

## TODO

- 测试用例
