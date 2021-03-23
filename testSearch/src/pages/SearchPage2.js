import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  FlatList,
  // Text,
  useColorScheme,
  View,
  Platform,
  ActivityIndicator,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { CustomSearchBar } from '../components/CustomSearchBar'
import { SearchItem } from '../components/SearchItem'
import Icon from 'react-native-vector-icons/FontAwesome';
import { SearchBar, Text } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import debounce from "lodash.debounce";

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    restaurantsId: 'First Item',
    itemName: 'Shredded Duck Noodles',
    itemDescription: 'this is description for the first item',
    itemCost: "20",
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    restaurantsId: 'Second Item',
    itemName: 'Chicken Salad',
    itemDescription: 'this is description for the second item',
    itemCost: "20",
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    restaurantsId: 'Third Item',
    itemName: 'Mixed Snack Pack',
    itemDescription: 'this is description for the third item',
    itemCost: "20",
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d73',
    restaurantsId: 'Fourth Item',
    itemName: 'Crispy Mushroom Burger',
    itemDescription: 'this is description for the fourth item',
    itemCost: "20",
  },
];

// THIS SEARCH PAGE FETCHES ALL DATA FIRST, THEN IF FILTER IS APPLIED SHOW DATA ACCORDING TO FILTER
export const SearchPage2: () => Node = () => {
    const [isSearched, setIsSearched] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [searchTxt, setSearchTxt] = React.useState("");
    const [data, setData] = React.useState([]);
    const [filteredData, setFilteredData] = React.useState([]);
  
    const isDarkMode = useColorScheme() === 'dark';

    const updateSearch = (txt) => {
      setSearchTxt(txt);
      filterData(txt);
    };

    const filterData = (txt) => {
      const newData = data.filter(function(item){
        const itemData = item.itemName.toUpperCase()
        const textData = txt.toUpperCase()
        return itemData.indexOf(textData) > -1
      })
      setFilteredData(newData)

      if (txt === "") {
        setIsSearched(false)
      } else {
        setIsSearched(true)
      }
    }

    const renderItem = ({item}) => (
      <SearchItem item={item} searchTxt={searchTxt} />
    )

    const handleCancelSearch = () => {
      console.log('test')
    }

    const fetchMenuJSON = async () => {
      let url = `http://10.0.2.2:3001/menus`;
      
      const response = await fetch(url);
      const menus = await response.json();
      setData(menus);
    }

    React.useEffect(() => {
      fetch('http://10.0.2.2:3001/menus')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => {
          setIsLoading(false)
        });
    },[])

    return (
        <>
            <CustomSearchBar searchTxt={searchTxt} onChangeText={updateSearch} onCancel={handleCancelSearch}/>
            {isLoading?
              <View style={[styles.loadingContainer, styles.loadingHorizontal]}>
                <ActivityIndicator size="large" color="#0000ff"/>
              </View>
            :
              filteredData && filteredData.length && isSearched? 
                <FlatList 
                    // contentContainerStyle={styles.scrollViewContainer}
                    data={filteredData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
              :
                isSearched ?
                  <View style={styles.notFoundContainer}>
                    <Icon name="search" size={50} color={"lightgray"} style={styles.notFoundInfo}></Icon>
                    <Text h4 style={styles.notFoundInfo}>Didn't find anything for {searchTxt}</Text>
                    <Text style={[styles.notFoundInfo, styles.textSmall]}>Try searching for another</Text>
                  </View>
                :
                  <View style={styles.notFoundContainer}>
                    <Icon name="search" size={50} color={"lightgray"} style={styles.notFoundInfo}></Icon>
                    <Text style={styles.searchInfo}>Try searching for a menu of your liking</Text>
                  </View>
            }
        </>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    loadingHorizontal: {
      flexDirection: "column",
      justifyContent: "center",
      padding: 10
    },
    scrollViewContainer: {
      flexGrow: 1, 
      justifyContent: 'center'
    },
    notFoundContainer: {
      flexGrow: 1,
      justifyContent: 'center', //Centered vertically
      alignItems: 'center', // Centered horizontally
      paddingHorizontal: 20,
      // flex:1
    },
    notFoundInfo: {
      alignSelf: 'center',
      textAlign: 'center',
      marginBottom: 10,
    },
    textSmall: {
      color: 'gray',
    },
    searchInfo: {
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: 20,
    },
  });