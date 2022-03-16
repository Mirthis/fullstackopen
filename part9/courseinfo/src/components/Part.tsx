import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const renderAttributes = (coursePart: CoursePart) => {
  switch (coursePart.type) {
    case "normal":
      return (
        <div>
          <em>{coursePart.description}</em>
        </div>
      );
    case "groupProject":
      return <div>project exercises: {coursePart.groupProjectCount}</div>;
    case "submission":
      return (
        <>
          <div>
            <em>{coursePart.description}</em>
          </div>
          <div>submit to {coursePart.exerciseSubmissionLink}</div>
        </>
      );
    case "special":
      return (
        <>
          <div>
            <em>{coursePart.description}</em>
          </div>
          <div>required skills: {coursePart.requirements}</div>
        </>
      );
    default:
      return assertNever(coursePart);
  }
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  return (
    <div>
      <div>
        <b>
          {coursePart.name} {coursePart.exerciseCount}
        </b>
      </div>
      {renderAttributes(coursePart)}
      <hr />
    </div>
  );
};

export default Part;
