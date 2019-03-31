const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT;
const users =  [
  {id: 1, username: "admin", password: "admin"},
  {id: 1, username: "guest", password: "guest"},
]

app.use(bodyParser.json());

app.post('/login', (req, res) => {
  if(!req.body.username || !req.body.password) {
    res
    .status('400')
    .send('User or password incorrect ! <a  href="">Forgot your password ?</a>')

  }

  const user = users.find((user) => {
    return user.username === req.body.username && user.password === req.body.password
  })

  if(!user) {
    res
    .status(400)
    .send('User not Found');
  } else {
    res
    .status(200)
    .send(`Welcome back ${req.body.username}`)
  }

})

app.get('/status', (req, res) => {
   const localTime = (new Date().toLocaleDateString());

   res
   .status(200)
   .send(`Server time is ${localTime}`);
})

app.get('*', (req, res) => {
  res.sendStatus(404);
})

app.listen(PORT, () => {
  console.log(`Server is running`)
})
