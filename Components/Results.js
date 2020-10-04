import React from 'react';
import {
  Dimensions, FlatList, StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator
} from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { WebView } from 'react-native-webview';
import { getSearchResults, selectQuestion } from '../redux/actions/api';

const SPACING = 4;

const ResultsPlaceholder = () => (
  <View style={styles.center}>
    <Text style={styles.center}>Enter Search query</Text>
  </View>
);

const ProgressIndicator = () => (
  <View style={styles.center}>
    <ActivityIndicator size="large" color="#F47F24" />
  </View>
);

const ListItem = ({ item, onPress, width }) => (
  <TouchableOpacity
    style={{ width: width - (2 * SPACING), ...styles.resultContainer }}
    onPress={() => onPress(item.link)}
  >
    <View style={styles.profile}>
      <Image source={{ uri: item.owner.profile_image }} style={styles.logo} />
      <Text adjustsFontSizeToFit>{item.owner.display_name}</Text>
    </View>
    <View style={styles.questionContainer}>
      <Text style={styles.questionText} ellipsizeMode="tail" numberOfLines={2}>{item.title}</Text>
      <Text>Answer Count: {item.answer_count || 0 }</Text>
    </View>

  </TouchableOpacity>
);

function Results({ results, questionURI, isFetching, query }) {
  const { width, height } = Dimensions.get('window');
  const dispatch = useDispatch();
  if (!results) return <ResultsPlaceholder />;
  if (isFetching) return <ProgressIndicator />;

  return (
    <View style={styles.container}>
      {questionURI ? (
        <WebView
          style={{ width, height }}
          source={{ uri: questionURI }}
        />
      ) : (
        <FlatList
          onRefresh={() => dispatch(getSearchResults(query))}
          refreshing={isFetching}
          data={results}
          renderItem={({ item }) => (
            <ListItem
              width={width}
              item={item}
              onPress={(link) => dispatch(selectQuestion(link))}
            />
          )}
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
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  resultContainer: {
    backgroundColor: '#F47F2440',
    flexDirection: 'row',
    padding: 5,
    margin: SPACING,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    width: 50,
    height: 50,
  },
  profile: {
    width: 80,
    height: 90,
    margin: 5,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  questionContainer: {
    height: 90,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    flexShrink: 1,
  },
  questionText: {
    flex: 1,
    flexShrink: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const mapStateToProps = (state) => ({ ...state.api });
const mapDispatchToProps = (dispatch) => ({
  getSearchResults: () => dispatch(getSearchResults())
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
