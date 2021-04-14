import React from 'react';
import p5 from 'p5';
import P5Wrapper from 'react-p5-wrapper';

function sketch (p) {

  var count=0;
  var origin=0;

  p.stored=[];
  p.list=[];

  p.setup = function () {
    p.createCanvas(2000, 500 , p.WEBGL);

    p.length = p.createInput();
    p.length.position(250,150);
    p.vol_Button = p.createButton('Init Array Length');
    p.vol_Button.position(p.length.x + p.length.width,150);
    p.vol_Button.mousePressed(p.initLength);
    p.warn=p.createP("Min: 1 Max: 15");
    p.warn.position(p.vol_Button.x + 10 + p.vol_Button.width,150);

    p.state=p.createP("State: None");
    p.stackLength=p.createP("Length: 0");

  };

  p.draw = function () {
    //p.ambientLight(100, 100, 100);

  };

  p.initLength = function(){
    if(parseInt(p.length.value())<=15 && parseInt(p.length.value())>0)
    {
      origin=parseInt(p.length.value());

      p.pop();
      p.translate(-1022, -122, 0);
      for(var i =0;i<parseInt(p.length.value());i++)
      {
        p.translate(50, 0, 0);
        p.list.push(p.box(50,50,1));    
      }
      p.push();
      p.length.remove();
      p.vol_Button.remove();
      p.warn.remove();

      p.input = p.createInput();
      p.input.position(220,150);
      p.push_Button = p.createButton('Push');
      p.push_Button.position(p.input.x + p.input.width,150);
      p.push_Button.mousePressed(p.push_Stack);
      p.max=p.createP("Max: 3-length string");
      p.max.position(p.push_Button.x + 10 + p.push_Button.width,150);
      
      p.pop_Button = p.createButton('Pop');
      p.pop_Button.position(580,150);
      p.pop_Button.mousePressed(p.pop_Stack);
      
      p.reset_Button = p.createButton('Reset All');
      p.reset_Button.position(680,150);
      p.reset_Button.mousePressed(p.reset);

      p.stackLength.html("Length: "+p.length.value());
    }

  }
  p.push_Stack = function(){
    if(count<parseInt(p.length.value()) && p.input.value().length<4)
    {    
      p.temp = p.createP(p.input.value());
      p.temp.position(count*50+295, 250);
      p.stored.push(p.temp);
      count++;

      var length =parseInt(p.length.value());
      if(count==length && length*2<=30)
      {
        p.pop();
        for(var i =length;i<2*length;i++)
        {
          p.translate(50, 0, 0);
          p.list.push(p.box(50,50,1));
        }
        p.push();
        p.length.value((length*2).toString());
        p.state.html("State: Pushed ["+p.input.value()+"] and Doubled the size of array");
        p.stackLength.html("Length: "+p.length.value());
      }
      else
        p.state.html("State: Pushed ["+p.input.value()+"].");

      if(length*2>30)
      {
        p.state.html("State: Pushed ["+p.input.value()+"] and No doubled the size of array due to limit size(30).");
      }
    }

  }

  p.pop_Stack = function(){
    if(count>0)
    {
      p.temp=p.stored.pop();
      p.state.html("State: Poped array["+(count-1)+"].");
      p.temp.remove();
      count--;
    }
    else
      p.state.html("State: Empty Stack.");
  }

  p.reset = function(){
    window.location.reload();
  }
 
};

export default class Canvas extends React.Component{
  render(){
    return(
      <P5Wrapper sketch={sketch}></P5Wrapper>
    );
  }
}