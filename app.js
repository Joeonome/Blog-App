
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');



mongoose.connect('mongodb+srv://Joeonome:joeonome@cluster0.ftmn626.mongodb.net/blogDB', {useNewUrlParser: true});

const postSchema = {
  title: String,
  body: String
 };
 
 const Post = mongoose.model("Post", postSchema);


 


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", async (req, res) => {

  let post = await Post.find({});

  console.log(post);
  console.log('====================================');

  res.render("home", {
  someContent: homeStartingContent,
  posts: post
})
}
);


app.get("/about", (req, res) =>
res.render("about", {someContent: aboutContent}));

app.get("/contact", (req, res) =>
res.render("contact", {someContent: contactContent}));

app.get("/compose", (req, res) => 
res.render("compose")
);

app.post("/compose", (req, res) => { 
  const post = new Post ({
    title: req.body.postTitle,
    body: req.body.postBody
  });
  post.save();
  res.redirect("/");
});

app.get('/posts/:postName', async (req, res) => {
  const reqTitle = _.lowerCase(req.params.postName);
  let post = await Post.find({});
  post.forEach(post => {
    const titleStore = _.lowerCase(post.title);
    
    if (reqTitle === titleStore) {
      res.render('post', {
        title: post.title, 
        body: post.body
      });
    };
  })
});

app.post("/delete", async (req, res) => {
  const hiddenName = req.body.hidden;
  console.log('====================================');
  console.log(hiddenName);
  console.log('====================================');
  
      await Post.deleteOne({title: hiddenName});
      res.redirect("/");
});






app.listen(3000, function() {
  console.log("Server started on port 3000");
});