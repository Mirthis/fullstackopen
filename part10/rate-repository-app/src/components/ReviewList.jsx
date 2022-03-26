import { FlatList, View } from "react-native";
import ReviewItem from "./ReviewItem";
import ItemSeparator from "./ItemSeparator";
import { Dimensions } from "react-native";

const ReviewList = ({ reviews, fetchMore, type = "GLOBAL" }) => {
  const renderReview = ({ item, type }) => {
    return <ReviewItem review={item} type={type} />;
  };

  const onEndReach = () => {
    fetchMore();
  };

  const { height } = Dimensions.get("window");
  return (
    <View style={{ flexGrow: 1, height: height }}>
      <FlatList
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={(item) => renderReview({ item: item.item, type: type })}
        keyExtractor={(item) => item.id}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default ReviewList;
