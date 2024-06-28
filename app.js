const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const route = require("./routes/index");
const cors = require('cors');

//MIDDLEWARE
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//URL
app.use(route);

//START PORT
app.listen(port, () => {
	console.log("listening on port ", port);
});

