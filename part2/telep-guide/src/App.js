import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Numbers from "./components/Numbers";
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("name");
  const [newNumber, setNewNumber] = useState("number");
  const [filterQuery, setFilterQuery] = useState(" ");

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  })

  const handleChange = (setValue) => (event) => setValue(event.target.value);

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        id: persons.length + 1,
        number: newNumber,
      };

      setPersons(persons.concat(personObject));

      setNewName("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

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
      
      <Numbers 
        persons={persons} 
        query={filterQuery}
      />
    </div>
  );
};

export default App;
