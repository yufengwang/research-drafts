class BinaryTree {
  constructor(val) {
    this.root = new TreeNode(val);
    this.levels = [[]];
  }
  levelOrderTraverse() {}
  // lc-102
  levelOrderArr(root) {
    if (root === null) return this.levels;
    this.levelOrderArrHelper(root, 0);
    return this.levels;
  }

  levelOrderArrHelper(node, level) {
    if (!this.levels[level]) {
      this.levels.push([]);
    }
    this.levels[level].push(node.val);
    if (node.left) {
      this.levelOrderArrHelper(node.left, level + 1);
    }
    if (node.right) {
      this.levelOrderArrHelper(node.right, level + 1);
    }
  }
}

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}

const tree = new BinaryTree(3);

tree.root.left = new TreeNode(9);
tree.root.right = new TreeNode(20);
tree.root.right.left = new TreeNode(15);
tree.root.right.right = new TreeNode(7);

const arr = tree.levelOrderArr(tree.root);
