const envVar = require('dotenv').config()

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const winston = require('winston');
const helmet = require('helmet');

const blogContent = require('./controllers/blog-content');
const login = require('./controllers/login')
const blogControl = require('./controllers/blog-post');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json())
app.use(helmet())
app.use(cors())

//--------------------- START MONGODB CONFIG ------------------------------------------
const dbURI = `mongodb+srv://jvdsouza:${process.env.DBPASSWORD}@single-page-db-jmq2r.mongodb.net/${process.env.DBNAME}`;

mongoose.connect(dbURI, { useNewUrlParser: true })
  .then(() => {
    console.log("connection to database successful");
  })
  .catch(err => {
    console.log("There was an error connecting to the database: ", err);
  })

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: String,
  body: String,
}, {timestamps: {createdAt: 'created_at'}})

const BlogPostModel = mongoose.model('Post', BlogPostSchema, 'posts')
//--------------------- END MONGODB CONFIG ------------------------------------------

//---server endpoint---
app.get('/', (req, resp) => {
    resp.sendFile(path.join(__dirname + '/pages/index.html'))
})

//---blog pages endpoints---
app.get('/home', (req, resp) => {
  {blogContent.blogPosts(req, resp, BlogPostModel)}
})

app.get('/:title', (req, resp) => {
  {blogContent.blogPostContent(req, resp, BlogPostModel)}
})

//---CMS endpoints---
// app.post('/adminlogin', (req, resp) => {
//   {login.adminLogin(req,resp)}
// })

app.post('/admincreate', (req, resp) => {
  {blogControl.createPost(req, resp, BlogPostModel)}
})

// app.put('/adminupdate', (req, resp) => {
//   {cmsCRUD.updatePost(req, resp)}
// })

// app.delete('/admindelete', (req, resp) => {
//   {cmsCRUD.deletePost(req, resp)}
// })

//---connection listening---
app.listen(port || 3001, () => {
    console.log(`app is running on port ${port}`);
})