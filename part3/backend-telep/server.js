const bodyParser = require('body-parser')
const express = require('express')
const persons = require('./data.js')
var morgan = require('morgan')

//Server set up
const app = express()
app.use(bodyParser.json())

//Server set up end

//Tools
const unknownEndPoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}

//Tools - end


//Routes
const personRouter = require('./routes/Persons.routes')
app.use('/api/persons', personRouter)
//Routes end


//Services
app.get('/', (request, response) => {
  response.send('<h1>Hello world</h1>')
})

app.get('/info', (request, response) => {
  const numberOfEntries = persons.length
  const date = (new Date())

  response.send(`<div>Phonebook has info for ${numberOfEntries} people <br></br>${date}<div>`)
})

app.use(morgan('tiny'))

app.use(unknownEndPoint)
//Services end



const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})