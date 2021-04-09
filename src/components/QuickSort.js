import React from 'react';
import { context, canvasSize } from "../Context";

class QuickSort extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let settings = this.context;
        return(
            <div>quicksort</div>
        );
    }
}

QuickSort.contextType = context;

export default QuickSort;