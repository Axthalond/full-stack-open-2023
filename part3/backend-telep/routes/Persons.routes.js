const router = require('express').Router()
let persons = require('../data.js')
var morgan = require('morgan')

//Tools
const generateId = () => {
  const maxId = persons.length > 0
  ? Math.max(...persons.map(n => n.id))
  : 0

  return maxId + 1
}

morgan.token('content', function getId (req) {
  const personJSON = JSON.stringify(req.body)
  return personJSON
})
//Tools end



//Services

router.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

router.get('/', (request, response) => {
  response.json(persons)
})

router.get('/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

router.delete('/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(200).json({message:`person with id ${id} was deleted`}).end()
})

router.post('/', (request, response) => {
  const body = request.body

  if(!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  } 

  if (persons.find(person => person.name === body.name)){
    return response.status(400).json({error:`${body.name} is already in the phonebook`})
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)
  response.json(persons)
})
//Services end

module.exports = router