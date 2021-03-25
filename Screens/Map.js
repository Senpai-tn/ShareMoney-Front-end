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

const Map = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const user = useSelector((state) => state.user);
  const [markers, setMarkers] = useState(user.establishement);
  const dispatch = useDispatch();

  const saveLocations = async () => {
    //console.log(markers);
    await axios
      .post(API_URL + "/locations/add", {
        locations: markers,
        id_user: user._id,
      })
      .then((res) => {
        dispatch({ type: "UPDATE", state: { user: res.data.userdata } });
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
    })();
  }, [user]);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text>Long press to add </Text>
      {location != null ? (
        <MapView
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.map}
          onLongPress={(e) => {
            setMarkers([...markers, e.nativeEvent.coordinate]);
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
      ) : null}
      <TouchableOpacity
        style={{ zIndex: 10, height: 80 }}
        onPress={() => {
          saveLocations();
        }}
      >
        <Text>Save Locations</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 50,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 100,
  },
});

export default Map;
