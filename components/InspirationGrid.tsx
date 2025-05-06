import React from 'react';
import { View, Image, Pressable, StyleSheet, Dimensions, ScrollView } from 'react-native';

const SPACING = 24;
const IMAGE_SIZE = (Dimensions.get('window').width - SPACING * 3) / 2;

type InspirationImage = {
  uri: string;
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
          <Pressable key={img.key} onPress={() => onImagePress?.(img)}>
            <Image
              source={{ uri: img.uri }}
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 16,
    marginBottom: SPACING,
    backgroundColor: '#EAE6FA',
  },
});