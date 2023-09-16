const express = require("express");
const router = express.Router();


router.get("/categories", (req, res) => {
	res.send("Route of categories...");
});

router.get("/admin/categories/new", (req, res) => {
	res.send("Route for create a new category...");
});

module.exports = router;