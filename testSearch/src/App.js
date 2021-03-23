/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * 
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  // Text,
  useColorScheme,
  View,
  Platform,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { SearchPage } from './pages/SearchPage'
import { SearchPage2 } from './pages/SearchPage2'
import Icon from 'react-native-vector-icons/FontAwesome';
import { SearchBar, Text } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App: () => Node = () => {
  const [searchTxt, setSearchTxt] = React.useState("");
  let searchRef = null;

  const isDarkMode = useColorScheme() === 'dark';

  const updateSearch = (val) => {
    setSearchTxt(val);
  };

  return (
    <SafeAreaProvider style={styles.container}>
      {/* SearchPage will call api which returned the filtered data everytime user types */}
      <SearchPage />

      {/* SearchPage2 will call api which returned the all the data first, then filtered everytime user types */}
      {/* <SearchPage2 /> */}
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Colors.lighter
  },
});

export default App;
