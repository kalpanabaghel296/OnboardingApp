import React, { useRef, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, PanResponder, Animated } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types/types';

type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;

const slides = [
  { id: 1, heading: "Welcome to Touch!", subheading: "A new way to connect, share, and explore. Stay social while enjoying unique, anonymous communities and effortless browsing!", image: require('../assets/images/welcome.png'), showGetStarted: true },
  { id: 2, heading: "Scroll Horizontally", subheading: "Swipe right to enjoy content discovery like never before with our intuitive horizontal layout", image: require('../assets/images/scroll.png') },
  { id: 3, heading: "Content That Matches Your Mood", subheading: "Feed that matches your mood for a truly personalized experience", image: require('../assets/images/mood.png') },
  { id: 4, heading: "Join Anonymous Communities", subheading: "Express yourself freely in a safe, anonymous space", image: require('../assets/images/anonymes.png') },
  { id: 5, heading: "Your Moments, Your Way", subheading: "Post photos, videos, and stories. Customize with filters, hashtags, and captions to express yourself in your way!", image: require('../assets/images/post.png') },
  { id: 6, heading: "You’re in Control", subheading: "Manage your privacy settings, control who sees your content", image: require('../assets/images/control.png') },
];

const OnboardingScreen = () => {
  const swiperRef = useRef<Swiper>(null);
  const navigation = useNavigation<OnboardingScreenNavigationProp>(); 

  const translateX = useRef(new Animated.Value(0)).current;
  const [isDragging, setIsDragging] = useState(false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      setIsDragging(true);
    },
    onPanResponderMove: Animated.event([null, { dx: translateX }], { useNativeDriver: false }),
    onPanResponderRelease: (_, gestureState) => {
      setIsDragging(false);
      if (Math.abs(gestureState.dx) > 50) {
        console.log("Action Canceled: User dragged away.");
      } else {
        console.log("Action Confirmed: Proceeding...");
        goToNextSlide();
      }
      Animated.spring(translateX, { toValue: 0, useNativeDriver: false }).start();
    },
  });

  const goToNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };

  const goToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Swiper ref={swiperRef} loop={false} showsPagination={true} dotStyle={styles.dot} activeDotStyle={styles.activeDot}>
        {slides.map((slide, index) => (
          <View key={slide.id} style={styles.slide}>
            <Text style={styles.heading}>{slide.heading}</Text>
            <Image source={slide.image} style={styles.image} />
            <Text style={styles.subheading}>{slide.subheading}</Text>

            <View style={styles.buttonContainer}>
              {/* Skip button - Redirects to Home */}
              <TouchableOpacity style={styles.skipButton} onPress={goToHome}>
                <Text style={styles.skipText}>Skip</Text>
              </TouchableOpacity>

              {/* Get Started / Next / Finish Button with Cancel-ability */}
              {index === 0 ? (
                <Animated.View style={{ transform: [{ translateX }] }} {...panResponder.panHandlers}>
                  <TouchableOpacity style={styles.getStartedButton} onPress={goToNextSlide}>
                    <Text style={styles.buttonText}>Get Started</Text>
                  </TouchableOpacity>
                </Animated.View>
              ) : index === slides.length - 1 ? (
                <Animated.View style={{ transform: [{ translateX }] }} {...panResponder.panHandlers}>
                  <TouchableOpacity style={styles.nextButton} onPress={goToHome}>
                    <Text style={styles.buttonText}>Finish</Text>
                  </TouchableOpacity>
                </Animated.View>
              ) : (
                <Animated.View style={{ transform: [{ translateX }] }} {...panResponder.panHandlers}>
                  <TouchableOpacity style={styles.nextButton} onPress={goToNextSlide}>
                    <Text style={styles.buttonText}>Next</Text>
                  </TouchableOpacity>
                </Animated.View>
              )}
            </View>
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  slide: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  heading: { fontSize: 26, fontWeight: 'bold', fontFamily: 'Poppins-Regular', color: '#333', textAlign: 'center', marginBottom: 50 },
  subheading: { fontSize: 18, color: '#555555', fontFamily: 'Poppins-Regular', fontWeight: 'bold', textAlign: 'center', marginVertical: 10, marginBottom: 75 },
  image: { width: 350, height: 300, resizeMode: 'contain', marginBottom: 60 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 20, position: 'absolute', bottom: 50 },
  skipButton: { backgroundColor: 'white', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 10 },
  getStartedButton: { backgroundColor: '#D63384', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 10 },
  nextButton: { backgroundColor: '#D63384', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 10 },
  skipText: { fontSize: 18, fontWeight: 'bold', color: '#D63384', textAlign: 'center' },
  buttonText: { fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center' },
  dot: { backgroundColor: '#bbb', width: 8, height: 8, borderRadius: 4, marginHorizontal: 3 },
  activeDot: { backgroundColor: '#D63384', width: 10, height: 10, borderRadius: 5 },
});

export default OnboardingScreen;
