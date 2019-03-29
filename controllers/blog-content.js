//API to fetch blog content depending on url parameters
const blogPostContent = (req, resp, BlogPostModel, ) => {
    const {title} = req.params;
    return BlogPostModel.find({"title": title})
        .then(data => {
            return resp.json(data)
        })
        .catch(err => console.log(err));
}
// resp.status(400).json("unable to retrieve post")

const blogPosts = (req, resp, BlogPostModel) => {
    return BlogPostModel.find({})
        .then(data => {
            return resp.json(data)
        })
        .catch(err => resp.status(400).json("unable to retrieve posts"))
}


module.exports = {
    blogPostContent,
    blogPosts,
}