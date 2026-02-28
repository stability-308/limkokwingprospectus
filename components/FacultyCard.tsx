import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, ImageSourcePropType } from 'react-native';
import { Link } from 'expo-router';
import { Faculty } from '../constants/coursesData';

type Props = {
  faculty: Faculty;
};

export default function FacultyCard({ faculty }: Props) {
  // ✅ Handle local and remote images
  const imageSource: ImageSourcePropType =
    typeof faculty.image === 'number' ? faculty.image : { uri: faculty.image as string };

  return (
    <Link
      href={{
        pathname: "/faculty/[id]",
        params: { id: String(faculty.id) },
      }}
      asChild
    >
      <TouchableOpacity style={styles.card}>
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
        <Text style={styles.name}>{faculty.name}</Text>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: { width: '100%', height: 150 },
  name: { fontSize: 18, fontWeight: 'bold', padding: 12 },
});