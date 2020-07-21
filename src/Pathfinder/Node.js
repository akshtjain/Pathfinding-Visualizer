import React, {Component} from 'react';
import './Node.css';
import IosDisc from 'react-ionicons/lib/IosDisc'
import IosRadioOutline from 'react-ionicons/lib/IosRadioOutline'
import IosIonitron from 'react-ionicons/lib/IosIonitron'
import "./css-resources/normalize.css";
import "./css-resources/grid.css";


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
            isWeighted
        } = this.props;

        const extraClass = isFinish ?
        'isFinish' : 
        isStart ? 
        'isStart' :
        isWall ?
        'isWall':
        isWeighted ?
        'isWeighted':
        '';

        const icon = isWeighted ?
        <IosDisc/> :
        isStart ? 
        <IosIonitron/> :
        isFinish ? 
        <IosRadioOutline/>:
        '';
        
        return(
           <div id={`node-${row}-${col}`}
            className={`node ${extraClass}`}
            onMouseDown = {()=>onMouseDown(row,col)}
            onMouseUp= {()=> onMouseUp(row,col)}
            onMouseEnter = {()=> onMouseEnter(row,col)}
           >

            {icon}
           </div>
        );
        
    }

}