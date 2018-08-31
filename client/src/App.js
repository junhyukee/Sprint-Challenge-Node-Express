import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Projects from './Projects';
import ProjectForm from './ProjectForm';
import './App.css';

class App extends Component {
  	render() {
		return (
		  	<div className="App">
				<Route exact path="/projects" component={Projects} />
				<Switch>
					<Route path="/projects/add" component={ProjectForm} />
				</Switch>

		  	</div> 
		);
  	}
}

export default App;
