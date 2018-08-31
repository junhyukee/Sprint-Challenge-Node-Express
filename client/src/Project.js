import React, { Component } from 'react';
import axios from 'axios';

class Project extends Component {
	constructor(props){
		super(props);
		this.state = {
			project: [],
			loaded: false
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

	render() {
		if(!this.state.loaded) return (<div></div>)
		return (
			<div className="project">
				<h3>{this.state.project.name}</h3>
				<p>{this.state.project.description}</p>
				<button>Update</button>
				<button onClick={this.onDelete}>Delete</button>
			</div>
		);
	}
}

export default Project;