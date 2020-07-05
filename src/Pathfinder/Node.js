import React, {Component} from 'react';
import './Node.css'



export default class Node extends Component{

    render(){
        const { 
            row,
            col,
            isStart,
            isFinish,
            num,
            onMouseEnter,
            onMouseDown, 
            onMouseUp,
            isVisited,
            isWall,
            inPath,
        } = this.props;

        const extraclass = isFinish
        ? 'isFinish' : 
        isStart ? 
        'isStart' :
        isWall ?
        'isWall':
        '';

        return(
            <div
                id = {`node-${row}-${col}`}
                className =  {`node ${extraclass}`}
                onMouseDown = {()=> onMouseDown(row, col)}
                onMouseUp = {() => onMouseUp(row, col)}
                onMouseEnter = {() => onMouseEnter(row, col)}
            >
            </div>
        );
    }

}