import React, { ReactNode } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type GradientButtonProps = {
  onPress: () => void;
  children: ReactNode;
};

export function GradientButton({ onPress, children }: GradientButtonProps) {
  return (
    <Pressable style={styles.buttonWrapper} onPress={onPress}>
      <LinearGradient
        colors={['#A084E8', '#F6A9A9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    width: '100%',
    marginBottom: 60,
  },
  button: {
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    shadowColor: '#A084E8',
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});