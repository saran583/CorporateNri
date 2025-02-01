import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  ScrollView,
  StyleSheet,
  Dimensions,
  Button,
} from "react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from "@/constants/Colors";

const UtilityRental = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");

  const [utilities, setUtilities] = useState([]);
  const [itemName, setItemName] = useState("");
  const [availableFrom, setAvailableFrom] = useState(new Date());
  const [availableTo, setAvailableTo] = useState(new Date());
  const [price, setPrice] = useState("");
  const [storeLink, setStoreLink] = useState("");
  const [pictures, setPictures] = useState([]);

  const [fromDate, setFromDate] = useState(new Date());
  const [isFromDateVisible, setIsFromDateVisible] = useState(false);
  const [toDate, setToDate] = useState(new Date());
  const [isToDateVisible, setIsToDateVisible] = useState(false);
  

  // Open Image Picker
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      
    });

    console.log(result);

    if (!result.canceled) {
      setPictures(result.assets);
    } 
  };

  // Add a new utility item
  const addUtility = () => {
    if (!itemName || !price || !storeLink || pictures.length === 0) {
      Alert.alert("Error", "Please fill all fields and upload at least one picture.");
      return;
    }

    // if (availableFrom > availableTo) {
    //   Alert.alert("Date Error", "Available From cannot be after Available To.");
    //   return;
    // }

    const newUtility = {
      itemName,
      availableFrom,
      availableTo,
      price,
      storeLink,
      pictures,
    };
    console.log("newUtility",newUtility)

    setUtilities([...utilities, newUtility]);

    // Reset form fields
    setItemName("");
    setAvailableFrom(new Date());
    setAvailableTo(new Date());
    setPrice("");
    setStoreLink("");
    setPictures([]);
  };

  // Submit the form
  const handleSubmit = () => {
    if (!title || !type || !location) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }

    if (utilities.length === 0) {
      Alert.alert("Error", "Please add at least one utility item.");
      return;
    }

    const rentalData = {
      title,
      type,
      location,
      utilities,
    };

    Alert.alert("Submitted Successfully!", JSON.stringify(rentalData, null, 2));
  };
  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Utility Rental</Text>

      {/* Title */}
      <Text style={styles.label}>Title:</Text>
      <TextInput value={title} onChangeText={setTitle} style={styles.input} />

      {/* Type */}
      <Text style={styles.label}>Type:</Text>
      <TextInput value={type} onChangeText={setType} style={styles.input} />

      {/* Location */}
      <Text style={styles.label}>Location:</Text>
      <TextInput value={location} onChangeText={setLocation} style={styles.input} />

      {/* Utility Item Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Add Utility Item</Text>

        <Text style={styles.label}>Item Name:</Text>
        <TextInput value={itemName} onChangeText={setItemName} style={styles.input} />

        <Text style={styles.label}>Available From:</Text>
        <>
        <TouchableOpacity
        onPress={() => setIsFromDateVisible(true)}
        style={{
          padding: 10,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          width: 200,
        }}
      >
        <Text>{fromDate.toDateString()}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isFromDateVisible}
        mode="date"
        onConfirm={(selectedDate) => {
          setIsFromDateVisible(false);
          setFromDate(selectedDate);
        }}
        onCancel={() => setIsFromDateVisible(false)}
      />
    </>

        <Text style={styles.label}>Available To:</Text>
        <>
        <TouchableOpacity
        onPress={() => setIsToDateVisible(true)}
        style={{
          padding: 10,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          width: 200,
        }}
      >
        <Text>{toDate.toDateString()}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isToDateVisible}
        mode="date"
        onConfirm={(selectedDate) => {
          setIsToDateVisible(false);
          setToDate(selectedDate);
        }}
        onCancel={() => setIsToDateVisible(false)}
      />
    </>
        {/* <DatePicker date={availableTo} onDateChange={setAvailableTo} mode="date" /> */}

        <Text style={styles.label}>Price:</Text>
        <TextInput value={price} onChangeText={setPrice} keyboardType="numeric" style={styles.input} />

        <Text style={styles.label}>Store Link:</Text>
        <TextInput value={storeLink} onChangeText={setStoreLink} style={styles.input} />

        {/* Image Picker */}
        <Text style={styles.label}>Upload Pictures:</Text>
        <TouchableOpacity onPress={pickImage} style={styles.button}>
          <Text style={styles.buttonText}>Choose Images</Text>
        </TouchableOpacity>

        {/* Display Selected Images */}
        <FlatList
          horizontal
          data={pictures}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Image source={{ uri: item.uri }} placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000} style={styles.image} />}
        />

        {/* Add Utility Button */}
        <TouchableOpacity onPress={addUtility} style={[styles.button, styles.addButton]}>
          <Text style={styles.buttonText}>Add Utility</Text>
        </TouchableOpacity>
      </View>

      {/* List of Added Utilities */}
      <FlatList
        data={utilities}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.utilityItem,{flex:1, flexDirection: "row"}]}>
            <View >
              <Text style={styles.utilityText}>📦 {item.itemName}</Text>
              <Text>From: {item.availableFrom.toDateString()}</Text>
              <Text>To: {item.availableTo.toDateString()}</Text>
              <Text>Price: ${item.price}</Text>
              <Text>Store: {item.storeLink}</Text>
            </View>
            <Image
              style={styles.images}
              source={{uri:item.pictures[0].uri}}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
              resizeMode="contain" 
            />
          </View>
        )}
      />

      {/* Submit Button */}
      <TouchableOpacity onPress={handleSubmit} style={[styles.button, styles.submitButton]}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f9f9f9" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  label: { fontSize: 14, fontWeight: "bold", marginTop: 10 },
  input: { borderWidth: 1, borderRadius: 5, padding: 8, backgroundColor: "white", marginBottom: 10 },
  card: { borderWidth: 1, borderRadius: 10, padding: 15, backgroundColor: "white", marginBottom: 20 },
  cardTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  button: { backgroundColor: "#007bff", padding: 10, borderRadius: 5, marginTop: 10 },
  addButton: { backgroundColor: "green" },
  submitButton: { backgroundColor: "blue", marginBottom: 20 },
  buttonText: { color: "white", textAlign: "center", fontWeight: "bold" },
  image: { width: 60, height: 60, margin: 5 },
  images: {
    flex: 1,
    width: 60,
    height: 60,
    margin: "auto",
  },
  utilityItem: { padding: 10, borderBottomWidth: 1, backgroundColor: Colors.secondary, borderRadius: 10, marginBottom: 5 },
  utilityText: { fontSize: 16, fontWeight: "bold" },
});

export default UtilityRental;
