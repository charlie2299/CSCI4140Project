import React from 'react';
import { Row, Col, Button, Typography, Tag, Switch } from 'antd';

const { CheckableTag } = Tag;
const { Title } = Typography;

class ButtonCrontrols extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <>
            <Row gutter={[24, 24]}>
                <Col span={4}>
                    <Button type="danger" block={true} onClick={() => this.props.handleStop()}>Stop</Button>
                </Col>
                <Col span={4}>
                    <Button type="success" block={true} onClick={() => this.props.handleResume()} style={{backgroundColor: "#52c41a", color: "#ffffff"}}>Resume</Button>
                </Col>
                <Col span={4}>
                    <Button type="primary" block={true} onClick={() => this.props.handleRestart()}>Restart</Button>
                </Col>
            </Row>
            <Row align="middle">
                <Col><Title level={3}>Step Mode</Title></Col>
                <Col><Switch ></Switch></Col>
            </Row>
            </>
        );
    }
}

export default ButtonCrontrols;