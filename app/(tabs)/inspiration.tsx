import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { AppLogo } from '../../components/AppLogo';
import { InspirationGrid } from '../../components/InspirationGrid';

const DEMO_IMAGES: Record<string, { uri: any; key: string }[]> = {
  'yc': [
    { uri: require('../../assets/demo/Y C/yc1.jpg'), key: 'yc1' },
    { uri: require('../../assets/demo/Y C/yc2.webp'), key: 'yc2' },
    { uri: require('../../assets/demo/Y C/yc3.jpg'), key: 'yc3' },
    { uri: require('../../assets/demo/Y C/yc4.jpg'), key: 'yc4' },
    { uri: require('../../assets/demo/Y C/yc5.jpeg'), key: 'yc5' },
    { uri: require('../../assets/demo/Y C/yc6.jpeg'), key: 'yc6' },
    { uri: require('../../assets/demo/Y C/yc7.jpeg'), key: 'yc7' },
    { uri: require('../../assets/demo/Y C/yc8.jpeg'), key: 'yc8' },
  ],
  'sf bay bridge': [
    { uri: require('../../assets/demo/sfb/sfb1.jpeg'), key: 'sfb1' },
    { uri: require('../../assets/demo/sfb/sfb2.jpeg'), key: 'sfb2' },
    { uri: require('../../assets/demo/sfb/sfb3.jpeg'), key: 'sfb3' },
    { uri: require('../../assets/demo/sfb/sfb4.jpeg'), key: 'sfb4' },
    { uri: require('../../assets/demo/sfb/sfb5.jpeg'), key: 'sfb5' },
    { uri: require('../../assets/demo/sfb/sfb6.jpeg'), key: 'sfb6' },
    { uri: require('../../assets/demo/sfb/sfb7.jpeg'), key: 'sfb7' },
    { uri: require('../../assets/demo/sfb/sfb8.jpeg'), key: 'sfb8' },
  ],
};

export default function InspirationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  function normalizePrompt(prompt: string): string {
    const p = prompt.toLowerCase().trim();
    if (p.includes('y combinator')) return 'yc';
    if (p.includes('golden gate bridge') || p.includes('sf bay bridge')) return 'sf bay bridge';
    return p;
  }

  const prompt = typeof params.prompt === 'string' ? params.prompt : '';
  const images = DEMO_IMAGES[normalizePrompt(prompt)] || [];

  return (
    <ScrollView style={styles.container}>
      <AppLogo />
      <Text style={styles.title}>Inspiration Gallery</Text>
      <InspirationGrid
        images={images}
        onImagePress={() => router.push({ pathname: '/(tabs)/camera', params: { prompt } })}
      />
      {images.length === 0 && (
        <Text style={{ color: '#888', marginTop: 24, textAlign: 'center' }}>No curated images for this prompt.</Text>
      )}
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