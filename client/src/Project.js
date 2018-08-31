import React, { Component } from 'react';
import axios from 'axios';
import UpdateProject from './UpdateProject.js';
import ActionForm from './ActionForm.js';

class Project extends Component {
	constructor(props){
		super(props);
		this.state = {
			project: [],
			actions: [],
			loaded: false,
			updateActive: false,
			actionActive: false,
			name: '',
			description: '',
			actionDescription: '',
			actionNotes: ''
		}
	}

	componentDidMount(){
		const id = this.props.match.params.id;
		axios.get(`http://localhost:9000/projects/${id}`)
			.then(res => {
				this.setState({ project: res.data })
			})
			.then(res => {
				return axios.get(`http://localhost:9000/projects/${id}/actions`);
			})
			.then(res => {
				this.setState({ actions: res.data, loaded: true})
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

	onActionClick = () => {
		this.setState((prevState) => {
			return {actionActive: !prevState.actionActive}
		})
	}

	onActionSubmit = (e) => {
		e.preventDefault();
		const id = this.props.match.params.id;
		axios.post(`http://localhost:9000/actions`, {
			project_id: id,
			description: this.state.actionDescription,
			notes: this.state.actionNotes
		})
			.then(res => {
				this.setState(prevState => {
					return { actions: [...prevState.actions, res.data], actionActive: !prevState.actionActive}
				})
			})
			.catch(err => console.log(err))
	}

	render() {
		if(!this.state.loaded) return (<div></div>)
		return (
			<div className="project">
				<h3>{this.state.project.name}</h3>
				<p>{this.state.project.description}</p>
				<h4>Actions:</h4>
				{
					this.state.actions.length > 0
					? this.state.actions.map(action => {
						return(
							<div className="action" key={action.id}>
								<h5>{action.description}</h5>
								<p>{action.notes}</p>
							</div>
						)
					})
					: null
				}
				<button onClick={this.onActionClick}>Add Action</button>
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
				{
					this.state.actionActive
					? <ActionForm 
						onActionSubmit={this.onActionSubmit} 
						onInputChange={this.onInputChange} 
						actionDescription={this.state.actionDescription} 
						actionNotes={this.state.actionNotes} 
						/>
					: null
				}
			</div>
		);
	}
}

export default Project;