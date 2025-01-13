import React from "react";
import { StyleSheet } from "react-native";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  return <HomeScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
