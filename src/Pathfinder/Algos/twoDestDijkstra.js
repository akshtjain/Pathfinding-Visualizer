
export function twoDestDijkstra(grid, start, f1, f2){
    const grid_1 = grid.map(a => a.map(b => Object.assign({}, b)));
    const grid_2 = grid.map(a => a.map(b => Object.assign({}, b)));
    let a =  getdist(grid_1,grid_1[start.row][start.col], grid_1[f1.row][f1.col]);
    let b = getdist(grid_2, grid_2[start.row][start.col], grid_2[f2.row][f2.col]);
    console.log(a,b);
    if(a < b){
        return f1;
    }else{
        return f2;
    }
}

function getdist(grid, startNode, finishNode){
    dijkstra(grid, startNode, finishNode);
    let currentNode = finishNode;
    let count = 0;
    if(currentNode.isVisited === false) return Infinity;
    while (currentNode !== null) {
      count++;
      currentNode = currentNode.prev;
    }
    return count;
}

function dijkstra(grid, startNode, finishNode) {
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
      sortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
      // If we encounter a wall, we skip it.
      if (closestNode.isWall) continue;
      // If the closest node is at a distance of infinity,
      // we must be trapped and should therefore stop.
      if (closestNode.distance === Infinity) return ;
      closestNode.isVisited = true;
      if (closestNode === finishNode) return 
      updateUnvisitedNeighbors(closestNode, grid);
    }
  }
  
  function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }
  
  function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1 + (neighbor.isWeighted ? 4 : 0);
      neighbor.prev = node;
    }
  }
  
  function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }
  
  function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  }
  
 