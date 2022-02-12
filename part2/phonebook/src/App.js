import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    if (persons.find((i) => i.name === newName))
      return alert(`${newName} is already added to phonebook`);
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  const onNameChange = (e) => {
    setNewName(e.target.value);
  };

  const onNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const onFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const showPersons = ""
    ? persons
    : persons.filter((p) =>
        p.name.toLowerCase().includes(filter.toLowerCase())
      );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        onSubmit={submitForm}
        filter={filter}
        onFilterChange={onFilterChange}
      />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={submitForm}
        onNameChange={onNameChange}
        onNumberChange={onNumberChange}
        name={newName}
        number={newNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={showPersons} />
    </div>
  );
};

export default App;
