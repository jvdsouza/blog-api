//API for the CMS for CRUD capabilities for the blog platform
const createPost = (req, resp, BlogPostModel) => {
    const {title, body} = req.body;

    const addPost = new BlogPostModel({title: title, body: body})
    addPost.save();
    
    return resp.status(200).json('post has been added to the blog')
}

module.exports = {
    createPost
}