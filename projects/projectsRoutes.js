const express = require('express');
const projectModel = require('./projectModel.js');
const router = express.Router();

router
	.route('/')
	.get(async (req, res, next) => {
		try {
			const projects = await projectModel.get();
			res.status(200).json(projects);
		}
		catch(err) {
			next(err);
		}
	})
	.post(async (req, res, next) => {
		const { name, description, completed } = req.body;
		try {
			const project = await projectModel.insert({ name, description, completed });
			res.status(201).json(project);
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
			const project = await projectModel.get(id);
			project
			? res.status(200).json(project)
			: next({ statusCode: 404 })
		} 
		catch(err) {
			next(err);
		}
	})
	.put(async (req, res, next) => {
		const { id } = req.params;
		const { name, description, completed } = req.body;
		try {
			const project = await projectModel.update(id, { name, description, completed });
			project
			? res.status(200).json(project)
			: next({ statusCode: 404 })
		}
		catch(err) {
			next(err);
		}
	})
	.delete(async (req, res, next) => {
		const { id } = req.params;
		try {
			const count = await projectModel.remove(id);
			count > 0
			? res.status(200).json({ message: 'Succesfully deleted' })
			: next({ statusCode: 404 })
		}
		catch(err) {
			next(err);
		}
	})

module.exports = router;