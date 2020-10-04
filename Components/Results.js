import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { getSearchResults } from '../redux/actions/api';

function ListItem({ item }) {
  return (
    <View style={styles.container}>
      <Text>{item.title}</Text>
    </View>
  );
}

function Results({ results }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={results}
        renderItem={ListItem}
        keyExtractor={(item) => item.question_id}
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

const mapStateToProps = (state) => ({ ...state.api });
const mapDispatchToProps = (dispatch) => ({
  getSearchResults: () => dispatch(getSearchResults())
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
