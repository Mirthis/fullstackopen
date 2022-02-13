import React from "react";

const CountryShort = ({ name }) => {
  return <div>{name}</div>;
};

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common} flag`} />
    </div>
  );
};

const CountryList = ({ countries }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }

  return (
    <div>
      {countries.map((c) => (
        <CountryShort key={c.cca2} name={c.name.common} />
      ))}
    </div>
  );
};

export default CountryList;
