import React, { useState } from 'react';
import { View, TextInput, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { AppLogo } from '../../components/AppLogo';
import { GradientButton } from '../../components/GradientButton';

export default function HomeScreen() {
  const [prompt, setPrompt] = useState('');
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleGenerateInspiration = () => {
    if (prompt.trim()) {
      router.push({ pathname: '/(tabs)/inspiration', params: { prompt } });
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top + 32 }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <AppLogo />
      <TextInput
        placeholder="Describe your inspiration..."
        value={prompt}
        onChangeText={setPrompt}
        style={styles.input}
        placeholderTextColor="#B0A9C6"
      />
      <GradientButton onPress={handleGenerateInspiration}>
        Show Inspiration
      </GradientButton>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6FF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    fontSize: 18,
    color: '#3C3A4F',
    marginVertical: 32,
    shadowColor: '#A084E8',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
});