const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Articles = require("./Article");
const { default: slugify } = require("slugify");
const adminAuth = require('../middlewares/adminAuth');


router.get("/admin/articles", adminAuth, (req, res) => {
	Articles.findAll({
		include: [{
			model: Category
		}]
	}).then(articles => {
		res.render("admin/articles/index", {articles: articles});
	});
});

router.get("/admin/articles/new", adminAuth, (req, res) => {
	Category.findAll().then(categories => {
		res.render("admin/articles/new", { categories: categories});
	});
});
router.post("/articles/save", adminAuth, (req, res) => {
	let title = req.body.title;
	let body = req.body.body;
	let category = req.body.category;

	Articles.create({
		title: title,
		slug: slugify(title),
		body: body,
		categoryId: category
	}).then(() => {
		res.redirect("/admin/articles")
	})
});

router.post("/articles/delete", adminAuth, (req, res) => {
	let id = req.body.id;
	if(id != undefined){
		if(!isNaN(id)){
			Articles.destroy({
				where: {
					id: id
				}
			}).then(() => {
				res.redirect("/admin/articles");
			})
		}else{
			res.redirect("/admin/articles")
		}
	}else{
		res.redirect("/admin/articles");
	}
});

router.get("/admin/articles/edit/:id", adminAuth, (req, res) => {
	let id = req.params.id;
	Articles.findByPk(id).then(article => {
		if(!isNaN(id)){
			if(article != undefined){
				Category.findAll().then( categories => {
					res.render("admin/articles/edit", {
						article: article, categories: categories
					});
				});
			}else{
				res.redirect("/admin/articles");
			}
		}else{
			res.redirect("/admin/articles");
		}
	}).catch(error => {
		res.redirect("/admin/articles");
	})
});

router.post("/articles/update", adminAuth, (req, res) => {
	let id = req.body.id;
	let title = req.body.title;
	let body = req.body.body;
	let category = req.body.category;
	Articles.update({
		title: title,
		body: body,
		categoryId: category,
		slug: slugify(title)
	},
	{where: {
		id: id
	}}).then(() => {
		res.redirect("/admin/articles");
	})
});
router.get("/articles/page/:num", adminAuth, (req, res) => {
	var page = req.params.num;
	var offSet = 0;
	if(isNaN(page) || page == 1)
		offSet = 0
	else
		offSet = (parseInt(page) - 1) * 4;
	Articles.findAndCountAll({
		limit: 4,
		offset: offSet,
		order: [
			["id", "desc"]
		]
	}).then( articles => {
		var next;
		if(offSet + 4 >= articles.count){
			next = false;
		}else{
			next = true;
		}
		Category.findAll().then( categories => {
			var result = {
				next: next,
				articles: articles,
				page: parseInt(page)
			}
			res.render("admin/articles/page", { result: result, categories: categories})
		});
	});
});
module.exports = router;