import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { AppLogo } from '../../components/AppLogo';
import { InspirationGrid } from '../../components/InspirationGrid';

const inspirationImages = [
  { uri: 'https://picsum.photos/200/300', key: '1' },
  { uri: 'https://picsum.photos/200/301', key: '2' },
  // add more images as needed
];

export default function InspirationScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <AppLogo />
      <InspirationGrid
        images={inspirationImages}
        onImagePress={() => router.push('/(tabs)/camera')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6FF',
    paddingHorizontal: 24,
    paddingTop: 32,
  },
});