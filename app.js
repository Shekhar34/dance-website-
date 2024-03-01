const express= require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path=require('path');
const fs=require('fs');
const { error } = require('console');
const app=express();
const port=80;
const hostname='127.0.0.1';

// Connection URI
mongoose.connect('mongodb://127.0.0.1:27017/contactdance');

//define schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Contact = mongoose.model('Contact', contactSchema);

app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug')
app.set('views',path.join(__dirname ,'views'));

app.get('/', (req, res) => {
    res.render('index.pug');
  })

app.get('/contact', (req, res) => {
    res.render('contact.pug');
  })

  app.post('/contact',(req, res) => {
    console.log(req.body);
    var myData= new Contact(req.body);
    myData.save().then(()=>{
      res.send('data saved');
    }).catch(()=>{
      res.send('data not saved');
    })

});


  app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });