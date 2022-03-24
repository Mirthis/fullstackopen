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
  const { data, loading } = useRepository(id);
  if (loading || !data?.repository)
    return <Text>Loading repository data...</Text>;
  const repository = data.repository;

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
      />
    </View>
  );
};

export default RepositoryDetail;
