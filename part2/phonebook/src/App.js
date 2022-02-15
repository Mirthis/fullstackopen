import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const loadData = () => {
    personsService
      .getAll()
      .then((data) => setPersons(data))
      .catch((err) => console.log(err));
  };

  useEffect(loadData, []);

  const updatePerson = async (id, personData) => {
    try {
      const data = await personsService.update(id, personData);
      setPersons(persons.map((p) => (p.id === data.id ? data : p)));
    } catch (err) {
      console.log(err);
    }
  };

  const createPerson = async (personData) => {
    try {
      const data = await personsService.create(personData);
      setPersons(persons.concat(data));
    } catch (err) {
      console.log(err);
    }
  };

  const deletePerson = async function (id) {
    try {
      await personsService.delete_person(id);
      setPersons(persons.filter((p) => p.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

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
      updatePerson(knownPerson.id, newPerson);
    } else {
      createPerson(newPerson);
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
      deletePerson(toDeleteId);
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
