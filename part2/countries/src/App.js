import React, { useEffect, useState } from "react";
import SearchForm from "./components/SearchForm";
import CountryList from "./components/CountryList";
import axios from "axios";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);

  const changeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const hook = () => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  };

  useEffect(hook, []);

  const showCountries =
    searchTerm === ""
      ? countries
      : countries.filter((c) =>
          c.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        );

  return (
    <div>
      <SearchForm value={searchTerm} onChange={changeSearchTerm} />
      <CountryList countries={showCountries} />
    </div>
  );
}

export default App;
