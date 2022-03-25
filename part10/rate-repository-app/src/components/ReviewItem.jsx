import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import theme from "../theme";
import { format } from "date-fns";
import { RepoLink } from "./RepositoryItem";
import { useDeleteReview } from "../hooks/useDeleteReview";

const style = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
  },
  reviewContainer: {
    flexDirection: "row",
    flexGrow: 0,
    marginTop: 10,
    marginBottom: 10,
  },
  reviewDataContainer: {
    flexDirection: "column",
    flexGrow: 1,
    padding: 5,
    flexShrink: 1,
  },
  reviewRatingContainer: {
    flexGrow: 0,
    borderColor: theme.colors.primary,
    backgroundColor: "white",
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    borderWidth: 4,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  reviewRatingText: {
    color: theme.colors.primary,
    //textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  usernameText: {
    fontWeight: "bold",
  },
  controlsContainer: {
    flexDirection: "row",
    flexGrow: 0,
  },
  openButton: {
    flexGrow: 1,
    marginHorizontal: 5,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 20,
    textAlign: "center",
    flexGrow: 1,
    marginHorizontal: 5,
  },
  deleteText: {
    color: "white",
    fontSize: 18,
  },
});

const ReviewItem = ({ review, type = "GLOBAL" }) => {
  const [deleteReview, result] = useDeleteReview(review.id);

  const reviewHeading =
    type !== "USER" ? review.user.username : review.repository.name;

  const createDeleteAlert = (reviewRepo) =>
    Alert.alert(
      "Delete review",
      `Do you want to delete review for repository ${reviewRepo}?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => handleDelete() },
      ]
    );

  const handleDelete = async () => {
    await deleteReview();
    console.log(result);
  };

  return (
    <View style={style.container}>
      <View style={style.reviewContainer}>
        <View style={style.reviewRatingContainer}>
          <Text style={style.reviewRatingText}>{review.rating}</Text>
        </View>
        <View style={style.reviewDataContainer}>
          <Text style={style.usernameText}>{reviewHeading}</Text>
          <Text>{format(Date.parse(review.createdAt), "dd.MM.yyyy")}</Text>
          <Text style={style.reviewText}>{review.text}</Text>
        </View>
      </View>
      {type === "USER" && (
        <View style={style.controlsContainer}>
          <RepoLink
            text="View repository"
            url={review.repository.url}
            buttonStyle={style.openButton}
          />
          <View style={style.deleteButton}>
            <Pressable
              onPress={() => createDeleteAlert(review.repository.name)}
            >
              <Text style={style.deleteText}>Deelete Review</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
