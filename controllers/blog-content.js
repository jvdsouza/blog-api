//API to fetch blog content depending on url parameters

const blogPostContent = (req, resp) => {
    const {title} = req.params;
    console.log(req.params);
    
    
    return resp.json(title + ' 200')
}

module.exports = {
    blogPostContent
}