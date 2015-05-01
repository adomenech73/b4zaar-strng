module.exports = function (Product) {

  Product.Near = function (here, cb) {
    Product.find({where: {loc: {near: here}}, limit: 3}, function (err, nearbyProducts) {
      console.info(nearbyProducts); // [Products, ...]
    })
  };
  Product.remoteMethod('Near', {
    accepts: {arg: 'here', type: 'GeoPoint'},
    returns: {arg: 'prods', type: 'String'}
  });

};
