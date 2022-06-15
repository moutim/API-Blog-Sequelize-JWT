require('dotenv').config();
require('express-async-errors');
const app = require('./api');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

const { errorHandler } = require('./middlewares');

app.use(errorHandler);

app.listen(port, () => console.log('ouvindo porta', port));
