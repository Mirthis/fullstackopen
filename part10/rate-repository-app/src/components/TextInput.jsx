import { TextInput as NativeTextInput, StyleSheet } from "react-native";

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style];
  const styles = StyleSheet.create({
    error: {
      borderColor: "red",
    },
  });

  if (error) {
    textInputStyle.push(styles.error);
  }

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
