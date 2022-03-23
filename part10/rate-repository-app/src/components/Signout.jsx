import { useNavigate } from "react-router-native";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";
import { useEffect } from "react";
const SignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  authStorage.removeAccessToken().then(() => {
    apolloClient.resetStore();
  });

  useEffect(() => navigate("/", { replace: true }), []);
  return <div>Signign out...</div>;
};

export default SignOut;
