module.exports = function(options) {
  /**
   * Fetch the list of all the products.
   */
  this.add({
    area: "product",
    action: "fetch"
  }, function(args, done) {
    console.log("product fetch");
    var products = this.make("products");
    products.list$({}, done);
  });
  /**
   * Fetch the list of products by category.
   */
  this.add({
    area: "product",
    action: "fetch",
    criteria: "byCategory"
  }, function(args, done) {
    console.log("product fetch byCategory", args.category);
    var products = this.make("products");
    products.list$({
      category: args.category
    }, done);
  });
  /**
   * Fetch a product by id.
   */
  this.add({
      area: "product",
      action: "fetch",
      criteria: "byId"
    },
    function(args, done) {
      console.log("product fetch byId", args.id, args.category);
      var product = this.make("products");

      product.load$(args.id, done);
    });
  /**
   * Adds a product.
   */
  this.add({
    area: "product",
    action: "add"
  }, function(args,
    done) {
    var products = this.make("products");
    products.category = args.category;
    products.name = args.name;
    products.description = args.description;
    products.price = args.price
    products.save$(function(err, product) {
      done(err, products.data$(false));
    });
  });
  /**
   * Removes a product by id.
   */
  this.add({
    area: "product",
    action: "remove"
  }, function(args,
    done) {
    var product = this.make("products");
    product.remove$(args.id, function(err) {
      done(err, null);
    });
  });
  /**
   * Edits a product fetching it by id first.
   */
  this.add({
    area: "product",
    action: "edit"
  }, function(args,
    done) {
    this.act({
      area: "product",
      action: "fetch",
      criteria: "byId",
      id: args.id
    }, function(err, result) {
      result.data$({
        name: args.name,
        category: args.category,
        description: args.description,
        price: args.price
      });

      result.save$(function(err, product) {
        done(err, product.data$(false));
      });
    });
  });
}