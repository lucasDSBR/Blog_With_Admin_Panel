const express = require("express");
const router = express.Router();


router.get("/articles", (req, res) => {
	res.send("Route of articles...");
});

router.get("/admin/articles/new", (req, res) => {
	res.render("admin/articles/new")
});

module.exports = router;