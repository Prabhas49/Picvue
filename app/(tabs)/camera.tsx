import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, Animated, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { CameraView, useCameraPermissions, CameraType } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, Camera as CameraIcon, RefreshCw, Image as ImageIcon, Zap } from 'lucide-react-native';
import CameraGuidanceOverlay from '../../components/CameraGuidanceOverlay';

export default function CameraScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState<'off' | 'on'>('off');
  const cameraRef = useRef(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  const handleCapture = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.85, duration: 80, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();
    // TODO: Add actual capture logic here
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <LinearGradient colors={['#1a1a2e', 'transparent']} style={styles.headerGradient}>
          <View style={styles.topBar}>
            <Pressable onPress={() => router.back()} style={({ pressed }) => [styles.iconButton, pressed && styles.iconButtonPressed]}>
              <ChevronLeft size={28} color="#fff" />
            </Pressable>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.title}>PicVue</Text>
              <Text style={styles.subtitle}>Take the perfect shot</Text>
            </View>
            <Pressable onPress={() => setFlash(flash === 'off' ? 'on' : 'off')} style={({ pressed }) => [styles.iconButton, pressed && styles.iconButtonPressed]}>
              <Zap size={24} color={flash === 'on' ? '#FFD700' : '#fff'} opacity={flash === 'on' ? 1 : 0.5} />
            </Pressable>
          </View>
        </LinearGradient>
        <View style={styles.cameraContainer}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing={facing}
            ratio="16:9"
            flash={flash}
          >
            <CameraGuidanceOverlay camera={cameraRef.current} />
          </CameraView>
        </View>
        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.bottomOverlay}>
          <View style={styles.bottomBar}>
            <Pressable style={styles.iconButton}>
              <ImageIcon size={28} color="#fff" />
            </Pressable>
            <Animated.View style={[styles.captureButton, { transform: [{ scale: scaleAnim }] }]}>
              <Pressable style={styles.captureButtonInner} onPress={handleCapture}>
                <CameraIcon size={36} color="#fff" />
              </Pressable>
            </Animated.View>
            <Pressable
              onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}
              style={styles.iconButton}
            >
              <RefreshCw size={28} color="#fff" />
            </Pressable>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#111' },
  safeArea: { flex: 1, backgroundColor: '#111' },
  headerGradient: { width: '100%', paddingBottom: 12, paddingTop: 0 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  title: { color: '#fff', fontSize: 22, fontWeight: '700', letterSpacing: 1 },
  subtitle: { color: '#bbb', fontSize: 13, fontWeight: '400', marginTop: -2 },
  cameraContainer: { flex: 1, backgroundColor: '#000', borderRadius: 22, overflow: 'hidden', margin: 8 },
  camera: { flex: 1 },
  bottomOverlay: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: '28%',
    justifyContent: 'flex-end',
  },
  bottomBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 32, paddingBottom: 30, paddingTop: 16,
  },
  iconButton: {
    width: 46, height: 46, borderRadius: 23,
    backgroundColor: 'rgba(255,255,255,0.13)', justifyContent: 'center', alignItems: 'center',
    marginHorizontal: 4,
  },
  iconButtonPressed: { backgroundColor: 'rgba(255,255,255,0.23)' },
  captureButton: {
    width: 68, height: 68, borderRadius: 34,
    backgroundColor: '#A084E8',
    justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#fff',
    shadowColor: '#A084E8', shadowOpacity: 0.4, shadowRadius: 6, shadowOffset: { width: 0, height: 3 },
  },
  captureButtonInner: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.13)', justifyContent: 'center', alignItems: 'center',
  },
});