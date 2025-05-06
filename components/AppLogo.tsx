import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function AppLogo() {
  return (
    <View style={styles.logoContainer}>
      <Text style={{ fontSize: 32, fontWeight: 'bold' }}>PicVue AI</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
});