import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import { Route, Routes, Navigate } from "react-router-native";
import SignIn from "./SignIn";
import SignOut from "./Signout";
import RepositoryDetail from "./RepositoryDetail";
import CreateReview from "./CreateReview";
import SignUp from "./SignUp";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8",
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/repositories/:id" element={<RepositoryDetail />} exact />
        <Route path="/sign-in" element={<SignIn />} exact />
        <Route path="/sign-out" element={<SignOut />} exact />
        <Route path="/reviews/add" element={<CreateReview />} exact />
        <Route path="/sign-up" element={<SignUp />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
