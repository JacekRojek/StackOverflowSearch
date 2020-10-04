import React from 'react';
import { Button, StyleSheet, TextInput, View, Keyboard } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { getSearchResults, selectQuestion } from '../redux/actions/api';

function SearchBar({ questionURI }) {
  const [query, onChangeText] = React.useState('Java');
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      {questionURI ? (
        <Button
          onPress={() => dispatch(selectQuestion(''))}
          title=" Back "
          color="#222"
          accessibilityLabel="Back"
        />
      ) : null}
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangeText(text)}
        value={query}
      />
      <Button
        onPress={() => {
          Keyboard.dismiss();
          dispatch(getSearchResults(query));
        }}
        title="Search"
        color="#F47F24"
        accessibilityLabel="Search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 60,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10
  },
  input: {
    height: 35,
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1,
    padding: 10,
    margin: 10,
  },
});

const mapStateToProps = (state) => ({ ...state.api });
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
