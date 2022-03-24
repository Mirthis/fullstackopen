import useRepository from "../hooks/useRepository";
import { Text, View, FlatList } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { useParams } from "react-router-native";
import ItemSeparator from "./ItemSeparator";
import ReviewItem from "./ReviewItem";

const renderReview = ({ item }) => {
  return <ReviewItem review={item} />;
};

const RepositoryDetail = () => {
  const { id } = useParams();
  const { repository, loading, fetchMore } = useRepository({
    repositoryId: id,
    first: 5,
  });

  const onEndReach = () => {
    fetchMore();
  };

  if (loading || !repository) return <Text>Loading repository data...</Text>;

  const reviewNodes = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <View>
      <RepositoryItem item={repository} showLink={true} />
      <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderReview}
        keyExtractor={(item) => item.id}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default RepositoryDetail;
