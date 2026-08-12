# js-graphs

[![github action status](https://github.com/hexlet-components/js-graphs/workflows/Node%20CI/badge.svg)](https://github.com/hexlet-components/js-graphs/actions)

## Зачем это нужно

Работа с деревьями и графами: построение из списка связей, обход, сортировка.
Нужна курсам, где важна структура данных, а не разбор конкретного формата.

Деревья представлены обычными вложенными массивами, поэтому их видно целиком в
исходнике и легко сравнить глазами.

## Install

```sh
npm install @hexlet/graphs
```

## Usage example

```javascript
import {
  makeJoints, buildTreeFromLeaf, sortTree,
} from '@hexlet/graphs';

const tree = ['B', [
  ['D'],
  ['A', [
    ['C', [
      ['F'],
      ['E'],
    ]],
  ]],
]];

const joints = makeJoints(tree);
const transformed = buildTreeFromLeaf(joints);
// ['C', [
//   ['F'],
//   ['E'],
//   ['A', [
//     ['B', [
//       ['D'],
//     ]],
//   ]],
// ]];

sortTree(transformed);
// ['C', [
//   ['A', [
//     ['B', [
//       ['D'],
//     ]],
//   ]],
//   ['E'],
//   ['F'],
// ]];
```

For more information, see the [Full Documentation](https://github.com/hexlet-components/js-graphs/tree/master/docs)

---

[![Hexlet Ltd. logo](https://raw.githubusercontent.com/Hexlet/assets/master/images/hexlet_logo128.png)](https://hexlet.io?utm_source=github&utm_medium=link&utm_campaign=js-graphs)

This repository is created and maintained by the team and the community of Hexlet, an educational project. [Read more about Hexlet](https://hexlet.io?utm_source=github&utm_medium=link&utm_campaign=js-graphs).

See most active contributors on [hexlet-friends](https://friends.hexlet.io/).
