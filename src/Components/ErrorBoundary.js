import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';

const ErrorBoundary = ({children}) => {
  const netInfo = useNetInfo();
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const memoryCheckInterval = setInterval(checkMemoryUsage, 5000);
    return () => clearInterval(memoryCheckInterval);
  }, []);

  const checkMemoryUsage = async () => {
    try {
      const memoryInfo = await global.performance?.memory;
      if (
        memoryInfo &&
        memoryInfo.usedJSHeapSize > memoryInfo.jsHeapSizeLimit * 0.9
      ) {
        setHasError(true);
        setErrorMessage('Memory overload detected. Please restart the app.');
      }
    } catch (error) {
      console.warn('Memory usage check failed:', error);
    }
  };

  const handleRetry = () => {
    setHasError(false);
    setErrorMessage('');
  };

  if (netInfo?.isConnected === false && netInfo?.isConnected === null) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No internet connection detected.</Text>
        <Text style={styles.subText}>
          Please check your network and try again.
        </Text>
      </View>
    );
  }

  if (hasError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Something went wrong.</Text>
        <Text style={styles.subText}>{errorMessage}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return children;
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8d7da',
  },
  errorText: {fontSize: 18, fontWeight: 'bold', color: '#721c24'},
  subText: {fontSize: 14, color: '#721c24', marginTop: 10, textAlign: 'center'},
  retryButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#dc3545',
    borderRadius: 5,
  },
  retryText: {color: '#fff', fontWeight: 'bold'},
});

export default ErrorBoundary;
