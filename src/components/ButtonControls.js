import React from 'react';
import { Row, Col, Button, Typography, Tag, Switch, Space } from 'antd';

const { CheckableTag } = Tag;
const { Title } = Typography;

class ButtonCrontrols extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            disableStepButton: true,
        };
    }

    toggleStepMode = () => {
        this.setState({ disableStepButton: (this.state.disableStepButton ? false : true)});
        this.props.handleStop();
    }

    render(){
        return(
            <>
            <Row gutter={[24, 24]} align="middle">
                <Col span={4}>
                    <Button type="danger" block={true} onClick={() => this.props.handleStop()}>Stop</Button>
                </Col>
                <Col span={4}>
                    <Button type="success" block={true} onClick={() => this.props.handleResume()} style={{backgroundColor: "#52c41a", color: "#ffffff"}}>Resume</Button>
                </Col>
                <Col span={4}>
                    <Button type="primary" block={true} onClick={() => this.props.handleRestart()}>Restart</Button>
                </Col>
                <Col span={12}>
                    <Space>
                    <Title level={3} type="success">Step Mode <Switch onChange={this.toggleStepMode}></Switch></Title>
                    <Button type="primary" block={true} disabled={this.state.disableStepButton} shape="round" onClick={() => this.props.handleStep()} >Next Step</Button>
                    </Space>
                </Col>
            </Row>
            </>
        );
    }
}

export default ButtonCrontrols;