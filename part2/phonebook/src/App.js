import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    if (persons.find((i) => i.name === newName))
      return alert(`${newName} is already added to phonebook`);
    setPersons(persons.concat({ name: newName }));
    setNewName("");
  };

  const onNameChange = (e) => {
    setNewName(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>debug: {newName}</div>
      <form onSubmit={submitForm}>
        <div>
          name: <input value={newName} onChange={onNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </div>
  );
};

const Person = ({ person }) => <div>{person.name}</div>;

export default App;
