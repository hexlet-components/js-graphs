// @ts-check

import _ from 'lodash';

/**
 * Make joints from tree
 * @param {Array} tree
 * @returns {Object} joints
 * @example
 * const tree = ['B', [
 *   ['D'],
 *   ['A', [
 *     ['C', [
 *       ['F'],
 *       ['E'],
 *     ]],
 *   ]],
 * ]];
 *
 * makeJoints(tree);
 * // {
 * //   B: ['D', 'A'],
 * //   D: ['B'],
 * //   A: ['C', 'B'],
 * //   C: ['F', 'E', 'A'],
 * //   F: ['C'],
 * //   E: ['C'],
 * // }
 */
export const makeJoints = (tree) => {
  const iter = (leaf, parent) => {
    const [name, children] = leaf;

    if (!children) {
      return { [name]: [parent] };
    }

    const flatChildren = _.flatten(children);
    const neighbors = [...flatChildren, parent].filter(
      (n) => n && !_.isArray(n),
    );

    return {
      [name]: neighbors,
      ...children.reduce(
        (acc, child) => ({ ...acc, ...iter(child, name) }),
        {},
      ),
    };
  };

  return iter(tree);
};

/**
 * Build tree from leaf
 * @param {Object} joints
 * @param {String} name (leaf name)
 * @returns {Array} tree
 * @example
 * const joints = {
 *   B: ['D', 'A'],
 *   D: ['B'],
 *   A: ['C', 'B'],
 *   C: ['F', 'E', 'A'],
 *   F: ['C'],
 *   E: ['C'],
 * };
 *
 * buildTreeFromLeaf(joints, 'C');
 * // ['C', [
 * //   ['F'],
 * //   ['E'],
 * //   ['A', [
 * //     ['B', [
 * //       ['D'],
 * //     ]],
 * //   ]],
 * // ]];
 */
export const buildTreeFromLeaf = (joints, name) => {
  const iter = (current, acc) => {
    const checked = [...acc, current];
    const neighbors = joints[current]
      .filter((n) => !checked.includes(n))
      .map((n) => iter(n, checked));
    return _.isEmpty(neighbors) ? [current] : [current, neighbors];
  };

  return iter(name, []);
};

/**
 * Sort joints
 * @param {Object} joints
 * @returns {Object} sorted joints
 * @example
 * const joints = {
 *   B: ['D', 'A'],
 *   D: ['B'],
 *   A: ['C', 'B'],
 *   C: ['F', 'E', 'A'],
 *   F: ['C'],
 *   E: ['C'],
 * };
 *
 * sortJoints(joints);
 * // {
 * //   B: ['A', 'D'],
 * //   D: ['B'],
 * //   A: ['B', 'C'],
 * //   C: ['A', 'E', 'F'],
 * //   F: ['C'],
 * //   E: ['C'],
 * // }
 */
export const sortJoints = (joints) => {
  const sortLeaf = (acc, neighbors, name) => ({
    ...acc,
    [name]: _.sortBy(neighbors),
  });
  return _.reduce(joints, sortLeaf, {});
};

/**
 * Map tree
 * @param {Function} callbackFn
 * @param {Array} tree
 * @returns {Array} mapped tree
 * @example
 * const tree = ['B', [
 *   ['D'],
 *   ['A', [
 *     ['C', [
 *       ['F'],
 *       ['E'],
 *     ]],
 *   ]],
 * ]];
 *
 * map((name) => name.toLowerCase(), tree);
 * // ['b', [
 * //   ['d'],
 * //   ['a', [
 * //     ['c', [
 * //       ['f'],
 * //       ['e'],
 * //     ]],
 * //   ]],
 * // ]];
 */
const map = (callbackFn, tree) => {
  const [name, children] = tree;
  const updatedName = callbackFn(name);
  if (!children) {
    return [updatedName];
  }
  return [updatedName, children.map((child) => map(callbackFn, child))];
};

/**
 * Make associations (key-value pairs)
 * @param {Array} uniqueTree (tree with unique leaf names)
 * @param {Array} tree
 * @returns {Object} associations
 * @example
 * const tree = ['B', [
 *   ['D'],
 *   ['A', [
 *     ['C', [
 *       ['F'],
 *       ['E'],
 *     ]],
 *   ]],
 * ]];
 *
 * const uniqueTree = map(_.uniqueId, tree);
 * // ['B1', [
 * //   ['D2'],
 * //   ['A3', [
 * //     ['C4', [
 * //       ['F5'],
 * //       ['E6'],
 * //     ]],
 * //   ]],
 * // ]];
 *
 * makeAssociations(uniqueTree, tree);
 * // {
 * //   B1: 'B',
 * //   D2: 'D',
 * //   A3: 'A',
 * //   C4: 'C',
 * //   F5, 'F',
 * //   E6, 'E',
 * // }
 */
const makeAssociations = (uniqueTree, tree) => {
  const uniqueLeafs = _.flattenDeep(uniqueTree);
  const leafs = _.flattenDeep(tree);
  return _.zipObject(uniqueLeafs, leafs);
};

/**
 * Sorts leafs in a tree (does not change its structure)
 * @param {Array} tree
 * @returns {Array} sorted tree
 * @example
 * const tree = ['B', [
 *   ['D'],
 *   ['A', [
 *     ['C', [
 *       ['F'],
 *       ['E'],
 *     ]],
 *     ['B', [
 *       ['D'],
 *     ]],
 *   ]],
 * ]];
 *
 * sortTree(tree);
 * // ['B', [
 * //   ['A', [
 * //     ['B', [
 * //       ['D'],
 * //     ]],
 * //     ['C', [
 * //       ['E'],
 * //       ['F'],
 * //     ]],
 * //   ]],
 * //   ['D'],
 * // ]];
 */
export const sortTree = (tree) => {
  const uniqueTree = map(_.uniqueId, tree);
  const associations = makeAssociations(uniqueTree, tree);
  const [root] = uniqueTree;
  const joints = makeJoints(uniqueTree);
  const sortedJoints = sortJoints(joints);

  const sorted = buildTreeFromLeaf(sortedJoints, root);
  return map((leaf) => associations[leaf], sorted);
};
