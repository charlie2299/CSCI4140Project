import React from 'react';
import p5 from 'p5';
import P5Wrapper from 'react-p5-wrapper';


function sketch (p) {

  
  var store=[];
  class Node
  {
      constructor(data)
      {
          this.data = data;
          this.left = null;
          this.right = null;
      }
  }

  class BinarySearchTree
  {
    constructor()
    {
        this.root = null;
    }

    getRootNode()
    {
        return this.root;
    }

    insert(data)
    { 
        var newNode = new Node(data);
                          
        if(this.root === null)
            this.root = newNode;
        else
            this.insertNode(this.root, newNode);
    }

    insertNode(node, newNode)
    {
      if(newNode.data < node.data)
      {
  
          if(node.left === null)
          {
            node.left = newNode;
          }
              
          else
              this.insertNode(node.left, newNode); 
      }
      else
      {
          if(node.right === null)
          {
            node.right = newNode;
          }
              
          else
              this.insertNode(node.right,newNode);
      }
    }

    inorder(node)
    {
        if(node !== null)
        {
            this.inorder(node.left);
            store.push(node.data);
            this.inorder(node.right);
        }
    }

  }
    var tree = new BinarySearchTree();
    var cv;
    let theta;
    var ratio=1;
  
  p.setup = function () {
    p.createP("You can adjust the angle between each branch by moving your mouse horizontally, you can also stop or resume the animation by double clicking the mouse.");
  
    p.createCanvas(1200, 800);
    p.frameRate(30);

    p.input = p.createInput("");
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
    p.translate(p.width/2,0);
    p.line(0,0,0,250);
    p.translate(0,250);
    if(tree.getRootNode() !== null )
    {
      p.branch(100,tree.getRootNode(),0,0);   
    }
    
  };

  p.doubleClicked= function () {

    if(p.isLooping())
      p.noLoop();
    else
      p.loop();
  }

  p.branch = function (h,bst,left,right) {
    if(bst.data !== null )
    {
      p.stroke(0,0,0);
      if(left==1)
      {
        p.stroke(0,255,0);
      }
      if(right==1)
      {
        p.stroke(255,0,255);
      }
      p.circle(0,0,25);
      p.text(bst.data, -5, 5);

      if(bst.left !== null)
      {
        p.push();    
        p.stroke(0,255,0);
        if(theta<1.57079633 && theta >0.1)
          p.rotate(theta);  
        else if (theta>1.57079633)
          p.rotate(1.57079633);

        p.line(0, 0, 0, h*ratio);  
        p.translate(0, h*ratio); 
        p.circle(0,0,25);
        p.text(bst.left.data, -5, 5);
        p.branch(h*0.8,bst.left,1,0);        
        p.pop();    
      }

      if(bst.right !== null)
      {
        p.push();
        p.stroke(255,0,255);
        if(theta<1.57079633 && theta >0.1)
          p.rotate(-theta);
        else if (theta>1.57079633)
          p.rotate(-1.57079633);

        p.line(0, 0, 0, h*ratio);     
        p.translate(0, h*ratio); 
        p.circle(0,0,25);
        p.text(bst.right.data, -5, 5);
        p.branch(h*0.8,bst.right,0,1);        
        p.pop();
      }
    }
      
    
  }
  
  p.change_Length=function(){

    if(parseInt(p.input.value())>=0 && parseInt(p.input.value())<99){
      tree.insert( parseInt(p.input.value()));
      
      store=[];
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