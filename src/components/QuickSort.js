import React from 'react';
import { context } from "../Context";

class QuickSort extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let settings = this.context;
        console.log("settings", settings);
        return(
            <div>quicksort{settings.width}</div>
        );
    }
}

QuickSort.contextType = context;

export default QuickSort;