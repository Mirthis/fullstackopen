import useMe from "../hooks/useMe";
import ReviewList from "./ReviewList";
import { Text, View } from "react-native";

const MyReviews = () => {
  const { me, fetchMore } = useMe({ includeReviews: true, first: 10 });

  const reviewNodes = me ? me.reviews.edges.map((edge) => edge.node) : [];
  if (!reviewNodes.length)
    return (
      <View>
        <Text>No reviews</Text>
      </View>
    );
  return <ReviewList reviews={reviewNodes} fetchMore={fetchMore} type="USER" />;
};

export default MyReviews;
