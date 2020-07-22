// import { isValidElement } from 'react';

var Heap   = require('heap');



function heuristic(a, b, c, d){
    return Math.abs(a-c)+ Math.abs(b-d);
}

function isValid(grid, r, c){
    if(r < grid.length - 1 && r >= 0 && c < grid[0].length - 1 && c >=0 ){
        if(grid[r][c].isWall === false) return true;
    }
    return false;
}

// function sortby(openList) {
//     openList.sort((nodeA, nodeB) => (nodeA.f - nodeB.f) != 0 ? nodeA.f - nodeB.f : nodeA.t - nodeB.t );
// }

export function aStar(grid, start, finish){
    var openList=new Heap(function(nodeA, nodeB)
    {
        return (nodeA.f - nodeB.f) != 0 ? nodeA.f - nodeB.f : nodeA.t - nodeB.t;
    });
    const dx = [1, -1 , 0, 0];
    const dy = [0, 0, 1, -1];
    const order = [];
    openList.push({
        f: 0,
        s: start,
        t : 0,
    });
    order.push(start);
    start.distance = 0;
    // console.log(openList);
    while(!openList.empty()){
        // sortby(openList);
        const curr = openList.pop();
        const {row, col} = curr.s;
        console.log(row, col);
        
        if(grid[row][col].isVisited === true) continue;
        grid[row][col].isVisited = true;
        order.push(curr.s);
        // console.log(curr.s.row, curr.s.col, curr.s.distance, curr.s.g);
        if(curr.s === finish) return order;
        
        for(let i = 0; i<4 ; i++){
            const newRow = row+dx[i];
            const newCol = col+dy[i];
            if(isValid(grid, newRow, newCol)){
                if(grid[newRow][newCol].isVisited === true) continue;
                const h = heuristic(newRow, newCol, finish.row, finish.col);
                // if(grid[newRow][newCol].g === Infinity) order.push(grid[newRow][newCol]);

                // if(grid[newRow][newCol] === finish) return order;
                const temp = grid[row][col].distance + h + (grid[newRow][newCol].isWeighted == false ? 1: 5);
                if(temp < grid[newRow][newCol].g){
                    grid[newRow][newCol].g = temp;
                    grid[newRow][newCol].distance = temp - h;
                    openList.push({
                        f: temp,
                        s: grid[newRow][newCol],
                        t : h,
                    });
                    grid[newRow][newCol].prev = grid[row][col];
                }
                // if(grid[newRow][newCol] === finish) return order;
            }
        }
        
    }
    return order;
}
