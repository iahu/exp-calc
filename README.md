# expCalc.js

JavaScript 四则运算库

## Example

```ts
import expCalc from 'exp-calc'

expCalc('1 + 2') // 3 简单运算，运算符之间可以有空格
expCalc('1 + 2 * 3 / 4 - 5') // -2.5 乘除法优先
expCalc('0.1 + 0.2', 100) // 0.3 默认精度为 `100`，即保留两位小数
expCalc('1+(2-3)/4*6-(7+8)') // -15.5 支持小括号优先
```

## TODO

- 测试用例
