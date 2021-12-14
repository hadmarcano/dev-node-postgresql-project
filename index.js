const express = require('express');
const routerApi = require('./router');
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { logErrors, errorHandler,BoomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

// Express
const app = express();
// Middlewares - before
const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet());


// Routes
routerApi(app);

// Middlewares - after
app.use(logErrors);
app.use(ormErrorHandler);
app.use(BoomErrorHandler);
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is listen on port: ${port}`);
});
