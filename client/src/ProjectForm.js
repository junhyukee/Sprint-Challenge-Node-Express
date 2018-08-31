import React, { Component } from 'react';
import axios from 'axios';

class ProjectForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			name: '',
			description: ''
		}
	}

	onFormSubmit = (e) => {
		e.preventDefault();
		const { name, description } = this.state;
		axios.post('http://localhost:9000/projects', { name, description })
			.then(res => {
				this.props.history.push('/projects')
			})
			.catch(err => {
				console.log(err);
			})
	}

	onInputChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	render() {
		return (
			<div className="project-form">
				<h3>Add New Project</h3>
				<form className="project-form" onSubmit={this.onFormSubmit} >
					<input name="name" value={this.state.name} onChange={this.onInputChange} placeholder="name" />
					<input name="description" value={this.state.description} onChange={this.onInputChange} placeholder="description" />
					<button>Add!</button>
				</form>
			</div>
		);
	}
}

export default ProjectForm;