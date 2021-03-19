import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StatusBar,
  StyleSheet,
} from "react-native";
import { API_URL } from "@env";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [secure, setSecure] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@storage_Key", JSON.stringify(value));
    } catch (e) {
      // saving error
    }
  };

  const LoginAction = async () => {
    return await axios({
      url: API_URL + "/users/login",
      data: { email: email, password: password },
      method: "POST",
      validateStatus: () => true,
      timeout: 2000,
    })
      .then((response) => {
        if (response.data == "400") {
          alert("Password doesn't match");
        } else if (response.data == "404") {
          alert("Email doesn't exist");
        } else if (response.status == 200) {
          let user = response.data;
          storeData({ user: user });
          dispatch({
            type: "LOGIN",
            state: { user: user },
          });
        } else {
          console.log("server error ");
          return;
        }

        {
          let user = response.data;

          //navigation.navigate("QR");
        }
      })
      .catch((error) => {
        console.log("error" + error);
      });
  };
  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={styles.title}>Login</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          onChangeText={(val) => {
            setEmail(val);
          }}
        />
        {emailError ? <Text style={styles.error}>Email </Text> : null}
        <TextInput
          style={styles.input}
          secureTextEntry={secure}
          onChangeText={(val) => {
            setPassword(val);
          }}
        />
        {passwordError ? <Text style={styles.error}>Password </Text> : null}
        <Button
          title={"Show Password"}
          onPress={() => {
            setSecure(!secure);
          }}
        />
        <Button title={"Login"} onPress={() => LoginAction()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    alignSelf: "center",
    fontSize: 45,
  },
  form: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    height: 40,
    width: "60%",
    borderRadius: 20,
    padding: 10,
    marginVertical: 20,
  },
  error: {
    color: "red",
    fontSize: 20,
  },
});
export default Login;
