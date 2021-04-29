import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import { context, canvasSize, contextSettings } from '../Context';
import canvasController from "./canvasController";
import Canvas from './Canvas';

function AlgoMergeSort(nums, canvasWidth, canvasHeight, p){
    
    this.nums = nums;
    this.width = canvasWidth;
    this.height = canvasHeight;
    this.edge = this.width/this.nums.length;

    this.leftTop = this.edge*0.2;
    this.leftBottom = this.edge*0.75;
    this.halfEdge = this.edge/2;

    this.step = 0;
    
    // this.handleMouseClicked = () => {
    //     this.step++;
    //     p.redraw();
    // }

    // this.draw = () => {
    //     switch (this.step) {
    //         case 0:
    //             for(let k = 0; k < this.nums.length; k++){
    //                 p.rect(k*this.edge, this.edge, this.edge, -this.edge);
        
    //                 p.text(nums[k].toString(), this.leftTop+k*this.edge, this.leftBottom);
    //             }
    //             break;
    //         case 1:

    //             break;
    //         case 'Papayas':
    //             console.log('Mangoes and papayas are $2.79 a pound.');
    //             // expected output: "Mangoes and papayas are $2.79 a pound."
    //             break;
    //         default:
    //             console.log(`Sorry, we are out of ${this.step}.`);
    //     }
        
    // }
    this.draw = () => {
        for(let k = 0; k < this.nums.length; k++){
            p.rect(k*this.edge, this.edge, this.edge, -this.edge);

            p.text(nums[k].toString(), this.leftTop+k*this.edge, this.leftBottom);
        }
    }

    this.sort = () => {

    }
}

function sketch(p) {
    // declare objects
    let algo = undefined, canvas = undefined, nums = [];

    let init = (numberOfElements) =>{
        if(numberOfElements === undefined) numberOfElements = contextSettings.numberOfElements;
        
        canvas = new Canvas(canvasSize.width, canvasSize.height, numberOfElements);
        p.createCanvas(canvas.width, canvas.height);
        nums = [];
        for(let i = 0; i < canvas.numberOfElements; i++) nums.push(parseInt(p.random(canvas.height)));
        algo = new AlgoMergeSort(nums, canvas.width, canvas.height, p);
        // initialize other variable members here...
    }

    // add controller 
    let cc = new canvasController(p, init);  
    p.myCustomRedrawAccordingToNewPropsHandler = cc.propsHandler;

    p.setup = () => {
        init();
    };
    
    p.draw = () => {
        p.background(220);
        algo.draw();
    };
}

class MergeSort extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <P5Wrapper sketch={sketch} settings={this.context}></P5Wrapper>
        );
    }
}

MergeSort.contextType = context;

export default MergeSort;