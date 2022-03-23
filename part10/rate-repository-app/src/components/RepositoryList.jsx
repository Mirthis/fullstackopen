import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
//import { useQuery } from "@apollo/client";
//import { GET_REPOSITORIES } from "../graphql/queries";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate();

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
        <RepositoryItem item={item} />
      </Pressable>
    );
  };
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const RepositoryList = () => {
  const { repositories, loading } = useRepositories();
  if (loading) return <div>Loading repositories...</div>;
  return <RepositoryListContainer repositories={repositories.repositories} />;
};

export default RepositoryList;
