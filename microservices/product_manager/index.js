var seneca = require("seneca")();

seneca.use(require('./plugin'));
seneca.use('entity');
seneca.use("mongo-store", {
  name: "seneca",
  host: "localhost",
  port: "27017"
});

seneca.ready(function(err) {
  seneca.act('role:web', {
    use: {
      prefix: '/products',
      pin: 'area:product, action:*',
      map: {
        fetch: {
          GET: true
        },
        add: {
          GET: false,
          POST: true
        },
        edit: {
          GET: false,
          POST: true
        },
        delete: {
          GET: false,
          DELETE: true
        }
      }
    }
  });

  var express = require('express');
  var app = express();
  app.use(require("body-parser").json());
  // This is how you integrate Seneca with Express
  app.use(seneca.export('web'));

  seneca.listen(3001);
  app.listen(3002);

});