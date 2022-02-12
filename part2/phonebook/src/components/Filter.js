import React from "react";

const Filter = (props) => {
  console.log(props);
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        filter shown with:{" "}
        <input value={props.filter} onChange={props.onFilterChange} />
      </div>
    </form>
  );
};

export default Filter;
