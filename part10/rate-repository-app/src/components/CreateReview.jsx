import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import { useCreateReview } from "../hooks/useCreateReview";
import { Formik } from "formik";
import theme from "../theme";
import * as yup from "yup";
import FormikTextInput from "./FormikTextInput";

const initialValues = {
  repositoryName: "",
  ownerName: "",
  rating: "",
  text: "",
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
  submitContainer: {
    justifyContent: "center",
  },
  textField: {
    textAlignVertical: "top",
  },
  submitText: {
    backgroundColor: theme.colors.primary,
    color: "white",
    fontSize: 18,
    padding: 20,
    textAlign: "center",
  },
});

const validationSchema = yup.object().shape({
  repositoryName: yup.string().required("Repository name is required"),
  ownerName: yup.string().required("Owner name is required"),
  rating: yup
    .number()
    .required("Rating is required")
    .min(0, "Rating must be greater or equal than 0")
    .max(100, "Rating must be lower or equal 100"),
  review: yup.string(),
});

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        style={styles.textinput}
        name="repositoryName"
        placeholder="Repository Name"
      />
      <FormikTextInput
        style={styles.textinput}
        name="ownerName"
        placeholder="Owner Name"
      />
      <FormikTextInput
        style={styles.textinput}
        name="rating"
        placeholder="Rating"
      />
      <FormikTextInput
        style={styles.textinput}
        name="text"
        placeholder="Text"
        multiline={true}
        numberOfLines={4}
      />
      <Pressable onPress={onSubmit} style={styles.submitContainer}>
        <Text style={styles.submitText}>Create Review</Text>
      </Pressable>
    </View>
  );
};

const CreateReview = () => {
  const navigate = useNavigate();
  const [createReview, { loading, error }] = useCreateReview();

  const onSubmit = async (values) => {
    const { repositoryName, ownerName, rating, text } = values;
    try {
      const data = await createReview({
        repositoryName,
        ownerName,
        rating: +rating,
        text,
      });
      navigate(`/repositories/${data.createReview.repositoryId}`, {
        replace: true,
      });
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
        {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
      </Formik>
      {loading && <Text>Submitting review...</Text>}
      {error && <Text>{error}</Text>}
    </div>
  );
};

export default CreateReview;
