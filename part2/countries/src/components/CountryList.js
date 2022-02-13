import React from "react";

const CountryList = ({ countries, onShowClick }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  return (
    <div>
      {countries.map((c) => (
        <CountryPreview key={c.cca2} country={c} onShowClick={onShowClick} />
      ))}
    </div>
  );
};

const CountryPreview = ({ country, onShowClick }) => {
  return (
    <div>
      {country.name.common}
      <button data-cca2={country.cca2} onClick={onShowClick}>
        show
      </button>
    </div>
  );
};

export default CountryList;
