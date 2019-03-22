//API to fetch blog content depending on url parameters

const blogPostContent = (req, resp) => {
    const {slug} = req.params;
    resp.json(slug)
}

module.exports = {
    blogPostContent
}