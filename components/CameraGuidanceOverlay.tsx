import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';
import { CameraView } from 'expo-camera';
import { Sparkles } from 'lucide-react-native';

interface CameraGuidanceOverlayProps {
  camera: any; // Using any to avoid complex type issues with CameraView
}

export default function CameraGuidanceOverlay({ camera }: CameraGuidanceOverlayProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [guidanceText, setGuidanceText] = useState('Initializing camera...');
  const [poseGuidance, setPoseGuidance] = useState('');
  const [cameraSettings, setCameraSettings] = useState('');
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      })
    ]).start();

    // Pulsing animation for the icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        })
      ])
    ).start();

    if (!camera) {
      return;
    }

    const analyzeScene = async () => {
      try {
        // Simulate lighting analysis
        const lighting = Math.random() > 0.5 ? 'good' : 'low';
        const settings = getOptimalSettings(lighting);
        
        // Simulate pose analysis
        const pose = getPoseGuidance();

        setCameraSettings(`Lighting: ${settings.lighting}\nExposure: ${settings.exposure}\nISO: ${settings.iso}`);
        setPoseGuidance(pose);
        setGuidanceText('Adjusting camera settings...');
      } catch (error) {
        console.error('Error analyzing scene:', error);
        setGuidanceText('Camera ready');
      }
    };

    // Initial analysis
    analyzeScene();
    
    // Set up periodic updates
    const interval = setInterval(analyzeScene, 2000);
    
    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [camera]);

  const getOptimalSettings = (lighting: string) => {
    if (lighting === 'low') {
      return {
        lighting: 'Low light mode',
        exposure: 'High',
        iso: '800'
      };
    }
    return {
      lighting: 'Good light',
      exposure: 'Normal',
      iso: '200'
    };
  };

  const getPoseGuidance = () => {
    const poses = [
      'Stand straight and look at the camera',
      'Turn your head slightly to the right',
      'Smile naturally',
      'Relax your shoulders',
      'Place your hands naturally'
    ];
    return poses[Math.floor(Math.random() * poses.length)];
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-5deg', '5deg']
  });

  return (
    <Animated.View 
      style={[
        styles.overlay,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <TouchableOpacity 
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.8}
      >
        <Animated.View style={[styles.iconContainer, { transform: [{ rotate }] }]}>
          <Sparkles size={20} color="#fff" />
        </Animated.View>
        <Text style={styles.headerText}>Photo Assistant</Text>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.guidanceContainer}>
          <View style={styles.statusContainer}>
            <View style={styles.statusIndicator} />
            <Text style={styles.statusText}>{guidanceText}</Text>
          </View>
          
          {poseGuidance ? (
            <View style={styles.tipContainer}>
              <Text style={styles.tipTitle}>Pose Tip</Text>
              <Text style={styles.tipText}>{poseGuidance}</Text>
            </View>
          ) : null}

          <View style={styles.settingsContainer}>
            {cameraSettings.split('\n').map((setting, index) => (
              <Text key={index} style={styles.settingText}>{setting}</Text>
            ))}
          </View>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    zIndex: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 12,
    borderRadius: 25,
    alignSelf: 'flex-start',
    marginLeft: 16,
    paddingRight: 20,
  },
  iconContainer: {
    backgroundColor: 'rgba(124, 58, 237, 0.9)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  headerText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  guidanceContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 16,
    marginTop: 8,
    padding: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#7c3aed',
    marginRight: 8,
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  tipContainer: {
    backgroundColor: 'rgba(124, 58, 237, 0.2)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#7c3aed',
  },
  tipTitle: {
    color: '#e9d5ff',
    fontWeight: '600',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  tipText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  settingsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  settingText: {
    color: '#d1d5db',
    fontSize: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    margin: 2,
    overflow: 'hidden',
  },
});