# expCalc.js

JavaScript 四则运算库

## example

```ts
import expCalc from 'exp-calc'

expCalc('1 + 2') // 3 简单运算，运算符之间可以有空格
expCalc('1 + 2 * 3 / 4') // 2.5 乘除法优先
expCalc('0.1 + 0.2') // 0.3 默认精度为 `100`，即保留两位小数
```

## TODO

- 支持小括号
- 测试用例
