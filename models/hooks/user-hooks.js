const bcrypt      = require('bcrypt');
const User        = require('../../models').User;
const onetouch    = require('../../api/onetouch');
const authConfig  = require('../../config/auth');


// Create authenticated Authy API client
const authy = require('authy')(authConfig.authyApiKey);
const SALT_WORK_FACTOR = 10;


// Middleware executed before save - hash the user's password
User.hook('beforeCreate', (user, options = null, next) => {
    const self = user;
    // only hash the password if it has been modified (or is new)
    if (!self.changed('password'))
        return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err)
            return next(err);

        // hash the password using our new salt
        bcrypt.hash(self.password, salt, (err, hash) => {
            if (err)
                return next(err);

            // override the cleartext password with the hashed one
            self.password = hash;
            next();
        });
    });

    if (!self.authyId) {
        // Register this user with Authy if it's a new user
        authy.register_user(self.email, self.phone, self.countryCode, function(err, response) {
            if (err) {
                if (response && response.json) {
                    response.json(err);
                } else {
                    console.error(err);
                }
                return;
            }
            self.authyId = response.user.id;
            self.save(function(err, doc) {
                if (err || !doc)
                    return next(err);
                self = doc;
            });
        });
    };
});

// Test candidate password
User.prototype.comparePassword = function(candidatePassword, cb) {
    const self = this;
    bcrypt.compare(candidatePassword, self.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// Send a OneTouch request to this user
User.prototype.sendOneTouch = function(cb) {
    const self = this;
    self.authyStatus = 'unverified';
    self.save();

    onetouch.send_approval_request(self.authyId, {
        message: 'Request to Login to Twilio demo app',
        email: self.email
    }, function(err, authyres){
        if (err && err.success != undefined) {
            authyres = err;
            err = null;
        }
        cb.call(self, err, aut`hyres);
    });
};

// Send a 2FA token to this user
User.prototype.sendAuthyToken = function(cb) {
    const self = this;

    authy.request_sms(self.authyId, function(err, response) {
        cb.call(self, err);
    });
};

// Test a 2FA token
User.prototype.verifyAuthyToken = function(otp, cb) {
    const self = this;
    authy.verify(self.authyId, otp, function(err, response) {
        cb.call(self, err, response);
    });
};
