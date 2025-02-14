import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {appConfig} from '../config';

const SplashScreen = ({navigation}) => {
  const {animation} = appConfig.splash;

  const fadeAnim = useRef(new Animated.Value(animation.initialOpacity)).current;
  const scaleAnim = useRef(new Animated.Value(animation.initialScale)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: animation.finalOpacity,
        duration: animation.fadeDuration,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: animation.finalScale,
        duration: animation.scaleDuration,
        useNativeDriver: true,
      }),
    ]).start();

    const timeout = setTimeout(() => {
      navigation.navigate('DynamicForm');
    }, animation.delayBeforeNavigate);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: appConfig?.splash?.backgroundColor || '#fff'},
      ]}>
      <Animated.Image
        source={appConfig?.splash?.logo}
        style={[
          styles.logo,
          {opacity: fadeAnim, transform: [{scale: scaleAnim}]},
        ]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  logo: {height: 200, width: 250},
});

export default SplashScreen;
