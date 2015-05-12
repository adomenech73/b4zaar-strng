module.exports = function (Product) {

  Product.beforeRemote('create', function (context, user, next) {
    var req = context.req;
    req.body.created = Date.now();
    req.body.publisherId = req.accessToken.userId;
    next();
  });

  Product.Near = function (here, distance, cb) {
    Product.find({where: {loc: {near: here}}, limit: distance}, function (err, nearbyProducts) {
      console.log(nearbyProducts); // [Products, ...]
      cb(null, nearbyProducts);
    })
  };
  Product.remoteMethod('Near', {
    accepts: [
      {arg: 'here', type: 'GeoPoint'},
      {arg: 'distance', type: 'Number'}
    ],
    returns: {arg: 'nearbyProducts', type: 'Array'}
  });

};
