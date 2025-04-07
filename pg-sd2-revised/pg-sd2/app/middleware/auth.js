function requireLogin(req, res, next) {
    if (!req.session.loggedIn || !req.session.username) {
        return res.redirect("/login");
    }
    next();
}

module.exports = {
    requireLogin,
};
