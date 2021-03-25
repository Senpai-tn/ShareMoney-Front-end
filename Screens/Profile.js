import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  TextInput,
  Button,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { API_URL } from "@env";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import axios from "axios";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);
  const [Cpassword, setCPassword] = useState("");
  const [phone, setPhone] = useState(user.phone);

  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    console.log(user.photos[0]);
  }, [user]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const Update = async () => {
    const formData = new FormData();
    if (password != Cpassword) {
      Alert.alert("Password doesn't mismatch", "Verify passwords");
    } else {
      if (image != "") {
        const newImageUri = "file:///" + image.split("file:/").join("");
        formData.append("profile", {
          uri: newImageUri,
          type: mime.getType(newImageUri),
          name: newImageUri.split("/").pop(),
        });
      } else {
      }

      user.username = username;
      user.password = password;
      user.phone = phone;

      formData.append("user", JSON.stringify(user));
      await axios({
        url: API_URL + "/users/update",
        data: formData,
        method: "POST",
      })
        .then((res) => {
          if (res.data.message == "Account Create ! You can now Login") {
            console.log(res.data);
            dispatch({ type: "UPDATE", state: { user: res.data.userdata } });
          } else alert(res.data.message);

          //
        })
        .catch((e) => console.log(e));
    }
  };
  return (
    <View style={{ marginLeft: 10 }}>
      <Modal
        animationIn="fade"
        onSwipeComplete={() => setModalVisible(false)}
        animationInTiming={3000}
        onRequestClose={() => {
          alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
        transparent={false}
        visible={modalVisible}
      >
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder={"Username"}
            value={username}
            onChangeText={(val) => setUsername(val)}
          />
          <TextInput
            placeholder={"Password"}
            value={password}
            secureTextEntry={true}
            onChangeText={(val) => setPassword(val)}
          />
          <TextInput
            placeholder={"Confirm Password"}
            secureTextEntry={true}
            onChangeText={(val) => setCPassword(val)}
          />
          <TextInput
            placeholder={"Phone"}
            keyboardType={"numeric"}
            value={phone}
            onChangeText={(val) => setPhone(val)}
          />
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          <Button title={"Cancel"} onPress={() => setModalVisible(false)} />
          <Button
            title={"Confirm"}
            onPress={() => {
              setModalVisible(false);
              Update();
            }}
          />
        </View>
      </Modal>

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
      <Text>username : {user.username}</Text>
      <Text>FirstName : {user.FirstName}</Text>
      <Text>LastName : {user.LastName}</Text>
      <Text>Phone : {user.phone}</Text>

      <Icon
        name="pencil"
        backgroundColor="black"
        size={40}
        raised
        style={{ marginLeft: 10 }}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
      >
        Update profile
      </Icon>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 300,
    width: 300,
    backgroundColor: "red",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
export default Profile;
