import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  // const [persons, setPersons] = useState([
  //   { name: "Arto Hellas", number: "040-123456", id: 1 },
  //   { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
  //   { name: "Dan Abramov", number: "12-43-234345", id: 3 },
  //   { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  // ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const hook = () => {
    personsService.getAll().then((data) => setPersons(data));
  };

  useEffect(hook, []);

  const submitForm = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const knownPerson = persons.find((i) => i.name === newName);
    if (knownPerson) {
      const msg = `${newName} is already added to phonebook, replace the old number with a new one`;
      if (!window.confirm(msg)) {
        return;
      }
      personsService
        .update(knownPerson.id, newPerson)
        .then((data) =>
          setPersons(persons.map((p) => (p.id === data.id ? data : p)))
        );
    } else {
      personsService.create(newPerson).then((data) => {
        setPersons(persons.concat(data));
      });
    }
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

  const onDeleteClick = (e) => {
    const toDeleteId = +e.target.dataset.id;
    const toDeleteObj = persons.find((p) => p.id === toDeleteId);
    if (window.confirm(`Delete ${toDeleteObj.name}`)) {
      personsService.delete_person(toDeleteId).then((_) => {
        setPersons(persons.filter((p) => p.id !== toDeleteId));
      });
    }
  };

  const showPersons =
    filter === ""
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
      <Persons persons={showPersons} onDeleteClick={onDeleteClick} />
    </div>
  );
};

export default App;
