const bcrypt      = require('bcrypt');
const Users       = require('../models').Users;

// Test candidate password
exports.comparePassword = function(candidatePassword, cb) {
    const self = this;
    bcrypt.compare(candidatePassword, self.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
