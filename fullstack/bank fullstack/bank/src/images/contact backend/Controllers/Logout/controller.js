
const logout = (req,resp) => {
    resp.clearCookie("mytoken").status(200).send("signed out successfully")
}

module.exports = logout