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
  Modal,
} from "react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from "@/constants/Colors";

const UtilityRental = () => {
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [pinCode, setPinCode] = useState("")

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
  const [modalVisible, setModalVisible] = useState(false);
  const categories = ['house','car', 'baby', 'kitchen', 'move out', 'others']
  
  

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
    if ( !type || !location) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }

    if (utilities.length === 0) {
      Alert.alert("Error", "Please add at least one utility item.");
      return;
    }

    const rentalData = {
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
      <Text style={styles.header}>Commerce Rental</Text>

      {/* Title */}
      {/* <Text style={styles.label}>Title:</Text>
      <TextInput value={title} onChangeText={setTitle} style={styles.input} /> */}

      {/* Type */}
      <Text style={styles.label}>Category:</Text>
      <TouchableOpacity style={styles.input} onPress={() => setModalVisible(true)}>
              <Text style={type ? styles.textSelected : styles.textPlaceholder}>
                {type || ""}
              </Text>
            </TouchableOpacity>


            <Modal visible={modalVisible} transparent animationType="slide">
                    <View style={styles.modalContainer}>
                      <View style={styles.modalContent}>
                        <FlatList
                          data={categories}
                          keyExtractor={(item) => item}
                          renderItem={({ item }) => (
                            <TouchableOpacity
                              style={styles.item}
                              onPress={() => {
                               setType(item)
                                setModalVisible(false);
                              }}
                            >
                              <Text style={styles.itemText}>{item}</Text>
                            </TouchableOpacity>
                          )}
                        />
                      </View>
                    </View>
                  </Modal>

      <Text style={styles.label}>Pin Code:</Text>
      <TextInput value={pinCode} keyboardType="numeric" onChangeText={setPinCode} style={styles.input} />

      {/* Location */}
      <Text style={styles.label}>Location Link:</Text>
      <TextInput value={location} onChangeText={setLocation} style={styles.input} />

      {/* Utility Item Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Add Commerce Item  {utilities.length + 1}</Text>

        <Text style={styles.label}>Item Name:</Text>
        <TextInput value={itemName} placeholder="Enter Item Name" onChangeText={setItemName} style={styles.input} />

      <View style={{flex:1,flexDirection:'row', justifyContent: 'space-between'}}>
        <View>
        <Text style={styles.label}>Available From:</Text>
        <>
        <TouchableOpacity
        onPress={() => setIsFromDateVisible(true)}
        style={{
          padding: 10,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          width: 150,
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
        </View>

        <View>
        <Text style={styles.label}>Available To:</Text>
        <>
        <TouchableOpacity
        onPress={() => setIsToDateVisible(true)}
        style={{
          padding: 10,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          width: 150,
        }}
      >
        <Text>{toDate.toDateString()}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isToDateVisible}
        mode="date"
        onConfirm={(selectedDate) => {
          setIsToDateVisible(false);
          if( selectedDate > fromDate ){
          setToDate(selectedDate);
          }
        }}
        onCancel={() => setIsToDateVisible(false)}
      />
        </>
        </View>
      </View>
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
          <Text style={styles.buttonText}>Add Commerce</Text>
        </TouchableOpacity>
      </View>

      {/* List of Added Utilities */}
      <FlatList
        data={utilities}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={[styles.utilityItem,{flex:1, flexDirection: "row"}]}>
            <View >
              <Text>Item  - {index+1}</Text>
              <Text style={styles.utilityText}>📦 {item.itemName}</Text>
              <Text>From: {item.availableFrom.toDateString()}</Text>
              <Text>To: {item.availableTo.toDateString()}</Text>
              <Text>Price: ${item.price}</Text>
              <Text>Store Link: {item.storeLink}</Text>
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
  container: { padding: 20, backgroundColor: Colors.secondary },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  label: { fontSize: 14, fontWeight: "bold", marginTop: 10 },
  input: { borderWidth: 1, borderRadius: 5, padding: 8, backgroundColor: "white", marginBottom: 10 },
  card: { borderWidth: 1, borderRadius: 10, padding: 15, backgroundColor: "white", marginBottom: 20 },
  cardTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  button: { backgroundColor: Colors.primary, padding: 10, borderRadius: 5, marginTop: 10 },
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
  textPlaceholder: {
    color: "#aaa",
  },
  textSelected: {
    color: "#000",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemText: {
    fontSize: 16,
  },
});

export default UtilityRental;
