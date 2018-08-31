const express = require('express');
const actionModel = require('./actionModel.js');
const projectModel = require('../projects/projectModel.js');
const router = express.Router();

async function validProject (req, res, next){
    const { project_id } = req.body;
    try {
    	const project = await projectModel.get(project_id);
    	project
    	? next()
    	: res.status(404).json({ message: 'Project does not exist' })
    }
    catch(err){
    	next({ statusCode: 404 });
    }
}

router
	.route('/')
	.get(async (req, res, next) => {
		try {
			const actions = await actionModel.get();
			res.status(200).json(actions);
		}
		catch(err) {
			next(err);
		}
	})
	.post(validProject, async (req, res, next) => {
		const { project_id, description, notes, completed } = req.body;
		try {
			const action = await actionModel.insert({ project_id, description, notes, completed });
			res.status(201).json(action);
		}
		catch(err) {
			next(err);
		}
	});

router
	.route('/:id')
	.get(async (req, res, next) => {
		const { id } = req.params;
		try {
			const action = await actionModel.get(id);
			action
			? res.status(200).json(action)
			: next({ statusCode: 404 })
		} 
		catch(err) {
			next(err);
		}
	})
	.put(validProject, async (req, res, next) => {
		const { id } = req.params;
		const { project_id, description, notes, completed } = req.body;
		try {
			const action = await actionModel.update(id, { project_id, description, notes, completed });
			action
			? res.status(200).json(action)
			: next({ statusCode: 404 })
		}
		catch(err) {
			next(err);
		}
	})
	.delete(async (req, res, next) => {
		const { id } = req.params;
		try {
			const count = await actionModel.remove(id);
			count > 0
			? res.status(200).json({ message: 'Succesfully deleted' })
			: next({ statusCode: 404 })
		}
		catch(err) {
			next(err);
		}
	})

module.exports = router;