const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const { generateNotes } = require('../controllers/generate.controller');

const router = express.Router();

router.post('/', protect, generateNotes);

module.exports = router;