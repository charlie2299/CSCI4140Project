import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import { context, canvasSize, contextSettings } from '../../Context';
import canvasController from "../canvasController";

function sketch (p) {
  let values = [];
  let i = 0, j = 0;
  let width = canvasSize.width, height= canvasSize.height;
  let columnWidth = width/contextSettings.numberOfElements;
  let speed = columnWidth * 0.1;
  let white = p.color("#ffffff"), black = p.color("#000000"), red = p.color("#ff0303");
  let p1 = j*columnWidth, p2 = (j+1)*columnWidth;

  let init = (numberOfElements) => {
    values = [];
    i = 0; j = 0;
    
    columnWidth = width/numberOfElements;
    speed = columnWidth * 0.1;
    p1 = j*columnWidth; p2 = (j+1)*columnWidth;
    for(let i = 0; i < numberOfElements; i++){
      values.push(p.random(height));
    }
  }

  let cc = new canvasController(p, init);  
  p.myCustomRedrawAccordingToNewPropsHandler = cc.propsHandler;

  function needToSwap(){
    if(i < values.length && values[j] > values[j+1]){
      return true;
    }
    return false;
  }

  function movePtrs(){
    j++;
    p1 = j*columnWidth;
    p2 = (j+1)*columnWidth;
    
    if(j>=values.length-i-1){
      j = 0;
      i++;
    }
  }

  function bubbleSort(){
    if(i < values.length){
      let temp = values[j];
      values[j] = values[j+1];
      values[j+1] = temp;

      movePtrs();
    }
    else{
      p.noLoop();
    }
  }

  function simulateSorting(){
    // swapOnce = false;
    if(needToSwap()) {
      p1 += speed; p2 -= speed;
    }else{
      movePtrs();
    }

    for(let i = 0; i< values.length; i++){
      if(i == j)
      {
        p.fill(black);
        p.strokeWeight(5);
        p.stroke(red);
        p.rect(p1, height, columnWidth, -values[i], 20);
      }
      else if(i == j+1)
      {
        p.strokeWeight(4);
        p.stroke(white);
        p.fill(black);
        p.rect(p2, height, columnWidth, -values[i], 20);
      }
      else{
        p.strokeWeight(1);
        p.stroke(black);
        p.fill(white);
        p.rect(i*columnWidth, height, columnWidth, -values[i], 20);
      }
    }

    if(j*columnWidth+columnWidth <= p1)
    { 
      bubbleSort();
    }
  }

  p.setup = function () {
    p.createCanvas(width, height);
    init(width/columnWidth);
  };

  p.draw = function () {
    p.background(220);
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