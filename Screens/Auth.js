import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";

const Auth = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.push("Login", { role: "login   " });
        }}
      >
        <Text style={[styles.text, { color: "#bb8082" }]}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.push("Register", { role: "user" });
        }}
      >
        <Text style={[styles.text, { color: "#6e7582" }]}>
          Register as User
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.push("Register", { role: "seller" });
        }}
      >
        <Text style={[styles.text, { color: "#046582" }]}>
          Register as Seller
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 45,
    color: "#f39189",
    fontWeight: "bold",
    textDecorationLine: "underline",
    textDecorationColor: "#f39189",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: { fontSize: 30 },
});

export default Auth;
