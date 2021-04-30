import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import { context, canvasSize, contextSettings } from '../../Context';
import canvasController from "../canvasController";
import Canvas from '../Canvas';

function AlgoQuickSort(nums, canvasWidth, canvasHeight, p){
    
    this.nums = nums;
    this.states = []; for(let i = 0; i < this.nums.length; i++) this.states[i] = 0;
    this.width = canvasWidth;
    this.height = canvasHeight;
    this.i = 0; this.j = 0; this.pivotIndex = 0; this.cur = 0;
    this.columnWidth = this.width/(this.nums.length);
    let white = p.color("#ffffff"), black = p.color("#000000"), red = p.color("#ff0303"), blue = p.color("#03cafc");

    this.sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    this.draw = () => {
        for(let k = 0; k < this.nums.length; k++){
            if(this.states[k] == 1){
                p.fill(black);
                p.strokeWeight(5);
                p.stroke(red);
            }
            else if(this.states[k] == 2){
                p.fill(blue);
                p.strokeWeight(4);
                p.stroke(white);
            }else{
                p.fill(white);
                p.strokeWeight(2);
                p.stroke(black);
            }
            p.rect(k*this.columnWidth, this.height, this.columnWidth, -this.nums[k]);        
        }
    }

    this.swap = async (p1, p2) => {
        await this.sleep(100);
        let tmp = this.nums[p1];
        this.nums[p1] = this.nums[p2];
        this.nums[p2] = tmp;
    }

    this.partition = async (l, r) => {
        this.states[r] = 1; 
        let cur = l, left = l, right = r;
        for(let i = left; i < right; i++) this.states[i] = 2;

        while(cur < r){
            this.states[cur] = 1;
            if(this.nums[cur] < this.nums[r]){
                await this.swap(cur, l++); 
            }
            this.states[cur] = 2;
            cur++;
            
        }
        await this.swap(l, r);
        this.states[r] = 0;
        for(let i = left; i < right; i++) this.states[i] = 0;
        
        return l;
    }

    this.sort = async (l, r) => {
        if(l < r){
            let index = await this.partition(l, r);

            await this.sort(l, index-1);
            await this.sort(index+1, r);
        }
    }

    // this.simulateSorting = async (l, r) => {
    //     if(l < r){
    //         this.draw();
    //         let index = await this.partition(l, r);
    //         await this.simulateSorting(l, index-1);
    //         await this.simulateSorting(index+1, r);
    //     }
    // }
}

function sketch(p) {
    // declare objects
    let algo = undefined, canvas = undefined, nums = [];

    let init = (numberOfElements, inorder=false) =>{
        if(numberOfElements === undefined) numberOfElements = contextSettings.numberOfElements;
        canvas = new Canvas(canvasSize.width, canvasSize.height, numberOfElements);
        p.createCanvas(canvas.width, canvas.height);
        nums = [];
        if(inorder){
            let offset = canvas.height/canvas.numberOfElements;
            for(let i = 0; i < canvas.numberOfElements; i++){
                nums.push(canvas.height-i*offset);
            }
        }else{
            for(let i = 0; i < canvas.numberOfElements; i++) {nums.push(p.random(canvas.height));}
        }
        algo = new AlgoQuickSort(nums, canvas.width, canvas.height, p);
        algo.sort(0, nums.length-1);
        // initialize other variable members here...
    }

    // add controller 
    let cc = new canvasController(p, init);  
    p.myCustomRedrawAccordingToNewPropsHandler = cc.propsHandler;

    let handleWorstCase = () => {
        init(contextSettings.numberOfElements, true);
    }

    p.setup = () => {
        init(contextSettings.numberOfElements);
        let canvas = document.getElementById("defaultCanvas0");
        let posy = canvas.offsetTop, posx = canvas.offsetLeft, offsety = 50, btnWidth = 70;
        let btnWorstCase = p.createButton('Worst Case');
        btnWorstCase.position(posx+btnWidth*1*2, posy+offsety);
        console.log(posx, btnWidth);
        btnWorstCase.mousePressed(handleWorstCase);
    };
    
    p.draw = () => {
        p.background(220);
        algo.draw();
    };
}

class QuickSort extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <P5Wrapper sketch={sketch} settings={this.context}></P5Wrapper>
        );
    }
}

QuickSort.contextType = context;

export default QuickSort;