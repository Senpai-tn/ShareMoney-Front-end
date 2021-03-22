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
import Map from "./Map";

const AuthStack = createStackNavigator();
const SellerStack = createStackNavigator();
const UserStack = createStackNavigator();
const LoadingStack = createStackNavigator();

const Main = ({ props }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isLoaded, setIsLoaded] = useState(false);

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
    setTimeout(() => {
      setIsLoaded(true);
    }, 2500);
  }, []);

  return (
    <NavigationContainer>
      {isLoaded == false ? (
        <LoadingStack.Navigator headerMode={"none"}>
          <LoadingStack.Screen name="Loading" component={Loading} />
        </LoadingStack.Navigator>
      ) : user.email == "" ? (
        <AuthStack.Navigator headerMode={"none"}>
          <AuthStack.Screen name="Auth" component={Auth} />
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="Register" component={Register} />
        </AuthStack.Navigator>
      ) : user.role.includes("user") == true ? (
        <UserStack.Navigator headerMode={"none"}>
          <UserStack.Screen name="QR" component={QR} />
          <UserStack.Screen name="Home" component={Home} />
          <UserStack.Screen name="Map" component={Map} />
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
          <SellerStack.Screen
            options={{ headerShown: false }}
            name="Map"
            component={Map}
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
