import React from 'react';
import { contextSettings } from '../Context';
import { Row, Col, InputNumber, Typography, Space} from 'antd';

const { Link, Title, Text } = Typography;

class UserInputs extends React.Component{
    render(){
        return(
            <Row gutter={[24,24]} align="bottom" style={{marginTop: 8}}>
                <Col span={10}>
                    <Space>
                        <Title level={3} type="secondary" style={{margin: 0}}><Link>Number Of Elements</Link></Title>
                        <InputNumber
                            min={1}
                            max={150}
                            defaultValue={contextSettings.numberOfElements}
                            onChange={(value) => this.props.handleNumberofElements(value)}
                        >
                        </InputNumber>
                        <Title level={5} style={{margin: 0}}>(Sorting/LinkedList)</Title>
                    </Space>
                </Col>
            </Row>
        );
    }
}

export default UserInputs;