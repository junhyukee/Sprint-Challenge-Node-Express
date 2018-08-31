import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Projects extends Component {
	constructor(props){
		super(props);
		this.state = {
			projects: [],
			loaded: false
		}
	}
	
	componentDidMount(){
		axios.get('http://localhost:9000/projects')
			.then(res => {
				this.setState({ projects: res.data, loaded: true })
			})
			.catch(err => {
				console.log(err);
			})
	}

	render() {
		if (!this.state.loaded) return (<div></div>)
		return (
			<div className="projects">
				{this.state.projects.map(project => {
					return (
						<div className="project" key={project.id}>
							<Link to={`/projects/${project.id}`}><h3>{project.name}</h3></Link>
							<p>{project.description}</p>
						</div>
					)
				})}
			</div>
		);
	}
}

export default Projects;