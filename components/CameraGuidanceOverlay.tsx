import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';
import { CameraView } from 'expo-camera';
import { Sparkles } from 'lucide-react-native';

interface CameraGuidanceOverlayProps {
  prompt: string;
}

export default function CameraGuidanceOverlay({ prompt }: CameraGuidanceOverlayProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  // Hardcoded camera settings and pose guidance for demo
  let fakeSettings = null;
  let poseGuidance = null;
  if (prompt && prompt.toLowerCase().includes('y combinator')) {
    fakeSettings = {
      mode: 'Aperture Priority (A or Av)',
      aperture: 'f/2.8',
      shutter_speed: '1/100s',
      iso: '100 or 200',
      focus: 'single-point autofocus on the face of the person in the middle',
      white_balance: 'Auto or adjust manually',
    };
    poseGuidance = {
      positioning: 'staggered formation',
      spacing: 'ensure enough space between subjects',
      interaction: 'stand in front of a sign or interact with each other',
      expressions: 'natural expressions, smile naturally',
      eye_contact: 'at least one subject making eye contact with the camera',
    };
  } else if (prompt && (prompt.toLowerCase().includes('golden gate bridge') || prompt.toLowerCase().includes('sf bay bridge'))) {
    fakeSettings = {
      mode: 'Aperture Priority (A or Av)',
      aperture: 'f/2.8',
      shutter_speed: '1/200s',
      iso: '100 or 200',
      focus: "single-point autofocus on the subject's face or shoulder",
      white_balance: 'Auto or adjust manually',
    };
    poseGuidance = {
      positioning: 'off-center, rule of thirds',
      background: 'use the iconic bridge as a background element',
      interaction: 'look out at the water, touch the ground',
      expressions: 'contemplative or relaxed',
      lighting: 'position the subject to take advantage of natural light',
    };
  }

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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
  }, []);

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

      {/* Only show overlay if expanded and we have guidance */}
      {isExpanded && (fakeSettings || poseGuidance) && (
        <View style={styles.guidanceContainer}>
          {fakeSettings && (
            <View style={styles.tipContainer}>
              <Text style={styles.tipTitle}>Optimal Camera Settings</Text>
              {'mode' in fakeSettings && <Text style={styles.tipText}>Mode: {fakeSettings.mode}</Text>}
              {'aperture' in fakeSettings && <Text style={styles.tipText}>Aperture: {fakeSettings.aperture}</Text>}
              {'shutter_speed' in fakeSettings && <Text style={styles.tipText}>Shutter: {fakeSettings.shutter_speed}</Text>}
              {'iso' in fakeSettings && <Text style={styles.tipText}>ISO: {fakeSettings.iso}</Text>}
              {'focus' in fakeSettings && <Text style={styles.tipText}>Focus: {fakeSettings.focus}</Text>}
              {'white_balance' in fakeSettings && <Text style={styles.tipText}>White Balance: {fakeSettings.white_balance}</Text>}
            </View>
          )}
          {poseGuidance && (
            <View style={styles.tipContainer}>
              <Text style={styles.tipTitle}>Pose Guidance</Text>
              {'positioning' in poseGuidance && <Text style={styles.tipText}>Positioning: {poseGuidance.positioning}</Text>}
              {'spacing' in poseGuidance && <Text style={styles.tipText}>Spacing: {poseGuidance.spacing}</Text>}
              {'background' in poseGuidance && <Text style={styles.tipText}>Background: {poseGuidance.background}</Text>}
              {'interaction' in poseGuidance && <Text style={styles.tipText}>Interaction: {poseGuidance.interaction}</Text>}
              {'expressions' in poseGuidance && <Text style={styles.tipText}>Expressions: {poseGuidance.expressions}</Text>}
              {'eye_contact' in poseGuidance && <Text style={styles.tipText}>Eye Contact: {poseGuidance.eye_contact}</Text>}
              {'lighting' in poseGuidance && <Text style={styles.tipText}>Lighting: {poseGuidance.lighting}</Text>}
            </View>
          )}
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