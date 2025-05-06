import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { AppLogo } from '../../components/AppLogo';
import { InspirationGrid } from '../../components/InspirationGrid';

const inspirationImages = [
  { uri: 'https://picsum.photos/300/300?random=1', key: '1' },
  { uri: 'https://picsum.photos/300/300?random=2', key: '2' },
  { uri: 'https://picsum.photos/300/300?random=3', key: '3' },
  { uri: 'https://picsum.photos/300/300?random=4', key: '4' },
  { uri: 'https://picsum.photos/300/300?random=5', key: '5' },
  { uri: 'https://picsum.photos/300/300?random=6', key: '6' },
  { uri: 'https://picsum.photos/300/300?random=7', key: '7' },
  { uri: 'https://picsum.photos/300/300?random=8', key: '8' },
  { uri: 'https://picsum.photos/300/300?random=9', key: '9' },
  { uri: 'https://picsum.photos/300/300?random=10', key: '10' },
  { uri: 'https://picsum.photos/300/300?random=11', key: '11' },
  { uri: 'https://picsum.photos/300/300?random=12', key: '12' },
  { uri: 'https://picsum.photos/300/300?random=13', key: '13' },
  { uri: 'https://picsum.photos/300/300?random=14', key: '14' },
  { uri: 'https://picsum.photos/300/300?random=15', key: '15' },
  { uri: 'https://picsum.photos/300/300?random=16', key: '16' },
  { uri: 'https://picsum.photos/300/300?random=17', key: '17' },
  { uri: 'https://picsum.photos/300/300?random=18', key: '18' },
  { uri: 'https://picsum.photos/300/300?random=19', key: '19' },
  { uri: 'https://picsum.photos/300/300?random=20', key: '20' },
];

export default function InspirationScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <AppLogo />
      <Text style={styles.title}>Inspiration Gallery</Text>
      <InspirationGrid
        images={inspirationImages}
        onImagePress={() => router.push('/(tabs)/camera')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6FF',
    paddingHorizontal: 24,
    paddingTop: 32,
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
});