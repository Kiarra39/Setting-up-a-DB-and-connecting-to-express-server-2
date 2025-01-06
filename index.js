require('dotenv').config();
const express = require('express');
const { resolve } = require('path');

const app = express();
const mongoose=require('mongoose');
const port = 3010;
const User = require('./schema.js');
const connectstring=process.env.MONGO_URI;
mongoose.connect(connectstring)
    .then(() => console.log('Connected to database'))
    .catch((error) => {
        console.error(`Error connecting to database: ${error.message}`);
        
    });
   

    app.use(express.json());
app.post('/api/users', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    if (error.name=='ValidationError') {
      return res.status(400).json({ message: 'Validation error' });
    }
    return res.status(500).json({ message: 'Server error' });
  }
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
