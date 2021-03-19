import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, Button } from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Auth from "./Auth";
import Home from "./Home";
import Login from "./Login";
import QR from "./QR";
import Register from "./Register";
import Loading from "./Loading";

const AuthStack = createStackNavigator();
const SellerStack = createStackNavigator();
const UserStack = createStackNavigator();

const Main = ({ props }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@storage_Key", JSON.stringify(value));
    } catch (e) {
      // saving error
    }
  };

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@storage_Key");
      jsonValue = JSON.parse(value);
      if (jsonValue.user.email !== "") {
        dispatch({ type: "LOADING", state: jsonValue });
      }
    } catch (e) {}
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <NavigationContainer>
      {user.email == "" ? (
        <AuthStack.Navigator headerMode={"none"}>
          <AuthStack.Screen name="Auth" component={Auth} />
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="Register" component={Register} />
        </AuthStack.Navigator>
      ) : user.role == "user" ? (
        <UserStack.Navigator headerMode={"none"}>
          <UserStack.Screen name="QR" component={QR} />
          <UserStack.Screen name="Home" component={Home} />
        </UserStack.Navigator>
      ) : (
        <SellerStack.Navigator>
          <SellerStack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          />
          <SellerStack.Screen
            options={{ headerShown: false }}
            name="QR"
            component={QR}
          />
        </SellerStack.Navigator>
      )}
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state,
  };
};

export default Main;
