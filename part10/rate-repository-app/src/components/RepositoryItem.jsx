import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import theme from "../theme";
import { parseStat } from "../utils/parseState";
import { openURL } from "expo-linking";

const repoInfoStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexGrow: 1,
    padding: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  avatarContainer: {
    flexGrow: 0,
    padding: 5,
  },
  infoContainer: {
    flexGrow: 1,
    flexDirection: "column",
    padding: 5,
  },
  fullnameText: {
    fontWeight: "bold",
  },
  languageText: {
    backgroundColor: theme.colors.primary,
    color: "white",
    padding: 5,
    flexBasis: "auto",
    alignSelf: "flex-start",
    borderRadius: 10,
    marginTop: 5,
  },
});

const repoStatsStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexGrow: 1,
    alignContent: "center",
    padding: 5,
  },
  statContainer: {
    flexGrow: 1,
    flexDirection: "column",
    alignContent: "center",
    padding: 5,
    alignItems: "center",
  },
  stat: {
    fontWeight: "bold",
    fontSize: 16,
  },
  statDesc: {
    fontSize: 16,
  },
});

const repoItemStyle = StyleSheet.create({
  container: {
    flexDirection: "column",
    flexGrow: 0,
    backgroundColor: "white",
    padding: 5,
  },
});

const openGitHubStyle = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    padding: 20,
    textAlign: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
  },
});

const RepoInfo = ({ item }) => {
  return (
    <View style={repoInfoStyle.container}>
      <View style={repoInfoStyle.avatarContainer}>
        <Image
          style={repoInfoStyle.avatar}
          source={{
            uri: item.ownerAvatarUrl,
          }}
        />
      </View>
      <View style={repoInfoStyle.infoContainer}>
        <Text style={repoInfoStyle.fullnameText}>{item.fullName}</Text>
        <Text>{item.description}</Text>
        <Text style={repoInfoStyle.languageText}>{item.language}</Text>
      </View>
    </View>
  );
};

const RepoStats = ({ item }) => {
  return (
    <View style={repoStatsStyle.container}>
      <View style={repoStatsStyle.statContainer}>
        <Text style={repoStatsStyle.stat}>
          {parseStat(item.stargazersCount)}
        </Text>
        <Text style={repoStatsStyle.statDesc}>Stars</Text>
      </View>
      <View style={repoStatsStyle.statContainer}>
        <Text style={repoStatsStyle.stat}>{parseStat(item.forksCount)}</Text>
        <Text style={repoStatsStyle.statDesc}>Forks</Text>
      </View>
      <View style={repoStatsStyle.statContainer}>
        <Text style={repoStatsStyle.stat}>{parseStat(item.reviewCount)}</Text>
        <Text style={repoStatsStyle.statDesc}>Reviews</Text>
      </View>
      <View style={repoStatsStyle.statContainer}>
        <Text style={repoStatsStyle.stat}>{parseStat(item.ratingAverage)}</Text>
        <Text style={repoStatsStyle.statDesc}>Rating</Text>
      </View>
    </View>
  );
};

const RepoLink = ({ url }) => {
  return (
    <View style={openGitHubStyle.button}>
      <Pressable
        onPress={() => {
          openURL(url);
        }}
      >
        <Text style={openGitHubStyle.text}>Open in GitHub</Text>
      </Pressable>
    </View>
  );
};

const RepositoryItem = ({ item, showLink = false }) => {
  return (
    <View testID="repositoryItem" style={repoItemStyle.container}>
      <RepoInfo item={item} />
      <RepoStats item={item} />
      {showLink && <RepoLink url={item.url} />}
    </View>
  );
};

export default RepositoryItem;
