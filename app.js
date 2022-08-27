//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const aboutContent = "Hi! This is Jessica's personal learning-to-be-a-great-engineer blog website, journaling things I have been learning or working on, challenges I have encountered, and ways I have explored to solve them! As I will start taking classes in the AI, ML field, I'm also eager to learn more about web development, and I really love how computer science translates ideas in my head to people who can share!";
const contactContent = "Let me know if you have any suggestions! Feel free to email xjchen01 at stanford";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Connect to mongoose server
mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

// Structure of my posts 
const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res) {
  // post all posts to home page
  Post.find({}, function(err, posts){
    res.render("home", {
      posts: posts
      });
  });
});

app.get("/about", function(req, res){
  // key: value 
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.post("/compose", function(req, res){
    const post = new Post({
      title: req.body.postTitle,
      content: req.body.postBody
    });
    // if no error, post to home
  post.save(function(err){
    if (!err){
      res.redirect("/");
    }
  });
});

// Post based on stored ID's
app.get("/posts/:postId", function(req, res){
    const requestedPostId = req.params.postId;
  
    Post.findOne({_id: requestedPostId}, function(err, post){
      res.render("post", {
        title: post.title,
        content: post.content
      });
    });
  
  });


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
