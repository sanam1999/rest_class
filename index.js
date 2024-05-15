const express = require('express');
const path = require('path');

const app = express();
const port = 4400;

app.use(express.urlencoded({ extended: true })); 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public"))); 

app.listen(port, () => {
    console.log("app is listening on port", port);
});
