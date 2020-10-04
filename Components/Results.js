import React from 'react';
import {
  Dimensions, FlatList, StyleSheet, Text, View
} from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { WebView } from 'react-native-webview';
import { getSearchResults, selectQuestion } from '../redux/actions/api';

function Results({ results, questionURI }) {
  const { width, height } = Dimensions.get('window');
  const dispatch = useDispatch();
  const ListItem = ({ item, onPress }) => (
    <View style={styles.container} onTouchStart={() => onPress(item.link)}>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {questionURI ? (
        <WebView
          style={{ width, height }}
          source={{ uri: questionURI }}
        />
      ) : (
        <FlatList
          data={results}
          renderItem={({ item }) =>
            <ListItem item={item} onPress={(link) => dispatch(selectQuestion(link))} />}
          keyExtractor={(item) => item.question_id}
        />
      )}
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
