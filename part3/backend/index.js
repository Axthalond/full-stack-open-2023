const bodyParser = require('body-parser')
const express = require('express')

// Server set-up
const app = express()
app.use(bodyParser.json())

// end Server set-up 


// Routes
const noteRouter = require('./routes/Note.routes')
app.use('/api/notes', noteRouter)
// end-Routes


app.get('/',(request, response) => {
  response.send('<h1>Hello World!</h1>')
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})