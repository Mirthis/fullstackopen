import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/queries";

export const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    mutate({ variables: { credentials: { username, password } } });
    return result;
  };

  return [signIn, result];
};
