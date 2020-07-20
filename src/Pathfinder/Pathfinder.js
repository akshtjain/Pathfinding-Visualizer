import React, {Component} from 'react';
import './Pathfinder.css'
// import update from 'react-addons-update';
import Node from './Node.js'
import {bfs, getshortestpath} from './Algos/bfs';
import {dfs, getpathdfs} from './Algos/dfs';
import {aStar, getpathaStar} from './Algos/aStar';
import {djikstra, getPathDijkstra, dijkstra} from './Algos/dijkstra';
import {twoDestDijkstra} from './Algos/twoDestDijkstra'
import { getRoles } from '@testing-library/react';

let sr = 10;
let sc = 15;
let fr = 10;
let fc = 35;
let fr2 = 5;
let fc2 = 45;

// Dont allow user to manipulate Walls and stuff while animation is going on
// Add Weighted Nodes
// Add more algorithms like djikstra A* and stuff 
// Change animation 
// Wall building should not toggle the current status.. if the first node we clicked on built a wall then 
// the following drag should always build a wall... if the first click erased a wall then the following drag 
// should erase walls

// Given multiple points find a point for which the sum of distances from all given points is smallest OR 
// from where the maximum distance from between any starting point and destination point is minimum


export default class Pathfinder extends Component{
    constructor(){
        super();
        this.state = {
            grid: this.setgrid(),
            mouse : false,
            changeStart: false,
            changeFinish: false,
            addWeight: false,
        };
        
        
    }
    setgrid(){
        const grid = [];
        for(let i = 0; i <20; i++){
            const currrow = []
            for(let j = 0; j< 50; j++){
                currrow.push(newnode(i,j));
            }
            grid.push(currrow);

        }
        return grid;
    }
    

    handleMouseDown(r, c){
        const newgrid = this.state.grid.slice();
        const node = newgrid[r][c];
        if(node.isStart){
            this.setState({
                changeStart : true,
                mouse: true,
            });
            return;
        }
        if(node.isFinish){
            this.setState({
                changeFinish: true,
                mouse: true,
            });
            return;
        }
        if(this.state.addWeight === true){
            const newnode = {
                ...node,
                isWeighted: !node.isWeighted,
            }
            newgrid[r][c] = newnode;
        }else{
            const newnode = {
                ...node,
                isWall: !node.isWall,
            }
            newgrid[r][c] = newnode;
        }
        
        this.setState({grid: newgrid, mouse: true});
    }
    
    handleMouseEnter(r, c){
        if(!this.state.mouse) return;
        const newgrid = this.state.grid.slice();
        const node = newgrid[r][c];
        if(node.isStart || node.isFinish) return;
        if(this.state.changeStart){
            newgrid[sr][sc].isStart = false;
            node.isStart = true;
            node.isWall = false;
            sr = r;
            sc = c;
        }
        else if(this.state.changeFinish){
            newgrid[fr][fc].isFinish = false;
            node.isFinish = true;
            node.isWall = false;
            fr = r;
            fc = c;
        }else{
            if(this.state.addWeight === true){
                const newnode = {
                    ...node,
                    isWeighted: !node.isWeighted,
                }
                newgrid[r][c] = newnode;
            }else{
                const newnode = {
                    ...node,
                    isWall: !node.isWall,
                }
                newgrid[r][c] = newnode;
            }
        }
        
        this.setState({grid: newgrid});
    }

    handleMouseUp(r, c){
        this.setState({
            changeFinish: false,
            changeStart: false,
            mouse : false
        });
    }

    toggleW(){
        this.setState({
            addWeight : !(this.state.addWeight),
        });
    }

    animatepath(path){
        path.reverse();
        for(let i = 1; i< path.length-1; i++){  
            const node = path[i];  
            setTimeout(() => {
                // Here we are directly manipulating the DOM which is apparently not the best thing
                // learn about react RAF to change this and do it the react way
                document.getElementById(`node-${node.row}-${node.col}`).className =
                'node node-shortest-path';
            }, 30 * i);
        }
    }


    animatevisited(order,path, additional = 0){
        
        for(let i = 1; i< order.length-1; i++){ 
            
               
            const node = order[i];
            setTimeout(() => {
                // Here we are directly manipulating the DOM which is apparently not the best thing
                // learn about react RAF to change this and do it the react way
                document.getElementById(`node-${node.row}-${node.col}`).className =
                'node node-visited';
            },10 * (i+additional));
        }
    }

