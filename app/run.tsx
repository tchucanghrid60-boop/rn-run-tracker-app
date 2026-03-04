import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Run() {
  return (
    <View style={styles.container}>
      <Text>Run</Text>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => router.push("/add")}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    padding: 15,
    backgroundColor: "#123ef0",
    borderRadius: 30,
    position: "absolute", // ทำให้ปุ่มลอยอยู่เหนือเนื้อหาอื่น
    bottom: 60,
    right: 40,
    elevation: 5,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
});
