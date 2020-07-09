import React, {Component} from 'react';
import './Pathfinder.css'
import update from 'react-addons-update';
import Node from './Node.js'
import {bfs, getshortestpath} from './Algos/bfs';
import {dfs, getpathdfs} from './Algos/dfs'

let sr = 10;
let sc = 15;
let fr = 10;
let fc = 35;

// Dont allow user to manipulate Walls and stuff while animation is going on
// Add Weighted Nodes
// Add more algorithms like djikstra A* and stuff 
// Change animation 
// Wall building should not toggle the current status.. if the first node we clicked on built a wall then 
// the following drag should always build a wall... if the first click erased a wall then the following drag 
// should erase walls


export default class Pathfinder extends Component{
    constructor(){
        super();
        this.state = {
            grid: this.setgrid(),
            mouse : false,
            changeStart: false,
            changeFinish: false,
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
        const newnode = {
            ...node,
            isWall: !node.isWall,
        }
        newgrid[r][c] = newnode;
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
            const newnode = {
                ...node,
                isWall: !node.isWall,
            }
            newgrid[r][c] = newnode;
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

    animatepath(path){
        path.reverse();
        for(let i = 1; i< path.length-1; i++){  
            const node = path[i];  
            setTimeout(() => {
                // Here we are directly manipulating the DOM which is apparently not the best thing
                // learn about react RAF to change this and do it the react way
                document.getElementById(`node-${node.row}-${node.col}`).className =
                'node node-shortest-path';
            }, 10 * i);
        }
    }


    animatevisited(order,path, start, finish){
        
        for(let i = 1; i< order.length; i++){ 
            if(i === order.length-1){
                setTimeout(() => {
                    this.animatepath(path);
                }, 10 * i);
                return;
            }   
            const node = order[i];
            setTimeout(() => {
                // Here we are directly manipulating the DOM which is apparently not the best thing
                // learn about react RAF to change this and do it the react way
                document.getElementById(`node-${node.row}-${node.col}`).className =
                'node node-visited';
            },10 * i);
        }
    }

    visualizeBFS(){
        const grid = this.state.grid.slice();
        const start = grid[sr][sc];
        const finish = grid[fr][fc];
        const order = bfs(grid, start , finish );
        const path  = getshortestpath(grid,start, finish );
        this.animatevisited(order, path, start, finish);
    }
    visualizeDFS(){
        const grid = this.state.grid.slice();
        const start = grid[sr][sc];
        const finish = grid[fr][fc];
        const temp = dfs(grid, start , finish );
        const order = temp.order;
        const path  = getpathdfs(grid,start, finish );
        this.animatevisited(order, path, start, finish);
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
                onClick = {() => this.resetGrid()}
            >
                Reset
            </button>
            <div className = "grid">
                {grid.map((row, rowind) =>{
                    return(
                        <div key = {rowind} >
                            {row.map((node, ind)=>{
                                const {val, row, col, isStart, isFinish, isWall, isVisited, inPath} = node;
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
        isFinish : (row === fr && col === fc)? true: false,
        isWall : false,
        isVisited : false,
        prev: null,
        inPath: false,
    };
}
