import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {appConfig} from '../config';
import { useNavigation } from '@react-navigation/native';

const DisplayScreen = ({route}) => {
  const {formData} = route.params || {};
   const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Form Details</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {Object.entries(formData).map(([key, value]) => (
          <View key={key} style={styles.row}>
            <Text style={styles.label}>{key}:</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: appConfig?.theme?.backgroundColor,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  backText: {
    textAlign: 'left',
    fontSize: 16,
    color: appConfig?.theme?.textColor,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: appConfig?.theme?.textColor,
    textAlign: 'center',
  },
  content: {
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: appConfig?.theme?.textColor,
  },
  value: {
    fontSize: 16,
    color: '#333',
    flexShrink: 1,
  },
});

DisplayScreen.propTypes = {
  route: PropTypes.object,
};

export default DisplayScreen;
