import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  Platform,
  Text,
  StatusBar,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import User from "../Models/User";
import { API_URL } from "@env";
import mime from "mime";
import axios from "axios";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = ({ route, navigation }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCpassword] = useState("");
  const [image, setImage] = useState(null);
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@storage_Key", JSON.stringify(value));
    } catch (e) {
      // saving error
    }
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

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

  const RegisterAction = async () => {
    const newImageUri = "file:///" + image.split("file:/").join("");

    const formData = new FormData();
    formData.append("profile", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop(),
    });

    let user = new User();
    user.transactions = [];
    user.expo_id = "";
    user.username = username;
    user.role = route.params.role;
    user.email = email;
    user.password = password;
    user.establishement = [];
    user.products = [];
    user.birthdate = date;
    user.charity = 0;
    user.duty = 0;
    user.phone = phone;
    user.createdAt = new Date();
    user.photos = [];
    formData.append("user", JSON.stringify(user));
    let options = {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data; ",
      },
    };
    await axios({
      url: "http://192.168.1.11:3000/users",
      data: formData,
      method: "POST",
    }).then((res) => {
      console.log(res.data);
      dispatch({ type: "REGISTER", state: { user: res.data } });
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <Text>{API_URL}/users</Text>
      {step == 1 ? (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={(val) => {
              setEmail(val);
            }}
            value={email}
            placeholder={"Email"}
          />
          <TextInput
            style={styles.input}
            value={password}
            secureTextEntry={true}
            onChangeText={(val) => {
              setPassword(val);
            }}
            placeholder={"Email"}
          />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={Cpassword}
            onChangeText={(val) => {
              setCpassword(val);
            }}
            placeholder={"Email"}
          />
          <Button title={"Next"} onPress={() => setStep(step + 1)} />
        </View>
      ) : (
        <View style={styles.container}>
          <Text>Phone</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={phone}
            onChangeText={(val) => setPhone(val)}
          />
          <Button onPress={showDatepicker} title="Show date picker!" />
          <Text>
            Birthdate :{" "}
            {date.getFullYear() +
              "/" +
              (date.getMonth() + 1) +
              "/" +
              date.getDate()}
          </Text>
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && (
            <Image
              source={{ uri: image }}
              style={{
                width: 200,
                height: 200,
                borderRadius: 100,
                alignSelf: "center",
              }}
            />
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => setStep(step - 1)}
          >
            <Text>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => RegisterAction()}
          >
            <Text>Register</Text>
          </TouchableOpacity>
        </View>
      )}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={true}
          display="spinner"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
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
  button: {
    marginVertical: 10,
    alignSelf: "center",
  },
});
export default Register;
