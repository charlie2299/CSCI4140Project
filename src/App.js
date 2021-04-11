import React from 'react';
import { Layout, Menu, Breadcrumb, Typography, Row, Col } from 'antd';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';

import { context, contextSettings } from './Context';
import SpeedSlider from './components/SpeedSlider';
import BubbleSort from './components/BubbleSort';
import QuickSort from './components/QuickSort';
import ButtonCrontrols from './components/ButtonControls';

const { SubMenu } = Menu;
const { Title, Text } = Typography;
const { Header, Sider, Content } = Layout;



class App extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			frameRate: 10,
			openKeys: ["Sorting"],
			subMenuTitle: "",
			menuItemTitle: "",
			paused: false,
			stepMode: false,
			restart: false,
			nextStep: false,
		};
	}

	handleRestart = () => { this.setState({restart: true}, () => this.setState({restart: false})); }
	handleStop = () => { this.setState({paused: true}); }
	handleResume = () => { this.setState({paused: false}); }
	handleStep = () => {this.setState({nextStep: true}, () => this.setState({nextStep: false})); }

	handleFrameRateChange = (rate) => {
		console.log("frame change", rate);
		this.setState({frameRate: rate}, () => console.log(this.state.frameRate));
	}

	constructCanvasSettings(){
		contextSettings.frameRate = this.state.frameRate;
		contextSettings.paused = this.state.paused;
		contextSettings.stepMode = this.state.stepMode;
		contextSettings.restart = this.state.restart;
		contextSettings.nextStep = this.state.nextStep;

		return contextSettings;
	}

	handleMenuItemSelected(key){
		this.setState({menuItemTitle: key});
	}

	handleSubMenuSelected(key){
		this.setState({subMenuTitle: key, openKeys: [key], menuItemTitle: ""});
	}

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
						openKeys={this.state.openKeys}
						defaultOpenKeys={this.state.openKeys}
						style={{ height: '100%', borderRight: 0 }}
						onSelect={(e) => this.handleMenuItemSelected(e.key)}
						// onOpenChange={(openKeys) => this.handleSubMenuSelected(openKeys)}
						>
						<SubMenu key="Sorting"  title="Sorting" onTitleClick={(e) => this.handleSubMenuSelected(e.key)}>
							<Menu.Item key="bubblesort"><Link to="/bubblesort">Bubble Sort</Link></Menu.Item>
							<Menu.Item key="quicksort"><Link to="/quicksort">Quick Sort</Link></Menu.Item>
							<Menu.Item key="3"><Link to="/">??Sort</Link></Menu.Item>
							<Menu.Item key="4"><Link to="/">??Sort</Link></Menu.Item>
						</SubMenu>
						<SubMenu key="sub2" title="subnav 2" onTitleClick={(e) => this.handleSubMenuSelected(e.key)}>
							<Menu.Item key="5">option5</Menu.Item>
							<Menu.Item key="6">option6</Menu.Item>
							<Menu.Item key="7">option7</Menu.Item>
							<Menu.Item key="8">option8</Menu.Item>
						</SubMenu>
						<SubMenu key="sub3" title="subnav 3" onTitleClick={(e) => this.handleSubMenuSelected(e.key)}>
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
						{this.state.subMenuTitle.length != 0 ? <Breadcrumb.Item>{this.state.subMenuTitle}</Breadcrumb.Item> : <></>}
						{this.state.menuItemTitle.length != 0 ? <Breadcrumb.Item>{this.state.menuItemTitle}</Breadcrumb.Item> : <></>}
						</Breadcrumb>

						<Content style={{ padding: '0 50px', margin: '16px 0'}}>
							<context.Provider value={this.constructCanvasSettings()}>
								<div style={{paddingBottom: '20px'}}>
									<SpeedSlider handleFrameRateChange={this.handleFrameRateChange}></SpeedSlider>
									<ButtonCrontrols
										handleStop={this.handleStop}
										handleResume={this.handleResume}
										handleRestart={this.handleRestart}
										handleStep={this.handleStep}
									>
									</ButtonCrontrols>
								</div>
								<Switch>
									<Route path="/bubblesort">
										<BubbleSort />
									</Route>
									<Route path="/quicksort">
										<QuickSort />
									</Route>
									{/* <Route exact path="/">
										<Home></Home>
									</Route>
									<Route path="*">
										<NoMatch></NoMatch>
									</Route> */}
								</Switch>
							</context.Provider>
						</Content>
					</Layout>
				</Layout>
			</Layout>
    </Router>
  );
}
}

export default App;
