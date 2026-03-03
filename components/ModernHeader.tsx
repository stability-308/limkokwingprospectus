// components/ModernHeader.tsx
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface Props {
  title?: string;
  showBack?: boolean;
  logo?: any; // require('../assets/logo.png')
}

export default function ModernHeader({ title, showBack = false, logo }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      {/* Back Button */}
      {showBack && (
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={22} color="white" />
        </TouchableOpacity>
      )}

      {/* Logo or Title */}
      {logo ? (
        <Image source={logo} style={styles.logo} />
      ) : (
        <View style={styles.titleContainer}>
          <Ionicons
            name="school"
            size={22}
            color="white"
            style={{ marginRight: 8 }}
          />
        </View>
      )}

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#888"
          style={{ marginLeft: 8 }}
        />
        <TextInput
          placeholder="Search courses..."
          placeholderTextColor="#888"
          style={styles.input}
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={() => console.log("Search:", search)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  backButton: { marginRight: 10 },
  logo: { width: 40, height: 40, resizeMode: "contain", marginRight: 10 },
  titleContainer: { flexDirection: "row", alignItems: "center" },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#222",
    borderRadius: 12,
    alignItems: "center",
    marginLeft: 10,
    paddingHorizontal: 5,
    height: 38,
  },
  input: {
    flex: 1,
    color: "#fff",
    paddingHorizontal: 8,
    fontSize: 14,
  },
});
