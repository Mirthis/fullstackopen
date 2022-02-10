import React, { useCallback, useState } from "react";

const App = () => {
  // save clicks of each button to its own state

  const feedbacks = {
    good: 0,
    neutral: 0,
    bad: 0,
  };
  let setGood, setNeutral, setBad;
  [feedbacks.good, setGood] = useState(0);
  [feedbacks.neutral, setNeutral] = useState(0);
  [feedbacks.bad, setBad] = useState(0);

  const Heading = ({ text }) => <h1>{text}</h1>;
  const Button = ({ text, onClick }) => (
    <button onClick={onClick}>{text}</button>
  );
  const Stat = ({ text, value }) => (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );

  const Statistics = ({ data }) => {
    const stats = {
      ...data,
      all: data["good"] + data["neutral"] + data["bad"],
    };
    if (!stats.all) return "No feedback given";

    stats.average = (stats.good - stats.bad) / stats.all;
    stats.positive = (stats.good / stats.all) * 100 + "%";

    return (
      <table>
        <tbody>
          {Object.keys(stats).map((k) => (
            <Stat key={k} text={k} value={stats[k]} />
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <Heading text="give feedback" />
      <Button text="good" onClick={() => setGood(feedbacks.good + 1)} />
      <Button
        text="neutral"
        onClick={() => setNeutral(feedbacks.neutral + 1)}
      />
      <Button text="bad" onClick={() => setBad(feedbacks.bad + 1)} />
      <Heading text="statistics" />
      <Statistics data={feedbacks} />
    </div>
  );
};

export default App;
