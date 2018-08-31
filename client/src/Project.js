import React, { Component } from 'react';
import axios from 'axios';
import UpdateProject from './UpdateProject.js';

class Project extends Component {
	constructor(props){
		super(props);
		this.state = {
			project: [],
			loaded: false,
			updateActive: false,
			name: '',
			description: ''
		}
	}

	componentDidMount(){
		const id = this.props.match.params.id;
		axios.get(`http://localhost:9000/projects/${id}`)
			.then(res => {
				this.setState({ project: res.data, loaded: true })
			})
			.catch(err => {
				console.log(err);
			})
	}

	onDelete = () => {
		const id = this.props.match.params.id;
		axios.delete(`http://localhost:9000/projects/${id}`)
			.then(res => {
				this.props.history.push('/projects')
			})
			.catch(err => {
				console.log(err)
			})
	}

	onInputChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	onFormSubmit = (e) => {
		e.preventDefault();
		const id = this.props.match.params.id;
		const { name, description } = this.state;
		axios.put(`http://localhost:9000/projects/${id}`, { name, description })
			.then(res => {
				this.props.history.push(`/projects`)
			})
			.catch(err => {
				console.log(err);
			})
	}

	onUpdateClick = () => {
		this.setState((prevState) => {
			return {updateActive: !prevState.updateActive}
		})
	}

	render() {
		if(!this.state.loaded) return (<div></div>)
		return (
			<div className="project">
				<h3>{this.state.project.name}</h3>
				<p>{this.state.project.description}</p>
				<button onClick={this.onUpdateClick}>Update</button>
				<button onClick={this.onDelete}>Delete</button>
				{
					this.state.updateActive
					? <UpdateProject 
						onFormSubmit={this.onFormSubmit} 
						onInputChange={this.onInputChange} 
						name={this.state.name} 
						description={this.state.description} 
						/>
					: null
				}
			</div>
		);
	}
}

export default Project;