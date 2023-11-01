const express = require('express');
const app = express();
let DB = require('../db/db');
let db = new DB();
app.use(express.static('../../client/public/')); 
app.use(express.json());

app.get('/', (req, res) => {
  try{
    res.json({message: 'Hello World'});
  }catch(e){
    console.dir(e);
    res.status(404).json({message:'Root not fetched'});
  }
});

app.get('/meteorites', async (req, res) => {
  try{
    const allMeteorites = await db.readAll();
    // Add filtering
    // Add queries
    res.json(allMeteorites);
  }catch(e){
    console.dir(e);
    res.status(404).json({message:'Quotes could not be retrieved'});
  }
});

app.post('/meteorites/:meteorite/rate', (req, res) => {
  // To Implement
});

app.use((req, res, next) => {
  res.status(404).json({
      message: 'Page not found'
  })
})

module.exports = app;