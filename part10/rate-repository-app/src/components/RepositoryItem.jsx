import { View, Text, Image, StyleSheet } from "react-native";
import theme from "../theme";

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
    flexGrow: 1,
    backgroundColor: "white",
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
        <Text>Description: {item.description}</Text>
        <Text style={repoInfoStyle.languageText}>{item.language}</Text>
      </View>
    </View>
  );
};

const parseStat = (stat) => {
  if (stat < 1000) return stat;
  if (stat < 1000000) return (stat / 1000).toFixed(1) + "k";
  else return (stat / 1000000).toFixed(1) + "M";
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
        <Text style={repoStatsStyle.stat}>{item.forksCount}</Text>
        <Text style={repoStatsStyle.statDesc}>Forks</Text>
      </View>
      <View style={repoStatsStyle.statContainer}>
        <Text style={repoStatsStyle.stat}>{item.reviewCount}</Text>
        <Text style={repoStatsStyle.statDesc}>Reviews</Text>
      </View>
      <View style={repoStatsStyle.statContainer}>
        <Text style={repoStatsStyle.stat}>{item.ratingAverage}</Text>
        <Text style={repoStatsStyle.statDesc}>Rating</Text>
      </View>
    </View>
  );
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={repoItemStyle.container}>
      <RepoInfo item={item} />
      <RepoStats item={item} />
    </View>
  );
};

export default RepositoryItem;
