import { supabase } from "@/services/supabase";
import { RunsType } from "@/types/runstype";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const iconrun = require("@/assets/images/iconrun.png");
export default function Run() {
  //สร้าง state สำหรับเก็บข้อมูลรายการวิ่งทั้งหมดที่ดึงมาจาก Supabase
  const [runs, setRuns] = useState<RunsType[]>([]);
  //สร้างฟังค์ชันไปดึงข้อมูลรายการวิ่งทั้งหมดจาก Supabase มาแสดงในหน้าหลัก
  const fetchRuns = async () => {
    const { data, error } = await supabase.from("runs").select("*");
    if (error) {
      Alert.alert("เกิดข้อผิดพลาดในการดึงข้อมูลจากฐานข้อมูล");
      return;
    }
    setRuns(data as RunsType[]);
  };

  //เรียกใช้ฟังค์ชันดึงข้อมูลรายการวิ่งทั้งหมดจาก Supabase ทุกครั้งที่เข้ามาที่หน้าหลัก
  useFocusEffect(
    useCallback(() => {
      fetchRuns();
    }, []),
  );

  //สร้างฟังค์ชั่นที่แสดงหน้าตาข้อมูลที่จะแสดงของแต่ละรายการที่ FlatList
  const renderItem = ({ item }: { item: RunsType }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/${item.id}`)}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <Image source={{ uri: item.image_url }} style={styles.cardImage} />
        <View style={styles.distanceBadge}>
          <Text style={styles.locationText}>{item.location}</Text>
          <Text style={styles.dateText}>
            {(() => {
              const date = new Date(item.run_date);
              const buddhistYear = "พ.ศ. " + (date.getFullYear() + 543);
              return (
                new Intl.DateTimeFormat("th-TH", {
                  month: "long",
                  day: "numeric",
                }).format(date) +
                " " +
                buddhistYear
              );
            })()}
          </Text>
        </View>
        <Text style={styles.distanceText}>{item.distance} km</Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#CCC" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* ส่วนแสดงรูปทั้งหมด */}
      <Image source={iconrun} style={styles.imgLogo} />

      {/* ส่วนแสดงข้อมูลรายการวิ่งที่ดึงมาจาก Supabase ทั้งหมด */}
      <FlatList
        data={runs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listPadding}
      />

      {/* ส่วนแสดงปุ่มเปิดไปหน้า add */}
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
  listPadding: {
    padding: 20,
    paddingBottom: 100, // เว้นที่ให้ FAB
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    // Shadow สำหรับ iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    // Elevation สำหรับ Android
    elevation: 3,
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 10,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  distanceBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  locationText: {
    fontFamily: "Kanit_700Bold",
    fontSize: 18,
    color: "#333",
    marginBottom: 4,
  },
  dateText: {
    fontFamily: "Kanit_400Regular",
    fontSize: 14,
    color: "#888",
  },
  distanceText: {
    fontFamily: "Kanit_700Bold",
    fontSize: 14,
    color: "#007AFF",
  },

  imgShow: {
    width: 100,
    height: 100,
  },
  cardItem: {
    flex: 1,
    flexDirection: "row",
    margin: 5,
    width: "100%",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    padding: 10,
  },
  imgLogo: {
    width: 120,
    height: 120,
    marginTop: 50,
    margin: "auto",
  },
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
