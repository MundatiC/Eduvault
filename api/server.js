const express = require('express');
require('dotenv').config();

const webhookRouter = require('./src/routes/webhookRoute');

const app = express();

app.use(express.json());

app.get(
  "/",
  (req, res, next) => {
    let cont = true;
    if (cont) {
      console.log("Hello from the middleware");
      next();
    } else {
      res.send("Error logged from middleware");
    }
  },
  (req, res) => {

    res.send("Ok")
  }
);

app.use(webhookRouter)

app.use("*", (req, res, next) => {
    const error = new Error("Route Not found");
    next({
      status: 404,
      message: error.message,
    });
  });

  app.use((error, req, res, next) => {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  });

  const port = process.env.PORT;

  app.listen(port, () => console.log(`Server on port: ${port}`));