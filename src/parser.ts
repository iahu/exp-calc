import {
  isNumber,
  isOperator,
  normalize,
  hasOperator,
  toNumber,
  isPriorityOp,
  isGroupStartOp,
  isGroupEndOp,
} from './helper';

const toGroup = (opList: string[]) => {
  const opListClone = [...opList];
  let groups = 0;
  let i = 0;
  while (i < opListClone.length) {
    const prevOp = opListClone[i - 1];
    const op = opListClone[i];

    // `(`
    if (isGroupStartOp(op)) {
      groups += 1;
    } else if (!isPriorityOp(op)) {
      // `)+` or `)-`
      if (isGroupEndOp(prevOp)) {
        groups -= 1;
      }
      // `1+` or `1-`
      else {
      }
    }
    // `*` or `/`
    else if (isPriorityOp(op)) {
      const groupOffset = groups * 4;
      const start = i - 1 - groupOffset;
      const end = start + 4 + groupOffset;
      opListClone.splice(start, 0, '(');
      opListClone.splice(end, 0, ')');
      i += 3;
      groups += 1;
    }
    //
    else if (isNumber(toNumber(op, false)) && groups) {
      groups -= 1;
    }
    i += 1;
  }
  return opListClone;
};

export default class Parser {
  expression = '';
  constructor(expression: string) {
    this.expression = expression.trim();
    this.parser();
  }

  toOperators(expression: string) {
    return expression
      .trim()
      .replace(/([+\-*/])/g, ' $1 ')
      .split(/\s+/g);
  }

  validate(opList: string[]) {
    let multOp = 0;
    opList.forEach((op) => {
      if (isOperator(op)) {
        multOp -= 1;
      } else if (isNumber(toNumber(op))) {
        multOp += 1;
      } else {
        throw Error(`unknown operator: ${op}`);
      }
    });

    return multOp === 1;
  }

  normalize(expression: string) {
    if (!hasOperator(expression)) {
      return [normalize(expression)];
    }

    const opList = this.toOperators(expression);

    if (!this.validate(opList)) {
      throw Error(`Expression Error: ${expression} not a accepted expression.`);
    }

    const groupOpList = toGroup(opList);

    return groupOpList;
  }

  parser() {
    const normalizedOps = this.normalize(this.expression);

    console.log(normalizedOps.join(''));
  }
}

const ops = new Parser('1 + (2 * 3) / 4 - 5 * 6');
