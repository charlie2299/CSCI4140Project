import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import { context, canvasSize, contextSettings } from '../Context';
import canvasController from "./canvasController";
import Canvas from './Canvas';

function AlgoTemplate(nums, canvasWidth, canvasHeight, p){
    
    this.nums = nums;
    this.width = canvasWidth;
    this.height = canvasHeight;

    this.draw = () => {
        // p.rect(0, 0, this.width/2, this.height);
        // for(let k = 0; k < this.nums.length; k++){
            
        // }
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
        for(let i = 0; i < canvas.numberOfElements; i++) nums.push(p.random(canvas.height));
        algo = new AlgoTemplate(nums, canvas.width, canvas.height, p);
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

class Template extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <P5Wrapper sketch={sketch} settings={this.context}></P5Wrapper>
        );
    }
}

Template.contextType = context;

export default Template;