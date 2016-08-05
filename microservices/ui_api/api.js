var senecaProductManager = require("seneca")().client({
  host: 'localhost',
  port: 3001
});
var senecaOrderProcessor = require("seneca")().client({
  host: "localhost",
  port: 3003
});

module.exports = function api(options) {
  /**
   * Gets the full list of products
   */
  this.add({
    area: "ui",
    action: "products"
  }, function(args,
    done) {
    senecaProductManager.act({
        area: "product",
        action: "fetch"
      },
      function(err, result) {
        done(err, result);
      });
  });

  /**
   * Get a product by id
   */
  this.add({
    area: "ui",
    action: "productbyid"
  }, function(args,
    done) {
    // More code to come
  });

  /**
   * Creates an order
   */
  this.add({
    area: "ui",
    action: "createorder"
  }, function(args,
    done) {
    // More code to come
  });

  this.add("init:api", function(msg, respond) {
    this.act('role:web', {
      use: {
        prefix: '/api',
        pin: 'area:ui,action:*',
        map: {
          products: {
            GET: true
          },
          productbyid: {
            GET: true,
            suffix: '/:id'
          },
          createorder: {
            POST: true
          }
        }
      }
    }, respond)
  });
}