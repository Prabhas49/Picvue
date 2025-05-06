import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { CameraView, useCameraPermissions, CameraType } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, Camera as CameraIcon, RefreshCw, Image as ImageIcon } from 'lucide-react-native';
import CameraGuidanceOverlay from '../../components/CameraGuidanceOverlay';

export default function CameraScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const cameraRef = useRef(null);

  // Request permission if not granted
  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topBar}>
          <Pressable onPress={() => router.back()} style={styles.iconButton}>
            <ChevronLeft size={28} color="#fff" />
          </Pressable>
          <Text style={styles.title}>Camera</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.cameraContainer}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing={facing}
            ratio="16:9"
          >
            <CameraGuidanceOverlay camera={cameraRef.current} />
          </CameraView>
        </View>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.bottomOverlay}
        >
          <View style={styles.bottomBar}>
            <Pressable style={styles.iconButton}>
              <ImageIcon size={28} color="#fff" />
            </Pressable>
            <LinearGradient
              colors={['#A084E8', '#F6A9A9']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.captureButton}
            >
              <Pressable style={styles.captureButtonInner}>
                <CameraIcon size={36} color="#fff" />
              </Pressable>
            </LinearGradient>
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
  root: {
    flex: 1,
    backgroundColor: '#111',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#111',
  },
  topBar: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});