import React from 'react';
import { context } from '../Context';
import { Typography, Slider, Row, Col } from 'antd';

const { Link, Title } = Typography;

class SpeedSlider extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Row align="top">
                <Col span={3} style={{textAlign: 'center'}}><Title level={5}><Link>Animation Speed</Link></Title></Col>
                <Col span={20}><Slider defaultValue={this.context.frameRate} onChange={(value) => this.props.handleFrameRateChange(value)} /></Col>
            </Row>
        );
    }
}

SpeedSlider.contextType = context;
export default SpeedSlider;