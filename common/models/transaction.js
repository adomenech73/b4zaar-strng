module.exports = function (Transaction) {
  Transaction.beforeRemote('create', function (context, user, next) {
    var req = context.req;
    req.body.created = Date.now();
    req.body.clientId = req.accessToken.userId;
    next();
  });
};
