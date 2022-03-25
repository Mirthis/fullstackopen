import useRepository from "../hooks/useRepository";
import { Text, View } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { useParams } from "react-router-native";
import ReviewList from "./ReviewList";

const RepositoryDetail = () => {
  const { id } = useParams();
  const { repository, loading, fetchMore } = useRepository({
    repositoryId: id,
    first: 1,
  });

  if (loading || !repository) return <Text>Loading repository data...</Text>;

  const reviewNodes = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <View>
      <RepositoryItem item={repository} showLink={true} />
      <ReviewList reviews={reviewNodes} fetchMore={fetchMore} />
    </View>
  );
};

export default RepositoryDetail;
