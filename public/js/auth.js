const key = {
  authyApiKey: '388AYCdKbcu7shNi7t93msg0OEo6sVGL'
};

authy.register_user(self.email, self.phone, self.countryCode, (err, res) => {
  if(err){
    throw new Error(err)
    //res.json(err);
    // return
  }
  self.authyId = res.user.id;
  self.save((err, doc) => {
    if (err || !doc) return next(err);
    self = doc;
  });
})

// Public webhook for Authy to POST to
exports.authyCallback = function(request, response) {
    var authyId = request.body.authy_id;

    // Look for a user with the authy_id supplies
    User.findOne({
        authyId: authyId
    }, function(err, user) {
        if (err || !user) return invalid();
        user.authyStatus = request.body.status;
        user.save();
    });
    response.end();
};
