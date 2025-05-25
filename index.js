const { readdirSync } = require('fs');
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const cors = require('cors');
const hpp = require('hpp');
const helmet = require('helmet');
const morgan = require('morgan');

require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(helmet());
app.use(hpp());

const port = process.env.PORT || 3000;


readdirSync("./src/router").map(file => app.use('/api/v1', require(`./src/router/${file}`)));


mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    app.listen(port, function () {
      console.log(`server listening on ${port}`);
      console.log("server running Successfully");
    })
  }).catch(error => console.log(error));