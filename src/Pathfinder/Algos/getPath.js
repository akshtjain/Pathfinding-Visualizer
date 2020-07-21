export function getPath(grid, finishNode) {
    const {row, col} = finishNode;
    finishNode = grid[row][col];
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.push(currentNode);
      currentNode = currentNode.prev;
    }
    return nodesInShortestPathOrder;
  }