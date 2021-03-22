import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

const Map = () => {
  const [markers, setMarkers] = useState([]);
  return (
    <View style={styles.container}>
      <Text></Text>
      <Text>Long press to add </Text>
      <MapView
        style={styles.map}
        onLongPress={(e) => {
          setMarkers([...markers, e.nativeEvent.coordinate]);
        }}
      >
        {markers.map((marker, index) => {
          return (
            <Marker
              key={index}
              identifier="AZ"
              coordinate={marker}
              onPress={(e) => console.log(e.nativeEvent.id)}
            />
          );
        })}
      </MapView>
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
    height: Dimensions.get("window").height,
  },
});

export default Map;
