let foundPath = false;

export function dfs(grid, start, finish){
    const order = [];
    if(start.isVisited) return order;
    const r = start.row;
    const c = start.col;
    grid[r][c].isVisited = true;
    order.push(start);
    let found = false;
    if(start === finish){
        foundPath = true;
        return order;
    }
    if(c-1 >= 0){
        if((!grid[r][c-1].isVisited) && (!grid[r][c-1].isWall)){
            grid[r][c-1].prev = start;
            const temp = dfs(grid, grid[r][c-1], finish);
            order.push(...temp);
            if(foundPath)
                return order;  
        }
    }
    if(c+1 < 50){
        if((!grid[r][c+1].isVisited) && (!grid[r][c+1].isWall)){
            grid[r][c+1].prev = start;
            const temp = dfs(grid, grid[r][c+1], finish);
            order.push(...temp);
            if(foundPath)
                return order;  
        }
    } 
    if(r-1 >= 0){
        if((!grid[r-1][c].isVisited) && (!grid[r-1][c].isWall)){
            grid[r-1][c].prev = start;
            const temp = dfs(grid, grid[r-1][c], finish);
            order.push(...temp);
            if(foundPath)
                return order;    
        }
    }    
    if(r+1 < 20){ 
        if((!grid[r+1][c].isVisited) && (!grid[r+1][c].isWall)){ 
            grid[r+1][c].prev = start;
            const temp = dfs(grid, grid[r+1][c], finish);
            order.push(...temp);
            if(foundPath)
                return order;   
        }
    }
    return order;
}

