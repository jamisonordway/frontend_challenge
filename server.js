const { promisify } = require('util');
const path = require('path');
const fs = require('fs');
const Express = require('express');

const App = Express();
const swaggerUiAssetPath = require('swagger-ui-dist').getAbsoluteFSPath();

const readFileAsync = promisify(fs.readFile);


App.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
App.use('/', Express.static(path.resolve('./public')));
App.get('/swagger', (req, res) => res.sendFile(path.resolve('./public', 'swagger.html')));
App.get('/bullets.json', (req, res) => res.sendFile(path.resolve('./build', 'bullets.json')));
App.use('/swagger/dist', Express.static(swaggerUiAssetPath));
App.use('/', Express.static(path.resolve('./build')));

// API
const ApiRouter = Express.Router({ mergeParams: true });

ApiRouter.use(async (req, res, next) => {
  // Randomly send a 500 error

  if (Math.random() < 0.005) {
    return res.status(500).send('Unknown Error');
  }

  next();
});

//
// Get All users
//
ApiRouter.route('/users')
  .get(async (req, res) => {
    const users = require('./src/server/data/users.json');

    const limit = req.query.limit || 20;
    const page = Math.min(Math.max((req.query.page || 1) - 1, 0), Math.ceil(users.length / limit) - 1);

    res.status(200).send({
      meta: {
        pages: Math.ceil(users.length / limit) - 1,
        page: page + 1,
        count: users.length,
        limit,
      },
      data: users.slice(page * limit, (page * limit) + limit),
    });
  })
  .all((req, res) => res.status(405).send('405 Method Not Allowed'));

//
// Get Individual user
//
ApiRouter.route('/users/:id(\\d+)/')
  .get(async (req, res) => {
    const users = require('./src/server/data/users.json');

    const user = users.find(u => Number(u.id) === Number(req.params.id));

    if (!user) {
      return res.status(404).send({
        code: 404,
        message: `User ${req.params.id} does not exist`,
        fields: 'id',
      });
    }

    res.status(200).send(user);
  })
  .all((req, res) => res.status(405).send('405 Method Not Allowed'));

ApiRouter.route('/user_info/:id(\\d+)/')
  .get(async (req, res) => {
    const user_info = require('./src/server/data/user_info.json');
    const user = user_info.find(u => Number(u.user_id) === Number(req.params.id));


    if (!user) {
      return res.status(404).send({
        code: 404,
        message: `User ${req.params.id} does not exist`,
        fields: 'user_id',
      });
    }

    res.status(200).send(user);
  })
  .all((req, res) => res.status(405).send('405 Method Not Allowed'));


App.use('/api', ApiRouter);

App.get('/userList', (req, res) => res.sendFile(path.resolve('./build', 'index.html')));

App.get('/informationPage/:id(\\d+)', (req, res) => {
  const userInfo = require('./src/server/data/user_info.json');
  const user = userInfo.find(u => Number(u.user_id) === Number(req.params.id));

  if (!user) {
    return res.status(404).send({
      code: 404,
      message: `User ${req.params.id} does not exist`,
      fields: 'user_id',
    });
  }

  res.sendFile(path.resolve('./build', 'index.html'));
});


App.all('*', (req, res) => res.status(404).send({
  code: 404,
  message: 'Page not found',
  fields: null,
}));

const SERVER_PORT = process.env.SERVER_PORT || 3000;
App.listen(SERVER_PORT, () => console.log(`Listening on ${SERVER_PORT}`));
