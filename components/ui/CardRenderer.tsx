
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

const renderCard = (title, price, location, features,width=Dimensions.get('window').width * 0.85) => (
    <View style={[styles.card, {width: width}]} 
    // onPress={()=>{
    //   const navigation = useNavigation;
    //   navigation.navigate("RentalDetails", {
    //     car: {
    //       name: "Aston Martin 2024",
    //       model: "DB12",
    //       price: 330000,
    //       location: "Texas, Washington",
    //       description: "This two-seater car has a 4.0L V8 or 5.2L V12 petrol engine, and is available with automatic or manual transmission. It has a ground clearance of 120mm and a length of 4800 mm with a 2.83 m3 boot space.",
    //       year: 2024
    //     }
    //   });
    // }}
    >
      <View style={styles.cardHeader}>
        <Image
          source={{ uri: 'https://via.placeholder.com/50' }}
          style={styles.avatar}
        />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.description}>
        Enjoy the convenience of a clubhouse, kids play area, and maintenance staff
      </Text>
      <View style={{display: "flex", flexDirection:"row", width:"100%", justifyContent: "space-between"}}>
      <TouchableOpacity>
        <Text style={styles.location}>{location}</Text>
      </TouchableOpacity>
      <Text style={styles.price}>${price}</Text>
      </View>
      <View style={styles.features}>
        {features.map((feature, index) => (
          <Text key={index} style={styles.featureBadge}>{feature}</Text>
        ))}
      </View>
      <View style={styles.footer}>
      <Text style={styles.time}>Posted By: John Doe</Text>
        <Text style={styles.time}>15 minutes ago</Text>
      </View>
    </View>
  );


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f8ff',
      paddingHorizontal: 10,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 10,
      color: '#333',
    },
    card: {
      // width: width, // 70% of screen width
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 15,
      paddingBottom:5,
      marginVertical: 5,
      marginHorizontal: 10,
      borderColor: '#000',
      shadowColor: '#000',
      shadowOpacity: 1,
      shadowRadius: 5,
      elevation: 3,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      // marginBottom: 10,
    },
    avatar: {
      width: 30,
      height: 30,
      borderRadius: 25,
      marginRight: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#007BFF',
    },
    description: {
      fontSize: 14,
      color: '#666',
      marginVertical: 5,
    },
    location: {
      fontSize: 14,
      color: '#007BFF',
      marginVertical: 0,
    },
    features: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginVertical: 5,
    },
    featureBadge: {
      backgroundColor: '#FFA500',
      color: '#fff',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 15,
      marginRight: 5,
      marginBottom: 5,
      fontSize: 12,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 0,
      marginBottom: 0
    },
    price: {
      fontSize: 15,
      fontWeight: 'bold',
      color: '#28a745',
    },
    time: {
      fontSize: 12,
      color: '#aaa',
    },
  });
  
  export default renderCard;