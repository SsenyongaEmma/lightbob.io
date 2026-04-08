import Ionicons from "@expo/vector-icons/build/Ionicons";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Task = ({ title, subtitle, status }: { title: string; subtitle: string; status: string }) => (
  <View style={styles.taskRow}>
    
    {/* Left timeline */}
    <View style={styles.timeline}>
      <View style={styles.circle} />
      <View style={styles.line} />
    </View>

    {/* Content */}
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>

    {/* Status */}
    <View style={[
      styles.status,
      status === "collect" && { backgroundColor: "#4cff6a" },
      status === "locked" && { backgroundColor: "#555" },
    ]}>
      <Text style={{ color: "#000" }}>
        {status === "collect" ? "Collect" : "Locked"}
      </Text>
    </View>

  </View>
);

export default function RewardsScreen() {
  return (
    <View style={styles.container}>
      {/* <View>
        <Text style={{ color: "#fff", fontSize: 12 }}>Your progress</Text>
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
          <View style={{ width: 100, height: 10, backgroundColor: "#555", borderRadius: 5, marginRight: 10 }}>
            <View style={{ width: 60, height: 10, backgroundColor: "#4cff6a", borderRadius: 5 }} />
          </View>
          <Text style={{ color: "#aaa", fontSize: 12 }}>60%</Text>
        </View> 
      </View> */}

      <View style={{ position: "absolute", top: 40, left: 20 }}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </View>
      <Text style={styles.header}>Rewards</Text>

      <Task
        title="Open app 3 days in a row"
        subtitle="Reward: New colour theme"
        status={"collect"}
      />

      <Task
        title="Open app 7 days"
        subtitle="Reward: No ads"
        status="locked"
        
      />

      <Task
        title="Watch 3 ads"
        subtitle="Reward: Theme"
        status="locked"
      />

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0f10",
    padding: 20,
  },

  header: {
    fontSize: 28,
    color: "#fff",
    marginBottom: 20,
    position: "relative",
    top: 40,
    left: 1,
    paddingBottom: 30,
  },

  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  timeline: {
    alignItems: "center",
    marginRight: 10,

  },

  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#888",
  },

  line: {
    width: 2,
    height: 40,
    backgroundColor: "#555",
  },

  title: {
    color: "#fff",
    fontSize: 14,
  },

  subtitle: {
    color: "#aaa",
    fontSize: 12,
  },

  status: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
});







// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// const Task = ({ title, subtitle, status, onPress }: { title: string; subtitle: string; status: string; onPress?: () => void }) => (
//   <View style={styles.taskRow}>
    
//     {/* Left timeline */}
//     <View style={styles.timeline}>
//       <View style={styles.circle} />
//       <View style={styles.line} />
//     </View>

//     {/* Content */}
//     <View style={{ flex: 1 }}>
//       <Text style={styles.title}>{title}</Text>
//       <Text style={styles.subtitle}>{subtitle}</Text>
//     </View>

//     {/* Status */}
//     <View style={[
//       styles.status,
//       status === "collect" && { backgroundColor: "#4cff6a" },
//       status === "locked" && { backgroundColor: "#555" },
//     ]} onTouchEnd={onPress}>
//       <Text style={{ color: "#000" }}>
//         {status === "collect" ? "Collect" : "Locked"}
//       </Text>
//     </View>

//   </View>
// );

// export default function RewardsScreen() {
//   return (
//     <View style={styles.container}>
      
//       <Text style={styles.header}>Rewards</Text>

//       <Task
//         title="Open app 3 days in a row"
//         subtitle="Reward: New theme"
//         status={"collect"}
//         onPress={() => alert("Collect reward")}
//       />

//       <Task
//         title="Open app 7 days"
//         subtitle="Reward: No ads"
//         status="locked"
        
//       />

//       <Task
//         title="Watch 3 ads"
//         subtitle="Reward: Theme"
//         status="locked"
//       />

//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#0d0f10",
//     padding: 20,
//   },

//   header: {
//     fontSize: 28,
//     color: "#fff",
//     marginBottom: 20,
//   },

//   taskRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 25,
//   },

//   timeline: {
//     alignItems: "center",
//     marginRight: 10,
//   },

//   circle: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     backgroundColor: "#888",
//   },

//   line: {
//     width: 2,
//     height: 40,
//     backgroundColor: "#555",
//   },

//   title: {
//     color: "#fff",
//     fontSize: 14,
//   },

//   subtitle: {
//     color: "#aaa",
//     fontSize: 12,
//   },

//   status: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 20,
//   },
// });