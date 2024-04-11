const express = require('express');
const cors = require("cors");
require('dotenv').config();
const sql = require("mssql");
const config = require("./src/config/config");

const webhookRouter = require('./src/routes/webhookRoute');
const userRouter = require('./src/routes/userRoutes');

const app = express();

app.use(express.json());
app.use(cors({
  origin:'http://localhost:3001', 
  credentials:true,       
  optionSuccessStatus:200
}))

async function ConnectToDB() {
  try {
    const pool = await sql.connect(config)
    console.log("Connected to the database")

    app.use((req, res, next) => { req.pool = pool; next() })

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
    app.use(userRouter)
    
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
  } catch (error) {
    console.log("Error connecting to the database", error)
  }
}
ConnectToDB();

