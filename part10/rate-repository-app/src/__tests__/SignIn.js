import { render, waitFor, fireEvent } from "@testing-library/react-native";
import { SignInContainer } from "../components/SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();

      const { debug, getByPlaceholderText, getByText } = render(
        <SignInContainer onSubmit={onSubmit} />
      );

      fireEvent.changeText(getByPlaceholderText("Username"), "matti");
      fireEvent.changeText(getByPlaceholderText("Password"), "password");
      fireEvent.press(getByText("Sign in"));

      debug();
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "matti",
          password: "password",
        });
      });
    });
  });
});
