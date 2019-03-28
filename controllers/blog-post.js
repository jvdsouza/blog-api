require('dotenv').config()
const ObjectID = require('mongodb').ObjectID
//API for the CMS for CRUD capabilities for the blog platform
const createPost = (req, resp, BlogPostModel) => {
    const {title, body, apiKey} = req.body;

    if(apiKey === process.env.APIKEY) {
        BlogPostModel.find({"title": title})
            .then(data => {
                if(data.length === 0){
                    const addPost = new BlogPostModel({title: title, body: body})
                    addPost.save();
                    
                    return resp.status(200).json('post has been added to the blog')
                } else {
                    return resp.status(400).json("error, that blog title already exists")
                }
            })
            .catch(err => console.log(err))
    } else {
        return resp.status(400).json('invalid api key')
    }
}

const returnPost = (req, resp, BlogPostModel) => {
    const {title, apiKey} = req.body;

    if(apiKey === process.env.APIKEY) {
        return BlogPostModel.find({"title": title})
            .then(data => {
                if(data.length > 0) {
                   return resp.status(200).json(data[0])
                } else {
                    return resp.status(400).json("fail")
                }
            })
            .catch(err => resp.status(400).json("fail"))
        
    } else {
        return resp.status(400).json('invalid api key')
    }
}

const updatePost = (req, resp, BlogPostModel) => {
    const {title, body, docID, apiKey} = req.body;

    if(apiKey === process.env.APIKEY) {
        BlogPostModel.updateOne(
            {"_id": docID},
            {"body": body},
            (error)=>console.log("error", error)
        )
            .then(response => {
                return resp.status(200).json('updated')
            })
            .catch(err => console.log('request could not be fulfilled', err));
    } else {
        return resp.status(400).json('invalid api key')
    }
}

const deletePost = (req, resp, BlogPostModel) => {
    const {title, apiKey} = req.body;
    if(apiKey === process.env.APIKEY) {
        BlogPostModel.deleteOne({"title": title})
            .then(response => {
                return resp.status(200).json('success')
            })
            .catch(err => {
                return resp.status(400).json(`fail`) 
            })
        
    } else {
        return resp.status(400).json('invalid api key')
    }
}

module.exports = {
    createPost,
    returnPost,
    updatePost,
    deletePost
}