import { useNavigate } from "react-router-native";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";
import { useEffect } from "react";
import { View, Text } from "react-native";

const SignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  authStorage.removeAccessToken().then(() => {
    apolloClient.resetStore();
  });

  useEffect(() => navigate("/", { replace: true }), []);
  return (
    <View>
      <Text>Signign out...</Text>
    </View>
  );
};

export default SignOut;
