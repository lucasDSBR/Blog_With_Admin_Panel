const express = require("express");
const bodyParse = require("body-parser");
const connection = require("./database/database");
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");


const Article = require("./articles/Article");
const Category = require("./categories/Category");
const app = express();


// View engine
app.set('view engine', 'ejs');
//End

// Static
app.use(express.static('public'));
//End

// Body Parse
app.use(bodyParse.urlencoded({extended: false}));
app.use(bodyParse.json());
//End

// Database
connection.authenticate().then(() => {
	console.log("Connection DB OK");
}).catch((error) => {
	console.log(`Erro in connection DB... Details:${error}`);
})
//End

app.use("/", categoriesController);
app.use("/", articlesController);

app.get("/", (req, res) => {
	Article.findAll({
		order: [
			["id", "desc"]
		],
		limit: 4
	}).then(articles => {
		Category.findAll().then( categories => {
			res.render("index", { articles: articles, categories: categories});

		})
	});
});

app.get("/:slug", (req, res) => {
	let slug = req.params.slug;
	Article.findOne({
		where: {
			slug: slug
		}
	}).then( article => {
		if(article != undefined){
			Category.findAll().then( categories => {
				res.render("article", { article: article, categories: categories });
			});
		}else{
			res.redirect("/");
		}
	}).catch( err => {
		res.redirect("/");
	})
});

app.get("/category/:slug", (req, res) => {
	let slug = req.params.slug;
	Category.findOne({
		where: {
			slug: slug
		},
		include: [{model: Article}]
	}).then( category => {
		if(category != undefined){
			Category.findAll().then( categories => {
				res.render("index", { articles: category.articles, categories: categories })
			});
		}else{
			res.redirect("/");
		}
	}).catch( err => {
		res.redirect("/");
	})
});


app.listen(8080, () => {
	console.log("The server has been started....")
});