var Game = require('../models/game');
var steam = require('steam-login');

module.exports = function(app, express) {

  var apiRouter = express.Router();

  // test route to make sure everything is working 
  apiRouter.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' }); 
  });
  apiRouter.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
  });


  //WORK IN PROGRESS

  // apiRouter.get('/authenticate', steam.authenticate(), function(req, res) {
  //   console.log('yo')
  //   // res.setHeader('Access-Control-Allow-Origin', '*');
  //   // res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  //   // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  //   res.redirect('/');
  // });

  // on routes that end in /games
  // ----------------------------------------------------
  apiRouter.route('/games')

    // create a game (accessed at POST /games)
    .post(function(req, res) {
      
      // var game = new Game();    // create a new instance of the game model
      // game.name = req.body.name;  // set the games name (comes from the request)
      
      game.save(function(err) {
        if (err) {
          // duplicate entry
          if (err.code == 11000) 
            return res.json({ success: false, message: 'A game with that gamename already exists. '});
          else 
            return res.send(err);
        }

        // return a message
        res.json({ message: 'Game created!' });
      });

    })

    // get all the games (accessed at GET /api/games)
    .get(function(req, res) {
      Game.find(function(err, games) {
        if (err) res.send(err);

        // return the games
        res.json(games);
      });
    });

  // on routes that end in /games/:game_id
  // ----------------------------------------------------
  apiRouter.route('/games/:game_id')

    // get the game with that id
    .get(function(req, res) {
      Game.findById(req.params.game_id, function(err, game) {
        if (err) res.send(err);

        // return that game
        res.json(game);
      });
    })

    // to update the game with this id
    .put(function(req, res) {
      Game.findById(req.params.game_id, function(err, game) {

        if (err) res.send(err);

        // set the new game information if it exists in the request
        if (req.body.name) game.name = req.body.name;
        if (req.body.gamename) game.gamename = req.body.gamename;
        if (req.body.password) game.password = req.body.password;

        // save the game
        game.save(function(err) {
          if (err) res.send(err);

          // return a message
          res.json({ message: 'Game updated!' });
        });

      });
    })

  return apiRouter;
};