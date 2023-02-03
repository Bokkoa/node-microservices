const express = require('express')
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')


const app = express()
app.use(bodyParser.json())
app.use(cors())
const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts)
})

// changed to create because ingress needs different name routes
app.post('/posts/create', async (req, res) => {
  const id = randomBytes(4).toString('hex')
  const { title } = req.body

  posts[id] = {
    id, title
  };

  // kubernetes label turns localhost to event-bus-srv
  await axios.post('http://event-bus-srv:4005/events', {
    type: 'PostCreated',
    data: {
      id, title
    }
  })

  res.status(201).send(posts[id])

});


app.post('/events', (req, res) => {
  console.log('Receive event', req.body);

  res.send({})
})

app.listen(4000, () => {
  console.log('Listening on http://localhost:4000');
})