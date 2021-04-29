import React from 'react';
import p5 from 'p5';
import P5Wrapper from 'react-p5-wrapper';

function sketch (p) {

    p.linked=[];
    var count=0;
    let gravity = 9.0;
    let mass = 2.0;

    var err;
    var length;
    
     p.setup = function() {
      p.createCanvas(900, 800);
      p.fill(255, 126);
      // Inputs: x, y, mass, gravity
      
      p.s1 = new p.Spring2D(0.0, 10 / 2, mass, gravity);
      p.linked.push(p.s1);

      p.push_Button = p.createButton('Push');
      p.push_Button.position(300,200);
      p.push_Button.mousePressed(p.push_List);
      p.push_Button = p.createButton('Pop');
      p.push_Button.position(1100,200);
      p.push_Button.mousePressed(p.pop_List);
      p.reset_Button = p.createButton('Reset');
      p.reset_Button.position(1100,850);
      p.reset_Button.mousePressed(p.reset_List);

      length = p.createP("Length: 0");
      err = p.createP("State: None.");
    }
    
    p.draw =function () {
      p.background(0);
      p.linked[0].update(p.mouseX, p.mouseY);
      p.linked[0].display(p.mouseX, p.mouseY);
      for(var i=1;i<count;i++)
      {
        p.linked[i].update( p.linked[i-1].x, p.linked[i-1].y);
        p.linked[i].display( p.linked[i-1].x, p.linked[i-1].y);
      }

    }
    
     p.Spring2D =function(xpos, ypos, m, g) {
      this.x = xpos;// The x- and y-coordinates
      this.y = ypos;
      this.vx = 0; // The x- and y-axis velocities
      this.vy = 0;
      this.mass = m;
      this.gravity = g;
      this.radius = 30;
      this.stiffness = 0.2;
      this.damping = 0.7;
      p.temp= p.text("asdasd");
    
      this.update = function(targetX, targetY) {
        let forceX = (targetX - this.x) * this.stiffness;
        let ax = forceX / this.mass;
        this.vx = this.damping * (this.vx + ax);
        this.x += this.vx;
        let forceY = (targetY - this.y) * this.stiffness;
        forceY += this.gravity;
        let ay = forceY / this.mass;
        this.vy = this.damping * (this.vy + ay);
        this.y += this.vy;
      }
    
      this.display = function(nx, ny) {
        p.noStroke();
        if(count>0)
            p.ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
        p.stroke(255);
        p.line(this.x, this.y, nx, ny);
      }
    }
 
    p.push_List = function(){
        p.temp = new p.Spring2D(0.0, 10 / 2, mass, gravity);
        p.linked.push(p.temp);
        count++;
        length.html("Length: "+count);
        err.html("State: Pushed and Linked.");
    }

    p.pop_List = function(){
        if(count>0)
        {
            p.linked.pop(p.temp);
            count--;
            length.html("Length: "+count);
            err.html("State: Poped and Unlink.");
        }
        else
          err.html("State: Empty Link");
    }

    p.reset_List = function(){
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