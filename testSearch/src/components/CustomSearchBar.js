import { SearchBar, Button } from 'react-native-elements';
import React from 'react'
import { Platform } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export const CustomSearchBar: () => Node = ({ searchTxt, onChangeText, onCancel=null }) => {

  // const updateSearch = (txt) => {
  //   setSearchTxt(txt)
  // };
  let searchRef = React.createRef();

  const handleBackPress = () => {
    searchRef.blur()
    searchRef.clear()
  }

  return (
    <SearchBar
      ref={search => searchRef = search}
      placeholder="Search for a menu..."
      onChangeText={onChangeText}
      value={searchTxt}
      leftIconContainerStyle={{
        marginLeft: 20,
      }}
      platform={Platform.OS}
      containerStyle={{
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,
      }}
      searchIcon={<Icon name="search" size={25} color={"orange"} style={{"margin":2, "padding":2}}></Icon>}
      // cancelIcon={<Icon name="arrow-left" size={25} color={"orange"} onPress={handleBackPress}></Icon>}
      cancelIcon={<Button
        icon={
          <Icon
            name="arrow-left"
            size={25}
            color="orange"
          />
        }
        iconRight
        onPress={handleBackPress}
        type="clear"
        buttonStyle={{"margin":2, "padding":2}}
      />}
      // onCancel={onCancel}
      showLoading={true}
    />
  );
}