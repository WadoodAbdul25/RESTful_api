require('dotenv').config()

const express = require('express');
const app = express();

const subscribersRouter = require('./routes/subscribers');
app.use('/subscriber',subscribersRouter);
app.use(express.json());

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true})
const db = mongoose.connection;
db.on('error',(error)=> console.error(error));
db.once('open',()=> console.log('successfully connected to the databse'));



app.listen(80,()=>{
    console.log(`the server is running at port 80`)
})