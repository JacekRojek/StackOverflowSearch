import React from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { getSearchResults } from '../redux/actions/api';

export default function SearchBar() {
  const [query, onChangeText] = React.useState('Useless Placeholder');
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(text) => onChangeText(text)}
        value={query}
      />
      <Button
        onPress={() => dispatch(getSearchResults(query))}
        title="Search"
        color="#841584"
        accessibilityLabel="Search"
      />
    </View>
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
