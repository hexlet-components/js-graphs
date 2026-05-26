## Constants

<dl>
<dt><a href="#makeJoints">makeJoints</a> ⇒ <code>Object</code></dt>
<dd><p>Make joints from tree</p>
</dd>
<dt><a href="#buildTreeFromLeaf">buildTreeFromLeaf</a> ⇒ <code>Array</code></dt>
<dd><p>Build tree from leaf</p>
</dd>
<dt><a href="#sortJoints">sortJoints</a> ⇒ <code>Object</code></dt>
<dd><p>Sort joints</p>
</dd>
<dt><a href="#sortTree">sortTree</a> ⇒ <code>Array</code></dt>
<dd><p>Sorts leafs in a tree (does not change its structure)</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#map">map(callbackFn, tree)</a> ⇒ <code>Array</code></dt>
<dd><p>Map tree</p>
</dd>
<dt><a href="#makeAssociations">makeAssociations(uniqueTree, tree)</a> ⇒ <code>Object</code></dt>
<dd><p>Make associations (key-value pairs)</p>
</dd>
</dl>

<a name="makeJoints"></a>

## makeJoints ⇒ <code>Object</code>
Make joints from tree

**Kind**: global constant  
**Returns**: <code>Object</code> - joints  

| Param | Type |
| --- | --- |
| tree | <code>Array</code> | 

**Example**  
```js
const tree = ['B', [
  ['D'],
  ['A', [
    ['C', [
      ['F'],
      ['E'],
    ]],
  ]],
]];

makeJoints(tree);
// {
//   B: ['D', 'A'],
//   D: ['B'],
//   A: ['C', 'B'],
//   C: ['F', 'E', 'A'],
//   F: ['C'],
//   E: ['C'],
// }
```
<a name="buildTreeFromLeaf"></a>

## buildTreeFromLeaf ⇒ <code>Array</code>
Build tree from leaf

**Kind**: global constant  
**Returns**: <code>Array</code> - tree  

| Param | Type | Description |
| --- | --- | --- |
| joints | <code>Object</code> |  |
| name | <code>String</code> | (leaf name) |

**Example**  
```js
const joints = {
  B: ['D', 'A'],
  D: ['B'],
  A: ['C', 'B'],
  C: ['F', 'E', 'A'],
  F: ['C'],
  E: ['C'],
};

buildTreeFromLeaf(joints, 'C');
// ['C', [
//   ['F'],
//   ['E'],
//   ['A', [
//     ['B', [
//       ['D'],
//     ]],
//   ]],
// ]];
```
<a name="sortJoints"></a>

## sortJoints ⇒ <code>Object</code>
Sort joints

**Kind**: global constant  
**Returns**: <code>Object</code> - sorted joints  

| Param | Type |
| --- | --- |
| joints | <code>Object</code> | 

**Example**  
```js
const joints = {
  B: ['D', 'A'],
  D: ['B'],
  A: ['C', 'B'],
  C: ['F', 'E', 'A'],
  F: ['C'],
  E: ['C'],
};

sortJoints(joints);
// {
//   B: ['A', 'D'],
//   D: ['B'],
//   A: ['B', 'C'],
//   C: ['A', 'E', 'F'],
//   F: ['C'],
//   E: ['C'],
// }
```
<a name="sortTree"></a>

## sortTree ⇒ <code>Array</code>
Sorts leafs in a tree (does not change its structure)

**Kind**: global constant  
**Returns**: <code>Array</code> - sorted tree  

| Param | Type |
| --- | --- |
| tree | <code>Array</code> | 

**Example**  
```js
const tree = ['B', [
  ['D'],
  ['A', [
    ['C', [
      ['F'],
      ['E'],
    ]],
    ['B', [
      ['D'],
    ]],
  ]],
]];

sortTree(tree);
// ['B', [
//   ['A', [
//     ['B', [
//       ['D'],
//     ]],
//     ['C', [
//       ['E'],
//       ['F'],
//     ]],
//   ]],
//   ['D'],
// ]];
```
<a name="map"></a>

## map(callbackFn, tree) ⇒ <code>Array</code>
Map tree

**Kind**: global function  
**Returns**: <code>Array</code> - mapped tree  

| Param | Type |
| --- | --- |
| callbackFn | <code>function</code> | 
| tree | <code>Array</code> | 

**Example**  
```js
const tree = ['B', [
  ['D'],
  ['A', [
    ['C', [
      ['F'],
      ['E'],
    ]],
  ]],
]];

map((name) => name.toLowerCase(), tree);
// ['b', [
//   ['d'],
//   ['a', [
//     ['c', [
//       ['f'],
//       ['e'],
//     ]],
//   ]],
// ]];
```
<a name="makeAssociations"></a>

## makeAssociations(uniqueTree, tree) ⇒ <code>Object</code>
Make associations (key-value pairs)

**Kind**: global function  
**Returns**: <code>Object</code> - associations  

| Param | Type | Description |
| --- | --- | --- |
| uniqueTree | <code>Array</code> | (tree with unique leaf names) |
| tree | <code>Array</code> |  |

**Example**  
```js
const tree = ['B', [
  ['D'],
  ['A', [
    ['C', [
      ['F'],
      ['E'],
    ]],
  ]],
]];

const uniqueTree = map(_.uniqueId, tree);
// ['B1', [
//   ['D2'],
//   ['A3', [
//     ['C4', [
//       ['F5'],
//       ['E6'],
//     ]],
//   ]],
// ]];

makeAssociations(uniqueTree, tree);
// {
//   B1: 'B',
//   D2: 'D',
//   A3: 'A',
//   C4: 'C',
//   F5, 'F',
//   E6, 'E',
// }
```
