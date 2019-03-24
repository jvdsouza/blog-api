//API to fetch blog content depending on url parameters
const blogPostContent = (req, resp, BlogPostModel) => {
    const {title} = req.params;
    return BlogPostModel.find({"title": title})
        .then(data => {
            return resp.json(data)
        })
}

const blogPosts = (req, resp, BlogPostModel) => {
    return BlogPostModel.find({})
        .then(data => {
            return resp.json(data)
        })
}

module.exports = {
    blogPostContent,
    blogPosts
}