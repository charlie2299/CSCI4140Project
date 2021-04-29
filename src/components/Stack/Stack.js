import React from 'react';
import p5 from 'p5';
import P5Wrapper from 'react-p5-wrapper';

function sketch (p) {

  var first=6;
  var second=0;
  var third=0;
  var poped=0;

  var empty=[[],[]];
  var first_stack=[[],[]];
  var second_stack=[[],[]];
  var third_stack=[[],[]];
  
  var dirX = -30;
  var dirY = -30;
  var x=1;
  var err;
  
  p.setup = function () {
    p.createP("The Hano Tower is similar to an normal stack with some contraints.<br>"+
    "For an normal stack, the data in the stack in can be poped or pushed without compare them.");
    p.createCanvas(1050, 800, p.WEBGL);
    p.frameRate(30);

    for(var i =1;i<=15;i++)
    {
      first_stack[0].push([i*15,i*16,i*17]);
      first_stack[1].push(180-i*10);
    }

    p.push_f_Button = p.createButton('Push');
    p.push_f_Button.position(340,900);
    p.push_f_Button.mousePressed(p.push_f_Stack);
    
    p.pop_f_Button = p.createButton('Pop');
    p.pop_f_Button.position(530,900);
    p.pop_f_Button.mousePressed(p.pop_f_Stack);

    p.push_s_Button = p.createButton('Push');
    p.push_s_Button.position(670,900);
    p.push_s_Button.mousePressed(p.push_s_Stack);
    
    p.pop_s_Button = p.createButton('Pop');
    p.pop_s_Button.position(860,900);
    p.pop_s_Button.mousePressed(p.pop_s_Stack);

    p.push_t_Button = p.createButton('Push');
    p.push_t_Button.position(990,900);
    p.push_t_Button.mousePressed(p.push_t_Stack);
    
    p.pop_t_Button = p.createButton('Pop');
    p.pop_t_Button.position(1160,900);
    p.pop_t_Button.mousePressed(p.pop_t_Stack);
    
    p.createP("State:");
    err = p.createP("");

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
    p.translate(-400, 350, -300);
    for(var i=0;i<first;i++)
    {
      p.directionalLight(5*(i+1), 0*(i+1), 5*(i+1),-dirX,0,-2);
      p.translate(0, -60, 0);
      p.specularMaterial(first_stack[0][i]);
      p.cylinder(first_stack[1][i], 60,70);
    }
    p.pop();

    p.push();
    p.translate(0, 350, -300);
    p.box(1100, 50, 500);
    for(i=0;i<second;i++)
    {
      p.directionalLight(0, 5*(i+1), 5*(i+1),0,dirY,-2);
      p.translate(0, -40, 0);
      p.specularMaterial(second_stack[0][i]);
      p.cylinder(second_stack[1][i], 60,70);
    }
    p.pop();

    p.push();
    p.translate(400, 350, -300);
    for(i=0;i<third;i++)
    {
      p.directionalLight(5*(i+1), 5*(i+1), 0,dirX,0,-2);
      p.translate(0, -40, 0);
      p.specularMaterial(third_stack[0][i]);
      p.cylinder(third_stack[1][i], 60,70);
    }
    p.pop();

    p.push();
    p.translate(-0, -400, -200);
    for(i=0;i<poped;i++)
    {
      p.directionalLight(10, 10, 10,0,0,-2);
      p.specularMaterial(empty[0][0]);
      p.cylinder(empty[1][0], 40,70);
    }
    p.pop();

  };

  p.push_f_Stack = function () {
    if(poped==1)
    {
        first++;
        poped=0;
        first_stack[0][first-1]=empty[0][0];
        first_stack[1][first-1]=empty[1][0];
        err.html("Success Push");
    }
    else
      err.html("No poped block");
  }
  p.push_s_Stack = function () {
    if(poped==1)
    {
        second++;
        poped=0;
        second_stack[0][second-1]=empty[0][0];
        second_stack[1][second-1]=empty[1][0];
        err.html("Success Push");
    }
    else
      err.html("No poped block");
  }
  p.push_t_Stack = function () {
    if(poped==1)
    {
        third++;
        poped=0;
        third_stack[0][third-1]=empty[0][0];
        third_stack[1][third-1]=empty[1][0];
        err.html("Success Push");
    }
    else
      err.html("No poped block");
  }

  p.pop_f_Stack = function () {
    if(first>0)
    {
      if(poped==0)
      {
        first--;
        poped=1;
        empty=[[first_stack[0][first]],[first_stack[1][first]]];
        err.html("Success Pop");
      }
      else
        err.html("One block is already is poped");
    }
    else
        err.html("Empty Stack");
  }
  p.pop_s_Stack = function () {
    if(second>0)
    {
      if(poped==0)
      {
        second--;
        poped=1;
        empty=[[second_stack[0][second]],[second_stack[1][second]]];
        err.html("Success Pop");
      }
      else
        err.html("Empty Stack");
    }
    else
      err.html("Empty Stack");
  }
  
  p.pop_t_Stack = function () {
    if(third>0)
    {
      if(poped==0)
      {
        third--;
        poped=1;
        empty=[[third_stack[0][third]],[third_stack[1][third]]];
        err.html("Success Pop");
      }
      else
        err.html("One block is already is poped");
    } 
    else
        err.html("Empty Stack");
  }
};

export default class Canvas extends React.Component{
  render(){
    return(
      <P5Wrapper sketch={sketch}></P5Wrapper>
    );
  }
}