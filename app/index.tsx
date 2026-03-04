import { router } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

const run = require("@/assets/images/iconrun.png");
export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/run");
    }, 3000);

    return () => clearTimeout(timer);
  });

  return (
    <View style={styles.container}>
      <Image source={run} style={styles.ImageAdjust} />
      <Text style={styles.TextMain}>Run Tracker</Text>
      <Text style={styles.TextSub}>วิ่งเพื่อสุขภาพ</Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ImageAdjust: {
    width: 200,
    height: 200,
  },
  TextMain: {
    fontSize: 24,
    fontFamily: "Kanit_700Bold",
    marginTop: 20,
  },
  TextSub: {
    fontSize: 16,
    fontFamily: "Kanit_400Regular",
    marginTop: 10,
    marginBottom: 20,
  },
});
