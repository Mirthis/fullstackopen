import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
//import useRepositories from "../hooks/useRepositories";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const renderItem = ({ item }) => <RepositoryItem item={item} />;
  //const { repositories } = useRepositories();
  const { data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });
  // Get the nodes from the edges array
  const repositoryNodes = data
    ? data.repositories.edges.map((edge) => edge.node)
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

export default RepositoryList;
