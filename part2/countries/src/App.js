import React, { useEffect, useState } from "react";
import SearchForm from "./components/SearchForm";
import CountryList from "./components/CountryList";
import axios from "axios";
import Country from "./components/Country";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [displayedCountry, setDisplayedCountry] = useState();

  const changeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    setDisplayedCountry();
  };

  const showCountry = (e) => {
    const cca2 = e.target.dataset.cca2;
    setDisplayedCountry(countries.find((c) => c.cca2 === cca2));
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

  if (
    showCountries.length === 1 &&
    displayedCountry?.name !== showCountries[0].name
  )
    setDisplayedCountry({ ...showCountries[0] });

  return (
    <div>
      <SearchForm value={searchTerm} onChange={changeSearchTerm} />
      <CountryList countries={showCountries} onShowClick={showCountry} />
      {displayedCountry && <Country country={displayedCountry} />}
    </div>
  );
}

export default App;
