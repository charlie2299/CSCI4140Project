import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import { context, canvasSize, contextSettings } from '../Context';
import canvasController from "./canvasController";
import Canvas from './Canvas';

function AlgoLinkedList(nums, canvasWidth, canvasHeight, p){
    this.traverseLock = false;

    let white = p.color("#ffffff"), black = p.color("#000000"), red = p.color("#ff0303");
    this.nums = nums;
    this.width = canvasWidth;
    this.height = canvasHeight;

    this.heightCenter = this.height/2;
    this.offset = 20;
    this.diameter = 50;
    this.radius = this.diameter/2;

    this.arrowx = 5;
    this.arrowy = 5;

    let capacity = parseInt(this.width / (this.diameter+this.offset));
    let numsOfElement = this.nums.length;
    for(let i = 0; i < numsOfElement-capacity+1; i++) {this.nums.pop();};

    this.color = []; this.reversed = [];
    for(let i = 0; i < this.nums.length; i++) {
        this.color.push(white);
        this.reversed.push(false);
    }

    

    this.sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    this.traverse = async() => {
        if(this.traverseLock) return;
        this.traverseLock = true;
        if(this.reversed[0]){
            for(let i = this.nums.length-1; i >= 0; i--){
                this.color[i] = red;
                await this.sleep(100);
                this.color[i] = white;
            }
        }else{
            for(let i = 0; i < this.nums.length; i++){
                this.color[i] = red;
                await this.sleep(100);
                this.color[i] = white;
            }
        }
        
        this.traverseLock = false;
    }



    this.reverse = async() => {
        if(this.traverseLock) return;
        this.traverseLock = true;
        if(this.reversed[0]){
            for(let i = this.nums.length-1 ; i >= 0; i--){
                this.color[i] = red;
                if(this.reversed[i]) this.reversed[i] = false;
                else this.reversed[i] = true;
                await this.sleep(100);
                this.color[i] = white;
            }
        }else{
            for(let i = 0 ; i < this.nums.length; i++){
                this.color[i] = red;
                if(this.reversed[i]) this.reversed[i] = false;
                else this.reversed[i] = true;
                await this.sleep(100);
                this.color[i] = white;
            }
        }
        
        this.traverseLock = false;
    }

    

    this.draw = () => {
        for(let k = 0; k < this.nums.length; k++){
            let circleCenter = this.radius*k*3+this.offset;
            let lineStart = circleCenter+this.radius, lineEnd = circleCenter+this.radius+this.offset;
            p.strokeWeight(1);
            p.fill(this.color[k]);
            p.circle(circleCenter, this.heightCenter, this.diameter);
            p.fill(black);
            p.text(this.nums[k].toString(), circleCenter-this.radius/4, this.heightCenter+this.radius/5);

            p.line(lineStart, this.heightCenter, lineEnd, this.heightCenter);
            p.strokeWeight(4);
            if(this.reversed[k]){
                p.line(lineStart, this.heightCenter, lineStart+this.arrowx, this.heightCenter-this.arrowy);
                p.line(lineStart, this.heightCenter, lineStart+this.arrowx, this.heightCenter+this.arrowy);
            }else{
                p.line(lineEnd, this.heightCenter, lineEnd-this.arrowx, this.heightCenter-this.arrowy);
                p.line(lineEnd, this.heightCenter, lineEnd-this.arrowx, this.heightCenter+this.arrowy);
            }
            
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
        algo = new AlgoLinkedList(nums, canvas.width, canvas.height, p);
        // initialize other variable members here...
    }

    // add controller 
    let cc = new canvasController(p, init);  
    p.myCustomRedrawAccordingToNewPropsHandler = cc.propsHandler;

    p.setup = () => {
        init();
        let btnTraverse = p.createButton('Traverse'), btnReverse = p.createButton('Reverse');
        let canvas = document.getElementById("defaultCanvas0");
        let posy = canvas.offsetTop, posx = canvas.offsetLeft, offsetx = 50, offsety = 50, btnWidth=70;
        btnTraverse.position(posx+offsetx, posy+offsety);
        btnTraverse.mousePressed(algo.traverse);

        btnReverse.position(posx+offsetx*2+btnWidth, posy+offsety);
        btnReverse.mousePressed(algo.reverse);
    };
    
    p.draw = () => {
        p.background(220);
        algo.draw();
    };
}

class LinkedList extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <P5Wrapper sketch={sketch} settings={this.context}></P5Wrapper>
        );
    }
}

LinkedList.contextType = context;

export default LinkedList;