import React from 'react';

const ActionForm = (props) => {
  	return (
	    <div className="project-form">
			<h3>Add Action</h3>
			<form className="project-form" onSubmit={props.onActionSubmit} >
				<input name="actionDescription" value={props.actionDescription} onChange={props.onInputChange} placeholder="description" />
				<input name="actionNotes" value={props.actionNotes} onChange={props.onInputChange} placeholder="notes" />
				<button>Add!</button>
			</form>
		</div>
  	)	
}

export default ActionForm;