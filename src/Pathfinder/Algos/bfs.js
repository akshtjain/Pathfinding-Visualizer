


export function bfs(grid, start, finish){

    const que = [];
    const order = [];
    que.push(start);
    while(que.length > 0){
        const curr = que.shift();
        const {row, col} = curr;
        if(grid[row][col].isVisited) continue;
        const neighbors = getneighbors(grid, curr);
        for(let i = 0; i<neighbors.length; i++){
            que.push(neighbors[i]);
            neighbors[i].prev = curr;
        }
        grid[curr.row][curr.col].isVisited = true;
        // curr.isVisited = true;
        order.push(curr);
        if(curr === finish){
            return order;
        }
    }
    return order; 
}

function getneighbors(grid, curr){
    const r = curr.row;
    const c = curr.col;
    const n = []
    if(c-1 >= 0){
        if((!grid[r][c-1].isVisited) && (!grid[r][c-1].isWall)) n.push(grid[r][c-1]); 
    }
    if(c+1 < 50){
        if((!grid[r][c+1].isVisited) && (!grid[r][c+1].isWall)) n.push(grid[r][c+1]);
    } 
    if(r-1 >= 0){
        if((!grid[r-1][c].isVisited) && (!grid[r-1][c].isWall)) n.push(grid[r-1][c]);
    }    
    if(r+1 < 20){ 
        if((!grid[r+1][c].isVisited) && (!grid[r+1][c].isWall)) n.push(grid[r+1][c]);   
    }
    return n;
}


export function getshortestpath(grid, start, finish){
    const shortestpath = [];
    if(finish.isVisited){
        let curr = finish;
        while(curr != start){
            shortestpath.push(curr);
            curr = curr.prev;
        }
    }
    if(shortestpath.length > 0) shortestpath.push(start);
    return shortestpath;
}