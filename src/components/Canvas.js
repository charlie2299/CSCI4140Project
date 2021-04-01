import React from 'react';
import p5 from 'p5';
import P5Wrapper from 'react-p5-wrapper';

function sketch (p) {
  let rotation = 0;
  var rain = [];
  var number;
  var colorPicker;

  function Rain() {
    this.x = p.random(-800, p.width)
    this.y = p.random(-1600, 0)
    // use this.z extacly one variable to determine all other variables including this.yspeed, this.len, this.gravity and strokeWeight
    this.z = p.random(0, 20)
    //this.yspeed = random(5, 10)
    this.yspeed = p.map(this.z, 0, 20, 5, 10)
    this.len = p.map(this.z, 0, 20, 10, 20)
    
    
  
    this.update = () => {
      this.y = this.y + this.yspeed
      this.gravity = p.map(this.z, 0, 20, 0.01, 0.1)
      this.yspeed += this.gravity
      if (this.y > p.height) {
        this.y = p.random(-1600, 0)
        this.yspeed = p.map(this.z, 0, 20, 5, 10)
      }
    }
  
    this.show = () => {
      p.strokeWeight(p.map(this.z, 0, 20, 2, 4))
      p.stroke(colorPicker.color())
      p.line(this.x, this.y, this.x, this.y + this.len)
    }
  };

  p.setup = function () {
    p.createCanvas(800, 800, p.WEBGL);
    number = 400
    colorPicker = p.createColorPicker("#4287f5")
    for (var i = 0; i < number; i++) {
      rain.push(new Rain())
    }
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props.rotation !== null){
      rotation = props.rotation * Math.PI / 180;
    }
  };

  p.draw = function () {
    p.background(224, 232, 245);
    for (var i = 0; i < number; i++) {
      rain[i].update()
      rain[i].show()
    }
  };
  
};

export default class Canvas extends React.Component{
  render(){
    return(
      <P5Wrapper sketch={sketch}></P5Wrapper>
    );
  }
}