import CardLayout from '@/components/ui/CardLayout';
import renderCard from '@/components/ui/CardRenderer';
import { Colors } from '@/constants/Colors';
import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, FlatList } from 'react-native';

export default function HomeScreen() {

  const data = [
    { id: 1, text: 'Item 1', color: '#FF5733' },
    { id: 2, text: 'Item 2', color: '#33FF57' },
    { id: 3, text: 'Item 3', color: '#3357FF' },
    { id: 4, text: 'Item 4', color: '#F3FF33' },
    { id: 5, text: 'Item 5', color: '#FF33A1' },
  ];


  const windowWidth = Dimensions.get('window').width;
  const cardWidth = windowWidth; // Card width set to 70% of the screen width

  const renderCards = ({ item }) => (
   // <View style={[styles.card, { backgroundColor: item.color }]}>
    //{ /* <Text style={styles.cardTitle}>{item.text}</Text> */ }
    //{ /* <CardLayout title="Villa for Sale" price="$35000" location="texas" features={["pool", "parking", "Gym", "SPA"]} /> */}
     
      renderCard("3bhk Villa For Sale", "30000", "Texas, USA", ["Gym", "Parking", "ClubHouse"])
    
 //</View>
  );


  return (
    <View style={styles.homeContainer}>
   <View style={styles.container}>
    <Text style={styles.title}>Top Stories</Text>
      <FlatList
        data={data}
        renderItem={renderCards}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        pagingEnabled
        contentContainerStyle={{
          paddingHorizontal: (windowWidth - cardWidth) / 2, // Center-align the cards
        }}
      />
    </View>

    <View style={styles.container}>
    <Text style={styles.title}>Latest Posts</Text>
      <FlatList
        data={data}
        renderItem={renderCards}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        pagingEnabled
        contentContainerStyle={{
          paddingHorizontal: (windowWidth - cardWidth) / 2, // Center-align the cards
        }}
      />
    </View>

    <View style={styles.container}>
    <Text style={styles.title}>Featured Posts</Text>
      <FlatList
        data={data}
        renderItem={renderCards}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        pagingEnabled
        contentContainerStyle={{
          paddingHorizontal: (windowWidth - cardWidth) / 2, // Center-align the cards
        }}
      />
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.95, // 95% of screen width
    marginHorizontal: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 10,
    alignSelf: 'center',
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  card: {
    width: Dimensions.get('window').width * 0.85, // 70% of screen width
    height: 'auto',
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '70%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  homeContainer:{
      backgroundColor: Colors.secondary,
      height: '100%'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginLeft: 15
  },
});
