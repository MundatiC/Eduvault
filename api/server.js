const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());

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