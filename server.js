const envVar = require('dotenv').config()

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const winston = require('winston');
const helmet = require('helmet');

const blogContent = require('./controllers/blog-content');

const app = express();
const port = process.env.PORT;
const schema = mongoose.Schema;

app.use(bodyParser.json())
app.use(helmet())
app.use(cors())

//--------------------- START WINSTON LOGGING ----------------------------------------
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  });
   
  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  // 
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple()
    }));
  }
//--------------------- END WINSTON LOGGING ------------------------------------------

//--------------------- START MONGODB CONFIG ------------------------------------------
const dbURI = `mongodb+srv://jvdsouza:${process.env.DBPASSWORD}@single-page-db-jmq2r.mongodb.net/test?retryWrites=true`;

mongoose.connect(dbURI, { useNewUrlParser: true })
  .then(() => {
    console.log("connection to database successful");
  })
  .catch(err => {
    console.log("There was an error connecting to the database: ", err);
  })

//--------------------- END MONGODB CONFIG ------------------------------------------

app.get('/', (req, resp) => {
    resp.sendFile(path.join(__dirname + '/pages/index.html'))
})

app.listen(port || 3001, () => {
    console.log(`app is running on port ${port}`);
})