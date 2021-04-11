import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import { context, canvasSize } from '../Context';
import canvasController from "./canvasController";

function sketch (p) {
  let values = [];
  let i = 0;
  let j = 0;
  let width = canvasSize.width, height= canvasSize.height;

  let init = () => {
    values = [];
    for(let i = 0; i < width/8; i++){
      values.push(p.random(height));
    }
    i = 0; j = 0;
  }

  let cc = new canvasController(p, init);  
  p.myCustomRedrawAccordingToNewPropsHandler = cc.propsHandler;

  function bubbleSort(){
    for(let k = 0;k<8;k++){
      if(i < values.length){
        let temp = values[j];
        if(values[j] > values[j+1]){
          values[j] = values[j+1];
          values[j+1] = temp;
        }
        j++;
        
        if(j>=values.length-i-1){
          j = 0;
          i++;
        }
      }
      else{
        p.noLoop();
      }
    }
  }

  function simulateSorting(){
    for(let i = 0;i<values.length;i++){
      p.stroke(100, 143, 143);
      p.fill(50);
      p.rect(i*8 , height, 8, -values[i],20);
     }
  }

  p.setup = function () {
    p.createCanvas(width, height);
    init();
  };

  p.draw = function () {
    p.background(220);
    bubbleSort();
    simulateSorting();
  };
  
};

class BubbleSort extends React.Component{
  render(){
    return(
      <P5Wrapper sketch={sketch} settings={this.context} ></P5Wrapper>
    );
  }
}

BubbleSort.contextType = context;

export default BubbleSort;