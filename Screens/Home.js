import React, { useEffect } from "react";
import { View, Text, Button, StatusBar } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const state = useSelector((state) => state);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@storage_Key", JSON.stringify(value));
    } catch (e) {
      // saving error
    }
  };

  const LogoutAction = () => {
    const data = {
      user: {
        __v: 0,
        _id: "",
        charity: 0,
        createdAt: "",
        email: "",
        establishement: [],
        location: [],
        password: "",
        photos: [""],
        products: [],
        role: "",
        transactions: [],
      },
    };
    storeData(data);
    dispatch({
      type: "LOGOUT",
      state: data,
    });
  };

  const CharityAction = () => {
    user.charity += 10;
    dispatch({ type: "Charity", state: { user: user } });
    storeData({ user: user });
  };

  useEffect(() => {}, [state]);

  return (
    <View>
      <StatusBar />
      <Text>Home {user.email}</Text>
      <Text>Charity {user.charity}</Text>

      <Button title={"QR"} onPress={() => navigation.navigate("QR")} />
      <Button title={"Map"} onPress={() => navigation.navigate("Map")} />
      <Button title={"Charity"} onPress={() => CharityAction()} />
      <Button title={"Logout"} onPress={() => LogoutAction()} />
    </View>
  );
};

export default Home;
