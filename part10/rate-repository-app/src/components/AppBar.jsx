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
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" path="/" />
        {username ? (
          <>
            <AppBarTab text="Create a review" path="/reviews/add" />
            <AppBarTab text="Sign Out" path="/sign-out" />
          </>
        ) : (
          <>
            <AppBarTab text="Sign In" path="/sign-in" />
            <AppBarTab text="Sign Up" path="/sign-up" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
