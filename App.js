import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import Results from './Components/Results';
import SearchBar from './Components/SearchBar';
import configureStore from './redux/store';

export default function App() {
  return (
    <Provider store={configureStore()}>
      <View style={styles.container}>
        <StatusBar />
        <SearchBar />
        <Results />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
