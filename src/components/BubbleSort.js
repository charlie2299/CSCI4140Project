import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import { context, canvasSize } from '../Context';

function arr(){
  this.values = [];
}

function sketch (p) {
  let rotation = 0;
  var obj;
  let i = 0;
  let j = 0;
  let width = canvasSize.width, height= canvasSize.height;
  
  function init(){
    obj = new arr();
    for(let i = 0; i < width/8; i++){
      obj.values.push(p.random(height));
    }
  }

  p.myCustomRedrawAccordingToNewPropsHandler = function(props){
    p.frameRate(props.settings.frameRate);
    if(props.settings.paused){
      p.noLoop();
    }else{
      p.loop();
    }
    if(props.settings.restart){
      init();
      if(!p.isLooping()){
        p.redraw();
      }
    }
  }

  function bubbleSort(){
    for(let k = 0;k<8;k++){
      if(i<obj.values.length){
        let temp = obj.values[j];
        if(obj.values[j] > obj.values[j+1]){
          obj.values[j] = obj.values[j+1];
          obj.values[j+1] = temp;
        }
        j++;
        
        if(j>=obj.values.length-i-1){
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
    for(let i = 0;i<obj.values.length;i++){
      p.stroke(100, 143, 143);
      p.fill(50);
      p.rect(i*8 , height, 8, -obj.values[i],20);
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