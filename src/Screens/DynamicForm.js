import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {appConfig} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DynamicForm = ({navigation}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const {formFields, animations, logo, buttonStyles} = appConfig || {};

  const buttonScale = useRef(new Animated.Value(1)).current;
  const logoScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (animations?.logoScale) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(logoScale, {
            toValue: animations.logoScale.toValue,
            duration: animations.logoScale.duration,
            useNativeDriver: true,
          }),
          Animated.timing(logoScale, {
            toValue: 1,
            duration: animations.logoScale.duration,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [animations]);

  const handleInputChange = (key, value) => {
    setFormData(prev => ({...prev, [key]: value}));
    if (value.trim() !== '') {
      setErrors(prev => ({...prev, [key]: ''}));
    }
  };

  const handleSubmit = async () => {
    let newErrors = {};
    formFields.forEach(field => {
      if (!formData[field.key] || formData[field.key].trim() === '') {
        newErrors[field.key] = `Please Enter ${field.label} which is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const savedForms =
      JSON.parse(await AsyncStorage.getItem('formDataList')) || [];
    await AsyncStorage.setItem(
      'formDataList',
      JSON.stringify([...savedForms, formData]),
    );

    navigation.navigate('ListingScreen');

    setFormData({});
    setErrors({});
  };

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: animations.buttonPressScale,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: animations.buttonReleaseScale,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Animated.Image
              source={logo}
              style={[styles.logo, {transform: [{scale: logoScale}]}]}
              resizeMode="contain"
            />
            <Text style={styles.title}>Fill the Registration Form</Text>
          </View>

          {formFields.map(field => (
            <View key={field.key} style={styles.inputContainer}>
              <Text style={styles.label}>{field.label}</Text>
              <TextInput
                style={[
                  styles.input,
                  errors[field.key] ? styles.inputError : {},
                ]}
                placeholder={field.placeholder}
                placeholderTextColor="#888"
                secureTextEntry={field.type === 'password'}
                keyboardType={
                  field.type === 'email'
                    ? 'email-address'
                    : field.type === 'number'
                    ? 'numeric'
                    : 'default'
                }
                value={formData[field.key] || ''}
                onChangeText={text => handleInputChange(field.key, text)}
              />
              {errors[field.key] && (
                <Text style={styles.errorText}>{errors[field.key]}</Text>
              )}
            </View>
          ))}

          <Animated.View style={{transform: [{scale: buttonScale}]}}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: buttonStyles.backgroundColor,
                },
              ]}
              onPress={handleSubmit}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={{transform: [{scale: buttonScale}]}}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: buttonStyles.backgroundColor,
                },
              ]}
              onPress={() => {
              navigation.navigate('ListingScreen');
              setFormData({});
              setErrors({});
              }}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}>
              <Text style={styles.buttonText}>Go to Form Listing Page</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: appConfig?.theme?.backgroundColor},
  scrollContainer: {padding: 20, alignItems: 'center'},
  header: {alignItems: 'center', marginBottom: 20},
  logo: {
    height: 120,
    width: 120,
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  title: {fontSize: 22, fontWeight: 'bold', color: appConfig?.theme?.textColor},
  inputContainer: {width: '100%', marginBottom: 15},
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: appConfig?.theme?.textColor,
  },
  input: {
    color: '#444',
    borderWidth: 1,
    padding: 14,
    borderRadius: 10,
    borderColor: appConfig?.theme?.shadowBorderColor,
    shadowColor: appConfig?.theme?.shadowBorderColor,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
    elevation: 6,
    fontSize: 13,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    padding: appConfig.buttonStyles.padding,
    borderRadius: appConfig.buttonStyles.borderRadius,
    marginTop: 20,
    width: 200,
    alignItems: 'center',
    shadowColor: appConfig.buttonStyles.shadowColor,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 4},
    elevation: 5,
  },
  buttonText: {color: '#fff', fontSize: 14, fontWeight: 'bold', textAlign: 'center'},
});

DynamicForm.propTypes = {
  navigation: PropTypes.object,
};

export default DynamicForm;
