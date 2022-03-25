import { FlatList, Pressable, View, StyleSheet, Text } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import ItemSeparator from "./ItemSeparator";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import TextInput from "./TextInput";
import { useDebounce } from "use-debounce/lib";

const styles = StyleSheet.create({
  controlsContainer: {
    flexDirection: "row",
    padding: 5,
    flexShrink: 1,
  },
  pickerContainer: {
    margin: 5,
    flexGrow: 1,
    padding: 5,
  },
  textinput: {
    borderWidth: 1,
    borderColor: "black",
    //marginBottom: 20,
    backgroundColor: "white",
    margin: 5,
    flexGrow: 1,
    padding: 5,
    width: 100,
  },
});

export const RepositoryListContainer = ({
  repositories,
  controls,
  onEndReach,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const navigate = useNavigate();

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
        <RepositoryItem item={item} />
      </Pressable>
    );
  };

  return (
    <>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<ListControls controls={controls} />}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </>
  );
};

const ListControls = ({ controls }) => {
  const {
    orderBy,
    setOrderBy,
    orderDirection,
    setOrderDirection,
    searchKeyword,
    setSearchKeyword,
  } = controls;
  return (
    <View style={styles.controlsContainer}>
      <Picker
        selectedValue={orderBy}
        onValueChange={(itemValue) => setOrderBy(itemValue)}
        style={styles.pickerContainer}
      >
        <Picker.Item label="Last review date" value="CREATED_AT" />
        <Picker.Item label="Average Rating" value="RATING_AVERAGE" />
      </Picker>
      <Picker
        style={styles.pickerContainer}
        selectedValue={orderDirection}
        onValueChange={(itemValue) => setOrderDirection(itemValue)}
      >
        <Picker.Item label="Ascending" value="ASC" />
        <Picker.Item label="Descending" value="DESC" />
      </Picker>
      <TextInput
        style={styles.textinput}
        name={searchKeyword}
        placeholder="Search"
        onChange={(event) => setSearchKeyword(event.target.value)}
      />
    </View>
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [keywordValue] = useDebounce(searchKeyword, 1000);
  //const navigate = useNavigate();

  const { repositories, loading, error, fetchMore } = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword: keywordValue,
    first: 10,
  });
  const onEndReach = () => {
    fetchMore();
  };

  if (loading)
    return (
      <View>
        <Text>Loading repositories...</Text>
      </View>
    );

  if (error) console.log(error);

  return (
    <RepositoryListContainer
      repositories={repositories}
      controls={{
        orderBy,
        setOrderBy,
        orderDirection,
        setOrderDirection,
        searchKeyword,
        setSearchKeyword,
      }}
      //navigate={navigate}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
