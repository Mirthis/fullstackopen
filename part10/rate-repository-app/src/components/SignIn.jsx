import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import { View, Pressable, StyleSheet } from "react-native";
import theme from "../theme";
import * as yup from "yup";
import { useSignIn } from "../hooks/useSignIn";
//import AuthStorage from "../utils/authStorage";
import { useNavigate } from "react-router-native";

const initialValues = {
  username: "",
  password: "",
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  textinput: {
    padding: 20,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 20,
  },
  signIn: {
    backgroundColor: theme.colors.primary,
    color: "white",
    fontSize: 18,
    padding: 20,
    textAlign: "center",
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be at least 6 character long")
    .required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 character long")
    .required("Password is required"),
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        style={styles.textinput}
        name="username"
        placeholder="Username"
      />
      <FormikTextInput
        style={styles.textinput}
        name="password"
        placeholder="Password"
        secureTextEntry={true}
      />
      <Pressable onPress={onSubmit} style={{ justifyContent: "center" }}>
        <Text style={styles.signIn}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignIn = () => {
  const navigate = useNavigate();
  const [signIn, { loading, error }] = useSignIn();
  //const authStorage = new AuthStorage();
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      signIn({ username, password });
      navigate("/", { replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <SignInContainer onSubmit={onSubmit} />
      {loading && <Text>Authenticating</Text>}
      {error && <Text>{error}</Text>}
    </View>
  );
};

export default SignIn;
