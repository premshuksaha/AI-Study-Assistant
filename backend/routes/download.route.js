const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const { pdfDownload } = require('../controllers/download.controller');

const router = express.Router();

router.post('/', protect, pdfDownload);

module.exports = router;
