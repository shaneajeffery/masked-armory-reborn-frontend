const express = require('express');
const router = express.Router();

const createProfile = require('./src/createProfile');
const getProfile = require('./src/getProfile');
const getServers = require('./src/getServers');


router.post('/v1/profile', createProfile);
router.get('/v1/profile/:id', getProfile);
router.get('/v1/server/us', getServers.getUsServers);
router.get('/v1/server/eu', getServers.getEuServers);


module.exports = router;