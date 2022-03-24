import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import { View, Pressable, StyleSheet } from "react-native";
import theme from "../theme";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/queries";
import { useSignIn } from "../hooks/useSignIn";

const initialValues = {
  username: "",
  password: "",
  confirmPassword: "",
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  textinput: {
    padding: 20,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 5,
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
    .min(1, "Username must be at least 1 character long")
    .max(30, "Username must be a maximum of 30 character long")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 character long")
    .max(50, "Password must be a maximum of 50 character long")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password do not match")
    .required("Password confirm is required"),
});

const SignUpForm = ({ onSubmit }) => {
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
      <FormikTextInput
        style={styles.textinput}
        name="confirmPassword"
        placeholder="Confirm Password"
        secureTextEntry={true}
      />
      <Pressable onPress={onSubmit} style={{ justifyContent: "center" }}>
        <Text style={styles.signIn}>Sign Up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const [createUser, { loading, error }] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await createUser({
        variables: { user: { username, password } },
      });
      await signIn({ username, password });
      navigate("/", { replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
      </Formik>
      {loading && <Text>Authenticating</Text>}
      {error && <Text>{error}</Text>}
    </div>
  );
};

export default SignUp;
