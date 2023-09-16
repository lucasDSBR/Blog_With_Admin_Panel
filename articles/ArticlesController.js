const express = require("express");
const router = express.Router();


router.get("/articles", (req, res) => {
	res.send("Route of articles...");
});

router.get("/admin/articles/new", (req, res) => {
	res.send("Route for create a new article...");
});

module.exports = router;