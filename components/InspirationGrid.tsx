import React from 'react';
import { View, Image, Pressable, StyleSheet, Dimensions, ScrollView } from 'react-native';

const SPACING = 24;
const IMAGE_SIZE = (Dimensions.get('window').width - SPACING * 3) / 2;

type InspirationImage = {
  uri: string | number;
  key: string;
};

type InspirationGridProps = {
  images: InspirationImage[];
  onImagePress?: (img: InspirationImage) => void;
};

export function InspirationGrid({ images, onImagePress }: InspirationGridProps) {
  return (
    <ScrollView 
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.grid}>
        {images.map(img => (
          <Pressable
            key={img.key}
            onPress={() => onImagePress?.(img)}
            style={[styles.imageBox, { height: img.key.startsWith('sfb') ? 380 : 220 }]}
          >
            <Image
              source={typeof img.uri === 'string' ? { uri: img.uri } : img.uri}
              style={styles.image}
              resizeMode="cover"
            />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollViewContent: {
    paddingBottom: 100, // Extra space at the bottom for better scrolling
  },
  grid: {
    flexDirection: 'column',
    marginTop: 24,
    width: '100%',
  },
  imageBox: {
    width: '100%',
    height: 220,
    borderRadius: 18,
    backgroundColor: '#EAE6FA',
    marginBottom: SPACING,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
    backgroundColor: '#fff',
    resizeMode: 'cover',
  },
});