    visualizeBFS(){
        const grid = this.state.grid.slice();
        const start = grid[sr][sc];
        const finish = grid[fr][fc];
        const order = bfs(grid, start , finish );
        const path  = getshortestpath(grid,start, finish );
        this.animatevisited(order, path);
        setTimeout(() =>{
            this.animatepath(path);
        }, 10*order.length );
        
    }
    visualizeDFS(){
        const grid = this.state.grid.slice();
        const start = grid[sr][sc];
        const finish = grid[fr][fc];
        const temp = dfs(grid, start , finish );
        const order = temp.order;
        const path  = getpathdfs(grid,start, finish );
        this.animatevisited(order, path);
        setTimeout(() =>{
            this.animatepath(path);
        }, 10*order.length );
    }
    visualizeAStar(){
        const grid = this.state.grid.slice();
        const start = grid[sr][sc];
        const finish = grid[fr][fc];
        const order = aStar(grid, start , finish );
        const path  = getpathaStar(grid,start, finish );
        this.animatevisited(order, path);
        setTimeout(() =>{
            this.animatepath(path);
        }, 10*order.length );
    }
    visualizeDijkstra(){
        const grid = this.state.grid.slice();
        const start = grid[sr][sc];
        const finish = grid[fr][fc];
        const order = dijkstra(grid, start , finish );
        const path  = getPathDijkstra(grid, finish);
        this.animatevisited(order, path);
        setTimeout(() =>{
            this.animatepath(path);
        }, 10*order.length );
    }


    visualizetwoDest(){
        const grid = this.state.grid.slice();
        const grid_1 = grid.map(a => a.map(b => Object.assign({}, b)));
        const grid_2 = grid.map(a => a.map(b => Object.assign({}, b)));
        const start = grid[sr][sc];
        const f1 = grid[fr][fc];
        const f2 = grid[fr2][fc2];
        let order1 = [];
        let order2 = [];
        let path1;
        let path2;
        if(twoDestDijkstra(grid, grid[sr][sc], grid[fr][fc], grid[fr2][fc2]) === grid[fr][fc]){
            order1 = dijkstra(grid_1, grid_1[sr][sc], grid_1[fr][fc]);
            order2 = dijkstra(grid_2, grid_2[fr][fc], grid_2[fr2][fc2]);
            path1 = getPathDijkstra(grid_1, grid_1[fr][fc]);
            path2 = getPathDijkstra(grid_2, grid_2[fr2][fc2]);
        }else{
            console.log("jfhg");
            order1 = dijkstra(grid_1, grid_1[sr][sc], grid_1[fr2][fc2]);
            order2 = dijkstra(grid_2, grid_2[fr2][fc2], grid_2[fr][fc]);
            path1 = getPathDijkstra(grid_1, grid_1[fr2][fc2]);
            path2 = getPathDijkstra(grid_2, grid_2[fr][fc]);
        }
        this.animatevisited(order1, path1);
        this.animatevisited(order2,path2, order1.length);
        setTimeout(() =>{
            this.animatepath(path1);
        }, 10*(order1.length+order2.length) );
        setTimeout(() =>{
            this.animatepath(path2);
        }, 10*(order1.length+order2.length) + 30*(path1.length) );
    }

    resetGrid(){
        const grid = this.setgrid();
        this.setState({grid: grid});
        for(let i = 0; i<20; i++){
            for(let j = 0; j<50; j++){
                document.getElementById(`node-${i}-${j}`).classList.remove('node-shortest-path');
                document.getElementById(`node-${i}-${j}`).classList.remove('node-visited'); 
            }
        }
    }

    
    render (){
        const grid = this.state.grid;
        return(
            <>
            
            <button 
                onClick = {() => this.visualizeBFS() }>
                BFS
            </button>
            <button 
                onClick = {() => this.visualizeDFS() }>
                DFS
            </button>
            <button 
                onClick = {() => this.visualizeAStar() }>
                AStar
            </button>
            <button 
                onClick = {() => this.visualizeDijkstra() }>
                Dijkstra
            </button>
            <button 
                onClick = {() => this.visualizetwoDest() }>
                2Dest
            </button>
            <button
                onClick = {() => this.resetGrid()}
            >
                Reset
            </button>
            <button
                onClick = {() => this.toggleW() }
            >
                Weight/Wall
            </button>
            <div className = "grid">
            
                {grid.map((row, rowind) =>{
                    return(
                        <div key = {rowind} >
                            {row.map((node, ind)=>{
                                const {val, row, col, isStart, isFinish, isWall, isVisited, inPath,isWeighted} = node;
                                return(
                                    <Node
                                        key = {val}
                                        num = {val}
                                        row = {row}
                                        col = {col}
                                        isFinish = {isFinish}
                                        isStart = {isStart}
                                        isWall = {isWall}
                                        isVisited = {isVisited}
                                        isWeighted = {isWeighted}
                                        onMouseDown = {(r,c)=> this.handleMouseDown(r, c)}
                                        onMouseUp = {(r,c) => this.handleMouseUp(r, c)}
                                        onMouseEnter = {(r,c) => this.handleMouseEnter(r, c)}
                                    />
                                );
                                    
                            })}
                        </div>
                    );
                })}
            </div>
            </>
        );
    }
}

const newnode = (row, col) =>{
    return {
        val : 50* row + col,
        row,
        col, 
        isStart : (row === sr && col === sc)? true: false,
        isFinish : ((row === fr && col === fc) || (row === fr2 && col === fc2))? true: false,
        isWall : false,
        isVisited : false,
        prev: null,
        inPath: false,
        isWeighted : false,
        g : Infinity,
        distance: Infinity,
    };
}
