import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { appConfig } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListingScreen = ({navigation}) => {
  const [formDataList, setFormDataList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadFormData();
  }, []);

  const loadFormData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('formDataList');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setFormDataList(parsedData);
        setFilteredData(parsedData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleSearch = text => {
    setSearchText(text);
    if (text === '') {
      setFilteredData(formDataList);
    } else {
      const filtered = formDataList.filter(item =>
        Object.values(item).some(value =>
          value.toLowerCase().includes(text.toLowerCase()),
        ),
      );
      setFilteredData(filtered);
    }
  };

  const loadMoreData = () => {
    if (page * 10 < formDataList.length) {
      setPage(page + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Submitted List Data</Text>
        </View>
      </View>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by Form Name"
        value={searchText}
        placeholderTextColor="#888"
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredData.slice(0, page * 10)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('DisplayScreen', {formData: item})
            }>
            {Object.entries(item).map(([key, value]) => (
              <View key={key} style={styles.row}>
                <Text style={styles.label}>{key}:</Text>
                <Text style={styles.value}>{value}</Text>
              </View>
            ))}
          </TouchableOpacity>
        )}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
      />
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
    color: appConfig?.theme?.textColor,
    textAlign: 'center',
  },
  searchBar: {
    color: appConfig?.theme?.textColor,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    marginBottom: 15,
    borderColor: appConfig?.theme?.shadowBorderColor,
    shadowColor: appConfig?.theme?.shadowBorderColor,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
    elevation: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 15,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: appConfig?.theme?.textColor,
  },
  value: {fontSize: 14, color: '#333'},
});

export default ListingScreen;
