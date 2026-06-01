// @ts-check

import {
  buildTreeFromLeaf,
  makeJoints,
  sortJoints,
  sortTree,
} from '../index.js';

describe('Joints', () => {
  const tree = [
    'A',
    [
      [
        'C',
        [
          [
            'F',
            [
              ['J', [['O'], ['N']]],
              ['I', [['M']]],
            ],
          ],
          ['G', [['K'], ['L']]],
        ],
      ],
      ['B', [['E'], ['D', [['H']]]]],
    ],
  ];

  let joints;

  it('#makeJoints', () => {
    joints = makeJoints(tree);
    expect(joints).toMatchSnapshot();
  });

  it('#buildTreeFromLeaf', () => {
    const actual = buildTreeFromLeaf(joints, 'F');
    expect(actual).toMatchSnapshot();
  });

  it('#sortJoints', () => {
    const actual = sortJoints(joints);
    expect(actual).toMatchSnapshot();
  });

  it('#sortTree', () => {
    const actual = sortTree(tree);
    expect(actual).toMatchSnapshot();
  });

  it('#sortTree with duplicate leafs', () => {
    const treeWithDuplicateLeafs = [
      'B',
      [
        ['D'],
        [
          'A',
          [
            ['C', [['F'], ['E']]],
            ['B', [['D']]],
          ],
        ],
      ],
    ];

    const actual = sortTree(treeWithDuplicateLeafs);
    expect(actual).toMatchSnapshot();
  });
});
