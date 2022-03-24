import { FlatList, Pressable, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
//import { useNavigate } from "react-router-native";
import ItemSeparator from "./ItemSeparator";
import { Picker } from "@react-native-picker/picker";
import TextInput from "./TextInput";
import React from "react";

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

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const {
      orderBy,
      setOrderBy,
      orderDirection,
      setOrderDirection,
      searchKeyword,
      setSearchKeyword,
    } = this.props.controls;
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

  render() {
    const repositoryNodes = this.props.repositories
      ? this.props.repositories.edges.map((edge) => edge.node)
      : [];

    const navigate = this.props.navigate;

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
          ListHeaderComponent={this.renderHeader}
        />
      </>
    );
  }
}
