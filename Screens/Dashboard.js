import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import axios from "axios";
import { API_URL } from "@env";

const Dashboard = () => {
  const [somme, setsomme] = useState(0);
  const [pubs, setPubs] = useState(null);
  const d = new Date();
  d.setDate(1);
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setUTCMilliseconds(0);
  const getAdmins = async () => {
    await axios.get(API_URL + "/admin/valid", { timeout: 3000 }).then((res) => {
      setsomme(res.data.total);
    });
  };

  const getPubs = async () => {
    await axios.get(API_URL + "/publications").then((res) => {
      setTimeout(() => {
        setPubs(res.data);
      }, 2000);
    });
  };

  useEffect(() => {
    getAdmins();
    getPubs();
  }, []);
  return (
    <View>
      <Text>jusqu'à le {d.toDateString()} on a reçu</Text>
      <Text>{somme}</Text>
      {pubs == null ? (
        <Text>. . . Loading</Text>
      ) : (
        pubs.map((pub, index) => {
          return (
            <View key={index}>
              <Text></Text>
              <Text></Text>
              <Text>{pub.title}</Text>
              <Text>{pub.content}</Text>
            </View>
          );
        })
      )}
    </View>
  );
};

export default Dashboard;
