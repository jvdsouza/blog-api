//API to log in to the system
const authentication = (req, resp, bcrypt, LoginModel) => {
    const {username, password} = req.body;

    return LoginModel.find({username: username})
        .then(details => {
            if(details.length > 0) {
                if (password === details[0].password) {
                    return resp.status(200).json('success')
                } else {
                    throw new Error()
                }
            } else {
                throw new Error()
            }
        })
        .catch(err => {
            return resp.json('fail')
        })
}

module.exports = {
    authentication
}