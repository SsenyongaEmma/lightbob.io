
import { View, Text,StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function GiftScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={{ position: "absolute", top: 40, left: 20 }}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </View>
      <Text style={{ color: "#fadb51", fontSize: 24 }}>Gift Screen</Text>
      <View style={{ width: "80%", marginTop: 20, backgroundColor: "#33280552", padding: 0, borderRadius: 8 }}>
        <View style={{width:20, height:100, backgroundColor:"#fadb51", }} >
          <Text>

          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071a0c",
    justifyContent: "center",
    alignItems: "center",
  },
});


// import { useContext } from "react";
// import { LightBobContext } from "../LightBobContext/LightBobContext";
// import { View, TouchableOpacity, Text } from "react-native";

// export default function SettingsScreen() {
//   const { setTheme } = useContext(LightBobContext);

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 20 }}>
      
//       <TouchableOpacity onPress={() => setTheme("green")}>
//         <Text>🟢 Green Theme</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => setTheme("blue")}>
//         <Text>🔵 Blue Theme</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => setTheme("red")}>
//         <Text>🔴 Red Theme</Text>
//       </TouchableOpacity>

//     </View>
//   );
// }