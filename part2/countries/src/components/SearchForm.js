import React from "react";

const SearchForm = (props) => {
  return (
    <div>
      find countries
      <input value={props.value} onChange={props.onChange} />
    </div>
  );
};

export default SearchForm;
