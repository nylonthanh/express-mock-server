var express = require('express');
var router = express.Router();

// create an error with .status. we
// can then use the property in our
// custom error handler (Connect respects this prop as well)

function error(status, msg) {
  var err = new Error(msg);
  err.status = status;
  return err;
}

let app = module.exports = express();

// create an error with .status. we
// can then use the property in our
// custom error handler (Connect respects this prop as well)

function error(status, msg) {
  var err = new Error(msg);
  err.status = status;
  return err;
}

// if we wanted to supply more than JSON, we could
// use something similar to the content-negotiation
// example.

// here we validate the API key,
// by mounting this middleware to /tutorials
// meaning only paths prefixed with "/tutorials"
// will cause this middleware to be invoked

app.use('/tutorials', function(req, res, next){
  var key = req.query['api-key'];

  // key isn't present
  if (!key) return next(error(400, 'api key required'));

  // key is invalid
  if (apiKeys.indexOf(key) === -1) return next(error(401, 'invalid api key'))

  // all good, store req.key for route access
  req.key = key;
  next();
});

// map of valid api keys, typically mapped to
// account info with some sort of database like redis.
// api keys do _not_ serve as authentication, merely to
// track API usage or help prevent malicious behavior etc.

/** Mock data **/
var apiKeys = ['foo', 'bar', 'baz'];

var repos = [
  { name: 'express', url: 'https://github.com/expressjs/express' },
  { name: 'stylus', url: 'https://github.com/learnboost/stylus' },
  { name: 'cluster', url: 'https://github.com/learnboost/cluster' }
];

var users = [
  { name: 'tobi' }
  , { name: 'loki' }
  , { name: 'jane' }
];

var userRepos = {
  tobi: [repos[0], repos[1]]
  , loki: [repos[1]]
  , jane: [repos[2]]
};

// we now can assume the api key is valid,
// and simply expose the data

// example: http://localhost:3000/tutorials?api-key=foo
app.get('/tutorials', (req, res, next) => {
  return res.send(users);
});

// example: POST http://localhost:3000/tutorials?api-key=foo
app.post('/tutorials', () => console.log('post tutorials'));


// example: http://localhost:3000/tutorials/1/?api-key=foo
app.get('/tutorials/:id', (req, res, next) => {
  return res.send(repos);
});

app.put('/tutorials/:id', (req, res, next) => {
  return res.send(repos);
});

// Deletes all tutorials
app.delete('/tutorials/:id', (req, res, next) => {
  return res.send(repos);
});

app.get('/tutorial?title', () => console.log('title: ', title));



// example: http://localhost:3000/tutorials/user/tobi/repos/?api-key=foo
app.get('/tutorials/user/:name/repos', function(req, res, next){
  var name = req.params.name;
  var user = userRepos[name];

  if (user) res.send(user);
  else next();
});