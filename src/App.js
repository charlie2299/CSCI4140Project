import React from 'react';
import { Layout, Menu, Breadcrumb, Typography } from 'antd';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import Canvas from './components/Stack';
const { SubMenu } = Menu;
const { Title, Text } = Typography;
const { Header, Sider, Content } = Layout;


class App extends React.Component{
  render(){
  return (
    <Router>
        <Layout>
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/">DEMO</Link></Menu.Item>
                </Menu>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                    >
                    <SubMenu key="sub1"  title="subnav 1">
                        <Menu.Item key="1">option1</Menu.Item>
                        <Menu.Item key="2">option2</Menu.Item>
                        <Menu.Item key="3">option3</Menu.Item>
                        <Menu.Item key="4">option4</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title="subnav 2">
                        <Menu.Item key="5">option5</Menu.Item>
                        <Menu.Item key="6">option6</Menu.Item>
                        <Menu.Item key="7">option7</Menu.Item>
                        <Menu.Item key="8">option8</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" title="subnav 3">
                        <Menu.Item key="9">option9</Menu.Item>
                        <Menu.Item key="10">option10</Menu.Item>
                        <Menu.Item key="11">option11</Menu.Item>
                        <Menu.Item key="12">option12</Menu.Item>
                    </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content style={{ padding: '0 50px', margin: '16px 0'}}>
                        <Canvas></Canvas>
                        {/* <Switch>
                            <Route path="/slideshow">
                                <Slideshow />
                            </Route>
                            <Route path="/file/:id">
                                <Main></Main>
                            </Route>
                            <Route path="/file">
                                <Main></Main>
                            </Route>
                            <Route exact path="/">
                                <Home></Home>
                            </Route>
                            <Route path="*">
                                <NoMatch></NoMatch>
                            </Route>
                        </Switch> */}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </Router>
  );
}
}

export default App;
