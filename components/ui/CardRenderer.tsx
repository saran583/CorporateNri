import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

const renderCard = (title, price, location, features) => (
    <View style={styles.card}>
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
      <TouchableOpacity>
        <Text style={styles.location}>{location}</Text>
      </TouchableOpacity>
      <View style={styles.features}>
        {features.map((feature, index) => (
          <Text key={index} style={styles.featureBadge}>{feature}</Text>
        ))}
      </View>
      <View style={styles.footer}>
        <Text style={styles.price}>${price}</Text>
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
      width: Dimensions.get('window').width * 0.85, // 70% of screen width
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
      fontSize: 12,
      fontWeight: 'bold',
      color: '#28a745',
    },
    time: {
      fontSize: 12,
      color: '#aaa',
    },
  });
  
  export default renderCard;