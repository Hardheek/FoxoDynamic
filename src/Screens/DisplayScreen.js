import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {appConfig} from '../config';

const DisplayScreen = ({route}) => {
  const {formData} = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Form Details</Text>
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
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
