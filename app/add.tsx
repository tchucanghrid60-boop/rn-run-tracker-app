import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Add() {
  const [location, setLocation] = useState("");
  const [distance, setDistance] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("เช้า");
  const [image, setImage] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);

  //ฟังค์ชันสำหรับเปิดกล้องถ่ายภาพหรือเลือกรูปจาก แกลเลอรี่
  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("ไม่ได้รับอนุญาตให้ใช้กล้อง");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setBase64Image(result.assets[0].base64 || null);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.titleShow}>สถานที่วิ่ง</Text>
        <TextInput
          value={location}
          onChangeText={setLocation}
          placeholder="สถานที่วิ่ง เช่น สวนลุมพินี"
          style={styles.inputValue}
        />
        <Text style={styles.titleShow}>ระยะทาง (กิโลเมตร)</Text>
        <TextInput
          value={distance}
          onChangeText={setDistance}
          placeholder="เช่น 10 กิโลเมตร"
          keyboardType="numeric"
          style={styles.inputValue}
        />
        <Text style={styles.titleShow}>ช่วงเวลา</Text>
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          <TouchableOpacity
            onPress={() => setTimeOfDay("เช้า")}
            style={[
              styles.timeOfDayBtn,
              { backgroundColor: timeOfDay === "เช้า" ? "#50aff3" : "#adadad" },
            ]}
          >
            <Text style={{ color: "#ffffff", fontFamily: "Kanit_400Regular" }}>
              เช้า
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTimeOfDay("เย็น")}
            style={[
              styles.timeOfDayBtn,
              { backgroundColor: timeOfDay === "เย็น" ? "#50aff3" : "#adadad" },
            ]}
          >
            <Text style={{ color: "#ffffff", fontFamily: "Kanit_400Regular" }}>
              เย็น
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.titleShow}>รูปภาพสถานที่</Text>
        <TouchableOpacity
          style={styles.takePhotoBtn}
          onPress={handleImagePicker}
        >
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: "100%", height: 200 }}
            />
          ) : (
            <View style={{ alignItems: "center" }}>
              <Ionicons name="camera-outline" size={30} color="#5a5a5a" />
              <Text
                style={{ fontFamily: "Kanit_400Regular", color: "#5a5a5a" }}
              >
                กดเพื่อถ่ายภาพ
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveBtn} onPress={() => {}}>
          <Text style={{ fontFamily: "Kanit_700Bold", color: "#ffffff" }}>
            บันทึกข้อมูล
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  timeOfDayBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
  },
  saveBtn: {
    padding: 15,
    backgroundColor: "#50aff3",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  takePhotoBtn: {
    width: "100%",
    height: 200,
    backgroundColor: "#b9b9b9",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  inputValue: {
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
    borderColor: "#ffffff",
    borderRadius: 8,
    backgroundColor: "#d1d1d1",
    fontFamily: "Kanit_400Regular",
  },
  titleShow: {
    fontFamily: "Kanit_700Bold",
    marginBottom: 10,
  },
});
