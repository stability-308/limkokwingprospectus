// app/index.tsx
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { faculties } from "../constants/coursesData";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2; // 2-column layout with padding & gap

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Limkokwing Prospectus</Text>
        <Text style={styles.subtitle}>Find Your Perfect Course</Text>
      </View>

      {/* Quiz Card */}
      <TouchableOpacity
        style={styles.quizCard}
        onPress={() => router.push("/quiz")}
        activeOpacity={0.8}
      >
        <Text style={styles.quizEmoji}></Text>
        <View style={styles.quizTextContainer}>
          <Text style={styles.quizTitle}>Take the Career Quiz</Text>
          <Text style={styles.quizDescription}>
            Answer 5 simple questions to find the right faculty for you
          </Text>
        </View>
        <Text style={styles.arrow}>→</Text>
      </TouchableOpacity>

      {/* Faculties Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Faculties</Text>
        <Text style={styles.sectionSubtitle}>Browse by faculty</Text>
      </View>

      {/* 2-Column Faculty Grid */}
      <View style={styles.grid}>
        {faculties.map((faculty) => (
          <TouchableOpacity
            key={faculty.id}
            style={[styles.facultyCard, { width: CARD_WIDTH }]}
            onPress={() => router.push(`/faculty/${faculty.id}`)}
            activeOpacity={0.8}
          >
            <Image source={faculty.image} style={styles.facultyImage} />
            <Text style={styles.facultyCardName} numberOfLines={2}>
              {faculty.name}
            </Text>
            <Text style={styles.facultyCardDescription} numberOfLines={3}>
              {faculty.description || "Click to view available courses"}
            </Text>
            <Text style={styles.viewCourses}>View Courses →</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Links */}
      <View style={styles.quickLinks}>
        <TouchableOpacity style={styles.linkItem} activeOpacity={0.8}>
          <Text style={styles.linkText}>📞 Contact Us</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },

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

  // Quiz Card
  quizCard: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: -30,
    padding: 20,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  quizEmoji: { fontSize: 40, marginRight: 16 },
  quizTextContainer: { flex: 1 },
  quizTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 4,
  },
  quizDescription: { fontSize: 14, color: "black" },
  arrow: { fontSize: 24, color: "black", marginLeft: 10 },

  // Section
  section: { paddingHorizontal: 20, paddingTop: 30, paddingBottom: 10 },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",

    marginBottom: 4,
  },
  sectionSubtitle: { fontSize: 16, color: "black" },

  // Grid
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  // Faculty Card
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
  facultyCardDescription: {
    fontSize: 13,
    color: "black",
    lineHeight: 18,
    marginBottom: 6,
  },
  viewCourses: { fontSize: 13, color: "black", fontWeight: "500" },

  // Quick Links
  quickLinks: { padding: 20, marginBottom: 30 },
  linkItem: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 14,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",

    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  linkText: { fontSize: 16, color: "brown" },
});
