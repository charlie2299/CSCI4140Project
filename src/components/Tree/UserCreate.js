import React from 'react';
import p5 from 'p5';
import P5Wrapper from 'react-p5-wrapper';

function sketch (p) {

    var stored=[''];
    let theta;
    var left=0;
    var right=0;
    var count=0;
    var length=100;
    var ratio=1;
    var interchange=1;
  
  p.setup = function () {
  
    p.createCanvas(1200, 800);
    p.frameRate(30);

    p.input = p.createInput("100");
    p.input.position(300,250);
    p.push_Button = p.createButton('Insert (Range:0-99)');
    p.push_Button.position(p.input.x + p.input.width,250);
    p.push_Button.mousePressed(p.change_Length);    

  };

  p.draw = function () {
    p.background(60);
    p.stroke(51,0,25);

    let a = (p.mouseX / p.width) * 90;
    theta = p.radians(a);
    p.translate(p.width/2,p.height);
    p.line(0,0,0,-250);
    p.translate(0,-250);
    p.branch(100,left,right);    
    
  };

  p.doubleClicked= function () {
    if(p.isLooping())
      p.noLoop();
    else
      p.loop();
  }

  p.branch = function (h,left,right) {
    if(h==100)
    {
      p.circle(0,0,25);
      p.text(stored[0].toString(), -5, 5);
    }
    else
    {
      for(var i=0;i<count;i++)
      {
        if(i<count && parseInt(p.input.value()>stored[i]))
          right++;
        else
          left++;
      }
    }
    if(left>1 || right >1)
      h *= 0.8;
    if (h > 2 && (left>0 || right >0)) {

        if(left>0)
        {
          p.push();    // Save the current state of transformation (i.e. where are we now)
          left--;
          p.rotate(theta);  // Rotate by theta
          p.stroke(0,255,0);
          p.line(0, 0, 0, -h*ratio);  // Draw the branch
          p.translate(0, -h*ratio); // Move to the end of the branch
          p.circle(0,0,25);
          p.text(p.input.value(), -5, 5);
          p.branch(h,left,0);       // Ok, now call myself to draw two new branches!!
          p.pop();     // Whenever we get back here, we "pop" in order to restore the previous matrix state
        } 
        
        if(right>0)
        {
          p.push();
          right--;
          p.rotate(-theta);  // Rotate by theta
          p.stroke(0,255,0);
          p.line(0, 0, 0, -h*ratio);  // Draw the branch     
          p.translate(0, -h*ratio); // Move to the end of the branch
          p.circle(0,0,25);
          p.text(p.input.value(), -5, 5);
          p.branch(h,0,right);       // Ok, now call myself to draw two new branches!!
          p.pop();
        }
        
      }
  }
  
  p.change_Length=function(){
    count++;
    if(stored[0]==0)
    {
      stored[0]=parseInt(p.input.value());
    }

//left+=1;
    //if(parseInt(p.input.value())<=220 && parseInt(p.input.value())>=4 )
      //length=p.input.value();
  }


  

};

export default class Canvas extends React.Component{
  render(){
    return(
      <P5Wrapper sketch={sketch}></P5Wrapper>
    );
  }
}