// app/index.tsx
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { faculties } from "../constants/coursesData";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data (e.g., fetching from server)
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredFaculties = faculties.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    // Full screen loading with logo
    return (
      <View style={styles.loadingContainer}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.loadingLogo}
        />
        <ActivityIndicator
          size="large"
          color="black"
          style={{ marginTop: 20 }}
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Limkokwing Prospectus</Text>
        <Text style={styles.subtitle}>Find Your Perfect Course</Text>

        {/* Search */}
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search Faculty..."
          style={styles.searchInput}
        />
      </View>

      {/* Quiz Card */}
      <TouchableOpacity
        style={styles.quizCard}
        onPress={() => router.push("/quiz")}
      >
        <Text style={styles.quizTitle}>Take the Career Quiz</Text>
        <Text style={styles.quizDescription}>
          Answer 5 simple questions to find the right faculty for you
        </Text>
      </TouchableOpacity>

      {/* Faculties Grid */}
      <View style={styles.grid}>
        {filteredFaculties.map((faculty) => (
          <TouchableOpacity
            key={faculty.id}
            style={[styles.facultyCard, { width: CARD_WIDTH }]}
            onPress={() => router.push(`/faculty/${faculty.id}`)}
          >
            <Image source={faculty.image} style={styles.facultyImage} />
            <Text style={styles.facultyCardName}>{faculty.name}</Text>
            <Text style={styles.facultyCardDescription}>
              {faculty.description || "Click to view courses"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  loadingLogo: { width: 150, height: 150, resizeMode: "contain" },

  // Header
  header: {
    backgroundColor: "black",
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: { fontSize: 32, fontWeight: "bold", color: "white", marginBottom: 6 },
  subtitle: { fontSize: 18, color: "white", opacity: 0.9 },

  searchInput: {
    backgroundColor: "white",
    marginTop: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    fontSize: 16,
  },

  // Quiz Card
  quizCard: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: -30,
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 4,
  },
  quizDescription: { fontSize: 14, color: "black" },

  // Grid
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  facultyCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  facultyImage: {
    width: "100%",
    height: 100,
    borderRadius: 12,
    marginBottom: 8,
  },
  facultyCardName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginBottom: 4,
  },
  facultyCardDescription: { fontSize: 13, color: "black", lineHeight: 18 },
});
