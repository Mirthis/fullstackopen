import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";
import useMe from "../hooks/useMe";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    flexDirection: "row",
  },
});

const AppBar = () => {
  const { me } = useMe({});
  const username = me ? me.username : null;
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" path="/" />
        {username ? (
          <>
            <AppBarTab text="Create a review" path="/reviews/add" />
            <AppBarTab text="My reviews" path="/myreviews" />
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
