module.exports = function (Message) {
  Message.beforeRemote('create', function (context, user, next) {
    var req = context.req;
    req.body.created = Date.now();
    req.body.senderId = req.accessToken.userId;
    next();
  });
};
