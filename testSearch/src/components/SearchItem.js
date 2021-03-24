import React, { memo, useCallback } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Text, Card } from 'react-native-elements'

const SearchItem:() => Node = ({ item, searchTxt }) => {
    //http://localhost:3000/menus?filter={%22where%22:{%22itemName%22:{%22regexp%22:%22/guz.*/i%22}}}
    const highlightName = useCallback((name) => {
        const parts = name.split(new RegExp(`(${searchTxt})`, 'gi'));
        return (
            <Text style={styles.itemName}>
                {parts.map((part, idx) => part.toLowerCase() === searchTxt.toLowerCase()
                    ? <Text style={{backgroundColor: 'orange'}} key={idx}>{part}</Text> 
                    : part
                )}
            </Text>
        );
    }, [])

    return (
        <>
            <Card containerStyle={styles.cardContainer}>
                <Text h4>Restaurant {item.restaurantsId}</Text>
                <View style={styles.cardContent}>
                    <View style={styles.firstColumn}>
                        {/* <Text style={styles.itemName}>{item.name}</Text> */}
                        <View>{highlightName(item.itemName)}</View>
                        <Text style={styles.itemDesc}>{item.itemDescription}</Text>
                        <Text style={styles.itemPrice}>AU${item.itemCost}</Text>
                    </View>
                    <View style={styles.secondColumn}>
                        <Image
                            style={styles.tinyLogo}
                            source={{
                            uri: 'https://reactnative.dev/img/tiny_logo.png',
                            }}
                        />
                    </View>
                </View>
            </Card>
        </>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        marginLeft: 0,
        marginRight: 0,
        marginTop: 10,
        flex: 1,
    },
    cardContent: {
        marginTop: 15,
        flexDirection: "row",
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    firstColumn: {
        minWidth: "70%",
        flex: 1,
        flexDirection: "column",
        justifyContent: 'space-between',
    },
    itemName: {
        // fontSize: 40,
        marginVertical: 3,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
    },
    itemDesc: {
        // fontSize: 40,
        marginVertical: 3,
        color: 'gray',
        fontWeight: '300',
    },
    itemPrice: {
        // fontSize: 40,
        marginVertical: 3,
        fontWeight: '700',
    },
    tinyLogo: {
        width: 100,
        height: 50,
    },
    secondColumn: {
        minWidth: "30%",
    }
})

export default memo(SearchItem);