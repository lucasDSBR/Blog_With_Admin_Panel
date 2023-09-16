const express = require("express");
const bodyParse = require("body-parser");
const connection = require("./database/database");
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
app.get("/", (req, res) => {
	res.render('index');
});

app.listen(8080, () => {
	console.log("The server has been started....")
});