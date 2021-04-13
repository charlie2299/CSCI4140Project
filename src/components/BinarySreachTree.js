import React from 'react';
import p5 from 'p5';
import P5Wrapper from 'react-p5-wrapper';

function sketch (p) {

    let theta;
    var count=0;
    var length=100;
    var ratio=1;
    var interchange=1;
  
  p.setup = function () {
    p.createP("Below is a animation shown the structure of a balanced binary tree.");
    p.createP("You can adjust the angle between each branch by moving your mouse horizontally, you can also stop or resume the animation by double clicking the mouse.");
    p.createCanvas(1200, 800);
    p.frameRate(30);

    p.input = p.createInput("100");
    p.input.position(300,250);
    p.push_Button = p.createButton('Length of lines (Range:4-220)');
    p.push_Button.position(p.input.x + p.input.width,250);
    p.push_Button.mousePressed(p.change_Length);

    p.change_Button = p.createButton("Show Interchange");
    p.change_Button.position(p.input.x ,310);
    p.change_Button.mousePressed(p.showInter);
    

  };

  p.draw = function () {
    p.background(60);
    p.stroke(51,0,25);
    count=0;
    let a = (p.mouseX / p.width) * 90;
    theta = p.radians(a);
    p.translate(p.width/2,p.height);
    p.line(0,0,0,-250);
    p.translate(0,-250);
    p.branch(length,count);
    
  };

  p.doubleClicked= function () {
    if(p.isLooping())
      p.noLoop();
    else
      p.loop();
  }

  p.branch = function (h,count) {
    h *= 0.666;
    count++;
    if (h > 2) {
        p.push();    // Save the current state of transformation (i.e. where are we now)
        p.rotate(theta);  // Rotate by theta
        p.stroke(0,255,0);
        if(length<100)
          ratio=2.5;
        else if(count<2 || h<3)
          ratio=1.5;
        else
          ratio=1;
        p.line(0, 0, 0, -h*ratio);  // Draw the branch
        if(interchange>0)
        {
          p.stroke(0,0,0);
          p.circle(0, 0, 3);
        }
        p.translate(0, -h*ratio); // Move to the end of the branch
        p.branch(h,count);       // Ok, now call myself to draw two new branches!!
        p.pop();     // Whenever we get back here, we "pop" in order to restore the previous matrix state
    
        // Repeat the same thing, only branch off to the "left" this time!
        p.push();
        p.stroke(0,255,0);
        p.rotate(-theta);
        if(length<100)
          ratio=2.5;
        else if(count<2 || h<3)
          ratio=1.5;
        else
          ratio=1;
        p.line(0, 0, 0, -h*ratio);  // Draw the branch
        if(interchange>0)
        {
          p.stroke(0,0,0);
          p.circle(0, 0, 3);
        }
        p.translate(0, -h*ratio); // Move to the end of the branch
        p.branch(h,count);
        p.pop();
      }
  }
  
  p.change_Length=function(){

    if(parseInt(p.input.value())<=220 && parseInt(p.input.value())>=4 )
      length=p.input.value();
  }

  p.showInter=function(){
    interchange*=-1;
  }

};

export default class Canvas extends React.Component{
  render(){
    return(
      <P5Wrapper sketch={sketch}></P5Wrapper>
    );
  }
}