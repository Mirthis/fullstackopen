import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    flexDirection: "row",
  },
});

const AppBar = () => {
  const { data } = useQuery(ME);
  const username = data?.me ? data.me.username : null;
  console.log(username);

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" path="/" />
        {username ? (
          <AppBarTab text="Sign Out" path="/sign-out" />
        ) : (
          <AppBarTab text="Sign In" path="/sign-in" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
