import { FlatList } from "react-native-web";
import ReviewItem from "./ReviewItem";
import ItemSeparator from "./ItemSeparator";

const ReviewList = ({ reviews, fetchMore, type = "GLOBAL" }) => {
  const renderReview = ({ item, type }) => {
    return <ReviewItem review={item} type={type} />;
  };

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={(item) => renderReview({ item: item.item, type: type })}
      keyExtractor={(item) => item.id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default ReviewList;
