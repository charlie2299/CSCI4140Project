import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import { context, contextSettings as settings } from './Context';

import Tower from './components/Stack/HanoTower';
import Stack from './components/Stack/Stack';
import ArrayStack from './components/Stack/ArrayS';
import ListStack from './components//Stack/ListS';

import BalancedBinaryTree from './components/Tree/BalancedBinaryTree';
import UnbalancedBinaryTree from './components/Tree/UnbalancedBinaryTree';
import BinarySreachTree from './components/Tree/BinarySreachTree';
import UserTree from './components/Tree/UserCreate';

import SpeedSlider from './components/SpeedSlider';
import BubbleSort from './components/Sorting/BubbleSort';
import QuickSort from './components/Sorting/QuickSort';
import ButtonCrontrols from './components/ButtonControls';
import UserInputs from './components/UserInputs';
import LinkedList from './components/LinkedList/LinkedList';

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;



class App extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			openKeys: ["Sorting"],
			subMenuTitle: "",
			menuItemTitle: "",
			contextSettings: settings,
			stackAndTreeRoutes: ['tower', 'noraml', 'arrayStack', 'listStack',
								 'binaryTree', 'unbalancedBinaryTree', 'binarySearchTree','createTree']
		};
	}

	handleFrameRateChange = (rate) => {this.setState({contextSettings: { ...this.state.contextSettings, frameRate: rate}});}
	handleRestart = () => { this.setState({contextSettings:{...this.state.contextSettings, restart: true}}, () => this.setState({contextSettings:{...this.state.contextSettings, restart: false}})); }
	handleStop = () => { this.setState({contextSettings:{...this.state.contextSettings, paused: true}}); }
	handleResume = () => { this.setState({contextSettings: {...this.state.contextSettings, paused: false}}); }
	handleStep = () => {this.setState({contextSettings:{...this.state.contextSettings, nextStep: true}}, () => this.setState({contextSettings:{...this.state.contextSettings, nextStep: false}})); }

	handleNumberofElements = (num) => { 
		// console.log(num, typeof(num));
		this.setState({contextSettings: {...this.state.contextSettings, numberOfElements: num, numberOfElementsChanged: true}}, 
									()=> { this.setState({contextSettings: {...this.state.contextSettings, numberOfElementsChanged: false}}); } );  
	}

	handleMenuItemSelected(key){this.setState({menuItemTitle: key});}
	handleSubMenuSelected(key){this.setState({subMenuTitle: key, openKeys: [key], menuItemTitle: ""});}

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
						>
						<SubMenu key="Sorting"  title="Sorting" onTitleClick={(e) => this.handleSubMenuSelected(e.key)}>
							<Menu.Item key="bubblesort"><Link to="/bubblesort">Bubble Sort</Link></Menu.Item>
							<Menu.Item key="quicksort"><Link to="/quicksort">Quick Sort</Link></Menu.Item>
						</SubMenu>
						<SubMenu key="Stack" title="Stack" onTitleClick={(e) => this.handleSubMenuSelected(e.key)}>
							<Menu.Item key="tower"><Link to="/tower">Hano Tower</Link></Menu.Item>
							<Menu.Item key="noraml"><Link to="/noraml">Noraml Stack</Link></Menu.Item>
							<Menu.Item key="arrayStack"><Link to="/arrayStack">Array Implementation</Link></Menu.Item>
							<Menu.Item key="listStack"><Link to="/listStack">Linked List Implementation</Link></Menu.Item>
						</SubMenu>
						<SubMenu key="Tree" title="Binary Tree" onTitleClick={(e) => this.handleSubMenuSelected(e.key)}>
							<Menu.Item key="binaryTree"><Link to="/binaryTree">Balanced Tree</Link></Menu.Item>
							<Menu.Item key="unbalancedBinaryTree"><Link to="/unbalancedBinaryTree">Unbalanced Tree</Link></Menu.Item>
							<Menu.Item key="binarySearchTree"><Link to="/binarySearchTree">Binary Search Tree</Link></Menu.Item>
							<Menu.Item key="createTree"><Link to="/createTree">Create BST</Link></Menu.Item>
							{/* <Menu.Item key="12"><Link to="/createTree">Try it yourself</Link></Menu.Item> */}
						</SubMenu>
						<SubMenu key="linkedlist" title="Linked List" onTitleClick={(e) => this.handleSubMenuSelected(e.key)}>
							<Menu.Item key="constructList"><Link to="/construct-linked-list">Basic</Link></Menu.Item>
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
							<context.Provider value={this.state.contextSettings}>
								{
									this.state.stackAndTreeRoutes.includes(window.location.href.split('/').slice(-1)[0]) ? 
									<div></div> :
									<div style={{paddingBottom: '20px'}}>
									<SpeedSlider handleFrameRateChange={this.handleFrameRateChange}></SpeedSlider>
									<ButtonCrontrols
										handleStop={this.handleStop}
										handleResume={this.handleResume}
										handleRestart={this.handleRestart}
										handleStep={this.handleStep}
									>
									</ButtonCrontrols>
									<UserInputs
										handleNumberofElements={this.handleNumberofElements}
									>
									</UserInputs>
									</div>
									
								}
								
								<Switch>
									<Route exact path="/">
										<BubbleSort />
									</Route>
									<Route path="/bubblesort">
										<BubbleSort />
									</Route>
									<Route path="/quicksort">
										<QuickSort />
									</Route>
									<Route path="/tower">
										<Tower></Tower>
									</Route>
									<Route path="/noraml">
										<Stack></Stack>
									</Route>
									<Route path="/arrayStack">
										<ArrayStack></ArrayStack>
									</Route>
									<Route path="/listStack">
										<ListStack></ListStack>
									</Route>
									<Route path="/binaryTree">
										<BalancedBinaryTree></BalancedBinaryTree>
									</Route>
									<Route path="/unbalancedBinaryTree">
										<UnbalancedBinaryTree></UnbalancedBinaryTree>
									</Route>
									<Route path="/binarySearchTree">
										<BinarySreachTree></BinarySreachTree>
									</Route>
									<Route path="/createTree">
										<UserTree></UserTree>
									</Route>
									<Route path="/construct-linked-list">
										<LinkedList></LinkedList>
									</Route>
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
