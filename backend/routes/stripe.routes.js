const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const { createCreditsOrder } = require('../controllers/stripe.controller');

const router = express.Router();

router.post('/create-order', express.json(), protect, createCreditsOrder);

module.exports = router;
