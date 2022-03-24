import { View, Text, StyleSheet } from "react-native";
import theme from "../theme";
import { format } from "date-fns";

const reviewStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexGrow: 0,
    padding: 10,
    backgroundColor: "white",
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
});

const ReviewItem = ({ review }) => {
  return (
    <View style={reviewStyle.container}>
      <View style={reviewStyle.reviewRatingContainer}>
        <Text style={reviewStyle.reviewRatingText}>{review.rating}</Text>
      </View>
      <View style={reviewStyle.reviewDataContainer}>
        <Text style={reviewStyle.usernameText}>{review.user.username}</Text>
        <Text>{format(Date.parse(review.createdAt), "dd.MM.yyyy")}</Text>
        <Text style={reviewStyle.reviewText}>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
