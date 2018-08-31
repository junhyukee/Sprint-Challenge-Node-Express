const express = require('express');

const projectsRoutes = require('../projects/projectsRoutes.js');
// const actionsRoutes = require('../actions/actionsRoutes.js');

const router = express.Router();

router.use('/projects', projectsRoutes);
// router.use('/actions', actionsRoutes);

module.exports = router;