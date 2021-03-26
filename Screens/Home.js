import React, { useEffect } from "react";
import { View, Text, Button, StatusBar, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import User from "../Models/User";
import axios from "axios";
import { API_URL } from "@env";

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

  const CharityAction = async () => {
    let a = new User();
    user.charity += 10 - 10 / 10;
    user.duty += 10;
    user.transactions.push({
      id_seller: "",
      charity: 10,
      date: new Date(),
    });
    await axios.post(API_URL + "/users/charity", {
      user: user,
      charity: 10,
      id_seller: user._id,
    });
    dispatch({ type: "Charity", state: { user: user } });
    storeData({ user: user });
  };

  useEffect(() => {
    console.log(user.duty);
  }, [state]);

  return (
    <View>
      <StatusBar />
      <Image
        source={{
          uri: API_URL + "/user/" + user.photos[0],
        }}
        style={{
          width: 200,
          height: 200,
          borderRadius: 100,
          alignSelf: "center",
        }}
      />
      <Text>Username {user.username}</Text>
      <Text>Email {user.email}</Text>
      <Text>Charity {user.charity}</Text>
      {user.role.includes("seller") == true ? (
        <Text>Duty : {user.duty}</Text>
      ) : null}
      <Button title={"QR"} onPress={() => navigation.navigate("QR")} />
      <Button title={"Map"} onPress={() => navigation.navigate("Map")} />
      <Button
        title={"Profile"}
        onPress={() => navigation.navigate("Profile")}
      />
      <Button title={"Charity"} onPress={() => CharityAction()} />
      <Button title={"Logout"} onPress={() => LogoutAction()} />
    </View>
  );
};

export default Home;
