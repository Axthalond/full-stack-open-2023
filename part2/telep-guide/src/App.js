import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/note";
import Notification from "./components/Notification";
import ErrorMessage from "./components/ErrorMessage";
import './index.css';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("name");
  const [newNumber, setNewNumber] = useState("number");
  const [filterQuery, setFilterQuery] = useState("");
  const [notification, setNotification] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);


  useEffect(() => {
    personService.getAll().then(initialPersons => setPersons(initialPersons))
  }, [])


  const handleChange = (setValue) => (event) => setValue(event.target.value);


  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumber
    };
    const foundPerson = persons.find((person) => person.name === newName)

    if (foundPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update(foundPerson.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => (person.id) !== foundPerson.id ? person : returnedPerson))
            setNewName("");
            setNewNumber("");
            setNotification(`Changed ${returnedPerson.name}`)
            setTimeout(() => {
              setNotification(null)
            }, 5000);
          })
          .catch(error => {
            setErrorMessage(
              `Information of ${newName} has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    } else {
      

      personService.create(personObject)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))
          setNewName("");
          setNewNumber("");
          setNotification(`Added ${addedPerson.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000);
          
        }
    )
    }
  };


  const handleRemovePerson = (id,name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService.remove(id)
        .then(() => {
        setPersons(persons.filter(person => person.name !== name))
        })
        .catch(error => {
          setErrorMessage(
            `Information of ${name} has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(n => n.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification}/>
      <ErrorMessage message={errorMessage}/>

      <Filter 
        query={filterQuery} 
        handleChange={handleChange(setFilterQuery)}
      />

      <h3>Add a new</h3>

      <PersonForm 
        name={newName} 
        number={newNumber} 
        handleChangeName={handleChange(setNewName)}  
        handleChangeNumber={handleChange(setNewNumber)} 
        handleAddPerson={addPerson}
      />

      <h3>Numbers</h3>
      
      <Persons 
        persons={persons} 
        query={filterQuery}
        handleRemovePerson={handleRemovePerson}
      />
    </div>
  );
};

export default App;
