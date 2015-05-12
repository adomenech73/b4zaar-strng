module.exports = function (Dialog) {

  Dialog.beforeRemote('create', function (context, user, next) {
    var req = context.req;
    req.body.created = Date.now();
    //req.body.publisherId = req.accessToken.userId;
    next();
  });

};
