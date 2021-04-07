import React from 'react';
import p5 from 'p5';
import P5Wrapper from 'react-p5-wrapper';

function sketch (p) {

  var first=15;
  var second=0;
  var third=0;
  var poped=0;

  var count=18;
  
  var dirX = -30;
  var dirY = -30;
  var x=1;
  
  p.setup = function () {
    p.createCanvas(1000, 800, p.WEBGL);
    p.frameRate(30);
    
    p.push_f_Button = p.createButton('Push');
    p.push_f_Button.position(340,850);
    p.push_f_Button.mousePressed(p.push_f_Stack);
    
    p.pop_f_Button = p.createButton('Pop');
    p.pop_f_Button.position(510,850);
    p.pop_f_Button.mousePressed(p.pop_f_Stack);

    p.push_s_Button = p.createButton('Push');
    p.push_s_Button.position(670,850);
    p.push_s_Button.mousePressed(p.push_s_Stack);
    
    p.pop_s_Button = p.createButton('Pop');
    p.pop_s_Button.position(830,850);
    p.pop_s_Button.mousePressed(p.pop_s_Stack);

    p.push_t_Button = p.createButton('Push');
    p.push_t_Button.position(990,850);
    p.push_t_Button.mousePressed(p.push_t_Stack);
    
    p.pop_t_Button = p.createButton('Pop');
    p.pop_t_Button.position(1160,850);
    p.pop_t_Button.mousePressed(p.pop_t_Stack);
  };

  p.draw = function () {
    p.background(200);
    p.ambientLight(100, 100, 100);
    

    if(p.frameCount%90==0)
    {
      x=x*-1;
    }
    dirX=dirX+x*0.5;
    dirY=dirY+x*0.5;

    p.push();
    p.translate(-400, 350, -200);
    for(var i=0;i<first;i++)
    {
      p.directionalLight(3*(i+1), 0*(i+1), 3*(i+1),-dirX,0,-2);
      p.translate(0, -30, 0);
      p.specularMaterial(250);
      p.cylinder(70, 30,70);
    }
    p.pop();

    p.push();
    p.translate(0, 350, -200);
    for(i=0;i<second;i++)
    {
      p.directionalLight(0, 3*(i+1), 3*(i+1),0,dirY,-2);
      p.translate(0, -30, 0);
      p.specularMaterial(250);
      p.cylinder(70, 50,70);
    }
    p.pop();

    p.push();
    p.translate(400, 350, -200);
    for(i=0;i<third;i++)
    {
      p.directionalLight(3*(i+1), 3*(i+1), 0,dirX,0,-2);
      p.translate(0, -30, 0);
      p.specularMaterial(250);
      p.cylinder(70, 50,70);
    }
    p.pop();

    p.push();
    p.translate(-560, -400, -200);
    for(i=0;i<poped;i++)
    {
      p.directionalLight(255, 255, 255,0,0,-2);
      p.specularMaterial(250);
      p.cylinder(35, 50,70);
      p.translate(80, 0, 0);
    }
    p.pop();

  };

  p.push_f_Stack = function () {
    if(poped>0)
    {
      first++;
      poped--;
    }
  }
  p.push_s_Stack = function () {
    if(poped>0)
    {
      second++;
      poped--;
    }
  }
  p.push_t_Stack = function () {
    if(poped>0)
    {
      third++;
      poped--;
    }
  }

  p.pop_f_Stack = function () {
      if(first>0)
      {
        first--;
        poped++;
      } 
  }
  p.pop_s_Stack = function () {
    if(second>0)
    {
      second--;
      poped++;
    } 
  }
  p.pop_t_Stack = function () {
    if(third>0)
    {
      third--;
      poped++;
    } 
  }
  
};

export default class Canvas extends React.Component{
  render(){
    return(
      <P5Wrapper sketch={sketch}></P5Wrapper>
    );
  }
}