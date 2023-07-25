import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Numbers from "./components/Numbers";


const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", id: 1, number: "040-1234567" },
    { name: "Ada Lovelace", id: 2, number: "39-44-5323523" },
    { name: "Dan Abramov", id: 3, number: "12-43-234345" },
    { name: "Mary Poppendieck", id: 4, number: "39-23-6423122" },
  ]);

  const [newName, setNewName] = useState("name");
  const [newNumber, setNewNumber] = useState("number");
  const [filterQuery, setFilterQuery] = useState(" ");

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

      <h33>Add a new</h33>

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
