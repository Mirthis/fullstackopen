import { View, StyleSheet } from "react-native";
import theme from "../theme";
import { Link } from "react-router-native";
import Text from "./Text";

const styles = StyleSheet.create({
  text: {
    padding: 10,
    color: theme.colors.AppBarTextColor,
  },
});

const AppBarTab = ({ text, path }) => {
  return (
    <View>
      <Link to={path}>
        <Text style={styles.text}>{text}</Text>
      </Link>
    </View>
  );
};

export default AppBarTab;
