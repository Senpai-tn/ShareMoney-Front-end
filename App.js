import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider, useDispatch } from "react-redux";
import store from "./Redux/store";
import Main from "./Screens/Main";

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
