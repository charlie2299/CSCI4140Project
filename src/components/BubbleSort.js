import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import { context, canvasSize } from '../Context';

function sketch (p) {
  let rotation = 0;
  var values = [];
  let i = 0;
  let j = 0;
  let width = canvasSize.width, height= canvasSize.height;

  p.myCustomRedrawAccordingToNewPropsHandler = function(props){
    p.frameRate(props.settings.frameRate);
  }

  function bubbleSort(){
    for(let k = 0;k<8;k++){
      if(i<values.length){
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

    for(let i = 0; i < width/8; i++){
      values.push(p.random(height));
    }
  };

  p.draw = function () {
    p.background(220);
    bubbleSort();
    simulateSorting();
    // p.stroke(255, 204, 100);
    // p.strokeWeight(4);
    // p.fill(50)
    // p.rect(width/2, 0, 100, 100);
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