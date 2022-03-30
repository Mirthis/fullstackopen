import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Todo from "./Todo";

test("renders content", () => {
  const todo = {
    text: "Test todo",
    done: false,
  };

  render(
    <Todo todo={todo} onClickComplete={() => null} onClickDelete={() => null} />
  );

  const element = screen.getByText("Test todo");
  expect(element).toBeDefined();
});
