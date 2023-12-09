const FeedBack = require('../models/feedBack.js');

const getAllFeedback = async (req, res, next) => {
    try {
        const allFeedback = await FeedBack.findAll();
        res.status(200).json(allFeedback);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Internal Server Error: ${error}` });
    }
}

const sendFeedback = async (req, res, next) => {
    try {
        const { email, content } = req.body;
        const newFeedback = await FeedBack.create({
            email,
            content
        });
        res.status(201).json(newFeedback);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Internal Server Error: ${error}` });        
    }
}

module.exports = {
    getAllFeedback,
    sendFeedback
}