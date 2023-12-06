const express = require('express');
const router = express.Router();

router.get("/comments", (req, res)=> {
    res.send({ data: "Here your comments" });
});

router.post("/comments", (req, res)=> {
    res.send({ data: "your comment posted" });
});

router.put("/comments", (req, res)=> {
    res.send({ data: "Your comment updated" });
});

router.delete("/comments", (req, res)=> {
    res.send({ data: "Your comment deleted" });
});

module.exports = router;