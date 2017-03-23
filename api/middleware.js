// Authentication middleware
exports.loginRequired = function(req, res, next) {
    // TODO Check for users session on all private pages
    next();
};
