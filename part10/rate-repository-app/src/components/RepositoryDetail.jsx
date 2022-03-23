import useRepository from "../hooks/useRepository";
import { Text } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { useParams } from "react-router-native";

const RepositoryDetail = () => {
  const { id } = useParams();
  const { data, loading } = useRepository(id);
  if (loading || !data?.repository)
    return <Text>Loading repository data...</Text>;
  const repository = data.repository;
  return <RepositoryItem item={repository} showLink={true} />;
};

export default RepositoryDetail;
