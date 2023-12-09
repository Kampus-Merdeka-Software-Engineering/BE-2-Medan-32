const express = require('express');
const feedBackController = require('../controller/feedBack');
const router = express.Router();

router.get('/feedback', feedBackController.getAllFeedback);
router.post('/feedback', feedBackController.sendFeedback);


module.exports = router;