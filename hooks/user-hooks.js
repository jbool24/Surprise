const bcrypt      = require('bcrypt');
const onetouch    = require('../api/onetouch');
const Users       = require('../models').Users;

// Test candidate password
exports.comparePassword = function(candidatePassword, cb) {
    const self = this;
    bcrypt.compare(candidatePassword, self.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// Send a OneTouch request to this user
exports.sendOneTouch = function(cb) {
    const self = this;
    self.authyStatus = 'unverified';
    self.save();

    onetouch.send_approval_request(self.authyId, {
        message: 'Request to Login to Twilio demo app',
        email: self.email
    }, function(err, authyRes){
        if (err && err.success != undefined) {
            authyres = err;
            err = null;
        }
        cb.call(self, err, authyRes);
    });
};

// Send a 2FA token to this user
exports.sendAuthyToken = function(cb) {
    const self = this;

    authy.request_sms(self.authyId, true, function(err, response) {
        cb.call(self, err);
    });
};

// Test a 2FA token
exports.verifyAuthyToken = function(otp, cb) {
    const self = this;
    authy.verify(self.authyId, otp, function(err, response) {
        cb.call(self, err, response);
    });
};
