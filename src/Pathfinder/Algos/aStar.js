// import { isValidElement } from 'react';

var Heap   = require('heap');



function heuristic(a, b, c, d){
    return (a-c)*(a-c) + (b-d)*(b-d);
}

function isValid(grid, r, c){
    if(r < 20 && r >= 0 && c < 50 && c >=0 ){
        if(grid[r][c].isWall === false) return true;
    }
    return false;
}


export function aStar(grid, start, finish){
    var openList = new Heap(function(nodeA, nodeB) {
        return nodeA.f - nodeB.f;
    });

    const dx = [1, -1 , 0, 0];
    const dy = [0, 0, 1, -1];
    const order = [];
    openList.push({
        f: 0,
        s: start,
    });
    order.push(start);
    // console.log(openList);
    while(!openList.empty()){
        const curr = openList.pop();
        const {row, col} = curr.s;
        // console.log(row, col);
        
        if(grid[row][col].isVisited === true) continue;
        grid[row][col].isVisited = true;
        if(curr.s === finish) return order;
        for(let i = 0; i<4 ; i++){
            const newRow = row+dx[i];
            const newCol = col+dy[i];
            if(isValid(grid, newRow, newCol)){
                if(grid[newRow][newCol].isVisited === true) continue;
                const h = heuristic(newRow, newCol, finish.row, finish.col);
                if(grid[newRow][newCol].g === Infinity) order.push(grid[newRow][newCol]);

                // if(grid[newRow][newCol] === finish) return order;
                if( h < grid[newRow][newCol].g){
                    grid[newRow][newCol].g = h;
                    openList.push({
                        f: h,
                        s: grid[newRow][newCol],
                    });
                    grid[newRow][newCol].prev = grid[row][col];
                }
            }
        }
        
    }
    return order;
}
