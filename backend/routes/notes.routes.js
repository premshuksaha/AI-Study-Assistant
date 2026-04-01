const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const { getMyNotes, getNotes } = require('../controllers/notes.controller');

const router = express.Router();

router.get('/', protect, getMyNotes);
router.get('/:id', protect, getNotes);

module.exports = router;