import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSelector, useDispatch } from "react-redux";
import { API_URL } from "@env";
import * as Location from "expo-location";
import { TextInput } from "react-native-gesture-handler";

const MapUser = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const user = useSelector((state) => state.user);
  const [markers, setMarkers] = useState(user.establishement);
  const dispatch = useDispatch();
  const [distance, setDistance] = useState("1");

  const GetLocation = async (position) => {
    await axios
      .post(API_URL + "/locations", {
        distance: parseFloat(distance),
        position: {
          longitude: position.longitude,
          latitude: position.latitude,
        },
      })
      .then((res) => {
        setMarkers(res.data);
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      GetLocation(location.coords);
    })();
  }, [distance]);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      {location != null ? (
        <View style={{ flex: 1 }}>
          <TextInput
            style={{ position: "relative", zIndex: 100, height: 50 }}
            value={distance}
            onChangeText={(val) => {
              setDistance(val);
            }}
          />
          <MapView
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={styles.map}
            onLongPress={(e) => {
              //setMarkers([...markers, e.nativeEvent.coordinate]);
              GetLocation(e.nativeEvent.coordinate);
            }}
          >
            {markers.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  identifier={marker._id}
                  coordinate={marker}
                  onPress={(e) => console.log(e.nativeEvent.id)}
                />
              );
            })}
          </MapView>
        </View>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 50,
  },
});

export default MapUser;
