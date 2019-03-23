//API to fetch blog content depending on url parameters
const blogPostContent = (req, resp, BlogPostModel) => {
    const {title} = req.params;
    console.log(req.params);
    BlogPostModel.find({}).then(console.log)
    
    return resp.json(title + ' 200')
}

module.exports = {
    blogPostContent
}