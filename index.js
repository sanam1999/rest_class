const { render } = require('ejs');
const methodoverride = require('method-override');
const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Import uuidv4 correctly
const app = express();
const port = 4400;

// Middleware
app.use(methodoverride('_method'))
app.use(express.urlencoded({ extended: true })); 
app.set("view engine", "ejs"); 
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public"))); 

let posts = [];

// Server start
app.listen(port, () => {
    console.log("app is listening on port", port);
});

app.get('/post', (req, res) => {
    console.log("request found /post");
    res.render("index.ejs", { posts }); 
});

app.get('/post/new', (req, res) => {
    res.render('newpost.ejs');
    console.log("post/new");
});

app.get('/post/delete/:id', (req, res) => {
    let id = req.params.id;
    posts = posts.filter((p) => id !== p.id); 
    res.redirect('/post');
});

app.get('/post/:id/edit', (req, res) => {
    let id = req.params.id;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});

app.get('/post/:id', (req, res) => {
    let id = req.params.id;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
});

app.post('/post', (req , res) => {
    let { username, content } = req.body;
    let id = uuidv4(); 
    posts.push({ id, username, content }); 
    res.redirect('/post'); 
});
//update post 
app.patch('/post/:id',(req ,res)=>{
    let {id} = req.params;
    let newcont = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newcont;
    res.redirect('/post')
})

