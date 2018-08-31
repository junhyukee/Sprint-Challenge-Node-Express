import React from 'react';

const UpdateProject = (props) => {
  	return (
	    <div className="project-form">
					<h3>Update Project</h3>
					<form className="project-form" onSubmit={props.onFormSubmit} >
						<input name="name" value={props.name} onChange={props.onInputChange} placeholder="name" />
						<input name="description" value={props.description} onChange={props.onInputChange} placeholder="description" />
						<button>Update!</button>
					</form>
		</div>
  	)
}

export default UpdateProject;