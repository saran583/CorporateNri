import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity, CheckBox, Switch, Modal, FlatList } from "react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from "react-native";


const HomeRentalForm = () => {
    const [form, setForm] = useState({
      // title: "",
      location: "",
      pinCode: "",
      monthlyRent: "",
      bedrooms: "",
      squareFeet: "",
      deposit: "",
      petFriendly: false,
      doYouSmoke: false,
      features: "",
      additionalDetails: "",
      category: "",
      availableFrom: new Date(),
      rentalDuration: "",
      nearByGroceries: "",
      rentalType: "",
      busConnectivity: "",
      parking: false,
      foodPreference: "",
      preferredGender: "",
      salePrice: "",
      advance: "",
      duration: "",
      bathRooms: "",
      pictures: []
    });
  
    const [errors, setErrors] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [modal1Visible, setModal1Visible] = useState(false);
    const [isFromDateVisible, setIsFromDateVisible] = useState(false);
    const [isPreferredFoodVisible, setIsPreferredFoodVisible] = useState(false);
    const [isPrefferedGenderVisible, setIsPrefferedGenderVisible] = useState(false);

    // const [pictures, setPictures] = useState([]);
    const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  

  const pickImage = async () => {
      Alert.alert("Select Image", "Choose an option", [
        { text: "Camera", onPress: openCamera },
        { text: "Gallery", onPress: openGallery }
      ],{cancelable: true});
    };
  
    // Function to open the camera
    const openCamera = async () => {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        handleInputChange("pictures",[...form.pictures, result.assets[0]]);
      }
    };
  
    // Function to open the gallery
    const openGallery = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        allowsMultipleSelection: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
            handleInputChange("pictures",result.assets);
          }
    };


  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
    console.log("values",field, value)
    if (field !=="petFriendly" && field !=="doYouSmoke"  && field !=="parking" && value.trim() !== "") {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));
    }
  };

  const categories = ['Sale', "Rent"];
  const foodCategories = ["Veg", "Non-Veg", "Any"]
  const GenderCategories = ["Male", "Female", "Other", "Any"]
  const durations = ["days","months", "Years"]


  const handleSubmit = () => {
    const newErrors = {};
    let nonValidationKeys = ["additionalDetails", "petFriendly", "doYouSmoke"]
    let rentalKeys = ["monthlyRent", "deposit", "rentalDuration", "duration", "preferredGender", "foodPreference"]
    let saleKeys = ["salePrice", "advance"]
    let skipableKeys = [...nonValidationKeys, ...form.category==="Rent"?saleKeys:rentalKeys]
    Object.keys(form).forEach((key) => {
      if (skipableKeys.includes(key)==false && form[key].toString().trim() === "") {
        newErrors[key] = "This field is required";
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form Submitted:", form);
    }
  };
  
    return (
        <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.label}>Title</Text>
      <TextInput
        style={[styles.input, errors.title && styles.errorInput]}
        value={form.title}
        onChangeText={(text) => handleInputChange("title", text)}
        placeholder="Enter title"
      />
      {errors.title && <Text style={styles.errorText}>{errors.title}</Text>} */}
      

      <View style={styles.rowContainer}>

      <View style={styles.rowItem}>
      <Text style={styles.label}>Rental Type</Text>
      <TouchableOpacity style={[styles.input, errors.category && styles.errorInput]} onPress={() => setModalVisible(true)}>
        <Text style={form.category ? styles.textSelected : styles.textPlaceholder}>
          {form.category || "Select rental Type"}
        </Text>
      </TouchableOpacity>
      {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
      </View>

      {/* Modal for Dropdown */}
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
                    handleInputChange("category", item)
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.itemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.rowItem}>
      <Text style={styles.label}>Pincode</Text>
      <TextInput
        style={[styles.input, errors.pinCode && styles.errorInput]}
        placeholder="Enter Pincode"
        keyboardType="numeric"
        value={form.pinCode}
        onChangeText={(text) => handleInputChange("pinCode", text)}
      />
      {errors.pinCode && <Text style={styles.errorText}>{errors.pinCode}</Text>}
      </View>
    </View>

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={[styles.input, errors.location && styles.errorInput]}
        value={form.location}
        onChangeText={(text) => handleInputChange("location", text)}
        placeholder="Enter location"
      />
      {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}

      {form.category == "Rent"?<><View style={styles.rowContainer}>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Monthly Rent</Text>
          <TextInput
            style={[styles.input, errors.monthlyRent && styles.errorInput]}
            value={form.monthlyRent}
            onChangeText={(text) => handleInputChange("monthlyRent", text)}
            placeholder="Enter rent"
            keyboardType="numeric"
          />
          {errors.monthlyRent && <Text style={styles.errorText}>{errors.monthlyRent}</Text>}
        </View>

        <View style={styles.rowItem}>
          <Text style={styles.label}>Deposit</Text>
          <TextInput
            style={[styles.input, errors.deposit && styles.errorInput]}
            value={form.deposit}
            onChangeText={(text) => handleInputChange("deposit", text)}
            placeholder="Enter deposit"
            keyboardType="numeric"
          />
          {errors.deposit && <Text style={styles.errorText}>{errors.deposit}</Text>}
        </View>

      </View>
      <View style={styles.rowContainer}>
      <View style={styles.rowItem}>
          <Text style={styles.label}>Rental Duration</Text>
          <TextInput
            style={[styles.input, errors.rentalDuration && styles.errorInput]}
            value={form.rentalDuration}
            onChangeText={(text) => handleInputChange("rentalDuration", text)}
            placeholder="Enter rental Duration"
            keyboardType="numeric"
          />
          {errors.rentalDuration && <Text style={styles.errorText}>{errors.rentalDuration}</Text>}
        </View>

        <View style={styles.rowItem}>
          <Text style={styles.label}>    </Text>
        <TouchableOpacity style={[styles.input, errors.duration && styles.errorInput]} onPress={() => setModal1Visible(true)}>
        <Text style={form.duration ? styles.textSelected : styles.textPlaceholder}>
          {form.duration || "Select Duration period"}
        </Text>
      </TouchableOpacity>
      {errors.duration && <Text style={styles.errorText}>{errors.duration}</Text>}
      </View>

      {/* Modal for Dropdown */}
      <Modal visible={modal1Visible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={durations}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    handleInputChange("duration", item)
                    setModal1Visible(false);
                  }}
                >
                  <Text style={styles.itemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setModal1Visible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
          
        </View>

        {/* </View> */}
        </>

      

      :<View style={styles.rowContainer}>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Sale Price</Text>
          <TextInput
            style={[styles.input, errors.salePrice && styles.errorInput]}
            value={form.salePrice}
            onChangeText={(text) => handleInputChange("salePrice", text)}
            placeholder="Enter price"
            keyboardType="numeric"
          />
          {errors.salePrice && <Text style={styles.errorText}>{errors.salePrice}</Text>}
        </View>

        <View style={styles.rowItem}>
          <Text style={styles.label}>Advance</Text>
          <TextInput
            style={[styles.input, errors.advance && styles.errorInput]}
            value={form.advance}
            onChangeText={(text) => handleInputChange("advance", text)}
            placeholder="Enter advance"
            keyboardType="numeric"
          />
          {errors.advance && <Text style={styles.errorText}>{errors.advance}</Text>}
        </View>
      </View>}

      

      <View style={styles.rowContainer}>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Available From</Text>
          <>
        <TouchableOpacity
        onPress={() => setIsFromDateVisible(true)}
        style={{
          padding: 10,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          backgroundColor: "#fff"
        }}
      >
        <Text>{form.availableFrom.toDateString()}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isFromDateVisible}
        mode="date"
        onConfirm={(selectedDate) => {
          setIsFromDateVisible(false);
          handleInputChange("availableFrom", selectedDate)
        }}
        onCancel={() => setIsFromDateVisible(false)}
      />
        </>
        </View>

        <View style={styles.rowItem}>
          <Text style={styles.label}>Bedrooms</Text>
          <TextInput
            style={[styles.input, errors.bedrooms && styles.errorInput]}
            value={form.bedrooms}
            onChangeText={(text) => handleInputChange("bedrooms", text)}
            placeholder="Enter bedrooms"
            keyboardType="numeric"
          />
          {errors.bedrooms && <Text style={styles.errorText}>{errors.bedrooms}</Text>}
        </View>
      </View>

      <View style={styles.rowContainer}>

      <View style={styles.rowItem}>
          <Text style={styles.label}>BathRooms</Text>
          <TextInput
            style={[styles.input, errors.bathRooms && styles.errorInput]}
            value={form.bathRooms}
            onChangeText={(text) => handleInputChange("bathRooms", text)}
            placeholder="Enter bathRooms"
            keyboardType="numeric"
          />
          {errors.bathRooms && <Text style={styles.errorText}>{errors.bathRooms}</Text>}
        </View>

        <View style={styles.rowItem}>
          <Text style={styles.label}>Square Feet</Text>
          <TextInput
            style={[styles.input, errors.squareFeet && styles.errorInput]}
            value={form.squareFeet}
            onChangeText={(text) => handleInputChange("squareFeet", text)}
            placeholder="Enter area"
            keyboardType="numeric"
          />
          {errors.squareFeet && <Text style={styles.errorText}>{errors.squareFeet}</Text>}
        </View>

        
      </View>


      

      <View style={styles.rowContainer}>
        <View style={styles.rowItem}>
          <Text style={styles.label}>NearBy Groceries</Text>
          <TextInput
            style={[styles.input, errors.nearByGroceries && styles.errorInput]}
            value={form.nearByGroceries}
            onChangeText={(text) => handleInputChange("nearByGroceries", text)}
            placeholder="Enter Near by Groceries"
          />
          {errors.nearByGroceries && <Text style={styles.errorText}>{errors.nearByGroceries}</Text>}
        </View>

        <View style={styles.rowItem}>
          <Text style={styles.label}>Bus Connectivity</Text>
          <TextInput
            style={[styles.input, errors.busConnectivity && styles.errorInput]}
            value={form.busConnectivity}
            onChangeText={(text) => handleInputChange("busConnectivity", text)}
            placeholder="Enter bus connectivity"
          />
          {errors.busConnectivity && <Text style={styles.errorText}>{errors.busConnectivity}</Text>}
        </View>
      </View>

      <View style={styles.rowContainer}>
        

        <View style={{...styles.rowItem, marginBottom: -10}}>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Parking?</Text>
            <Switch
              value={form.parking}
              onValueChange={(value) => handleInputChange("parking", value)}
            />
          </View>
        </View>

        <View style={styles.rowItem}>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Pet Friendly?</Text>
            <Switch
              value={form.petFriendly}
              onValueChange={(value) => handleInputChange("petFriendly", value)}
            />
          </View>
        </View>
      </View>


      {/* <View style={styles.rowContainer}> */}
        

        <View style={styles.rowItem}>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Smoking Allowed?</Text>
        <Switch
          value={form.doYouSmoke}
          onValueChange={(value) => handleInputChange("doYouSmoke", value)}
        />
      </View>
      </View>
      {/* </View> */}

      {form.category == "Rent"&&<View style={styles.rowContainer}>

      <View style={styles.rowItem}>
      <Text style={styles.label}>Food Preference</Text>
      <TouchableOpacity style={[styles.input, errors.foodPreference && styles.errorInput]} onPress={() => setIsPreferredFoodVisible(true)}>
        <Text style={form.foodPreference ? styles.textSelected : styles.textPlaceholder}>
          {form.foodPreference || "Select preference"}
        </Text>
      </TouchableOpacity>
      {errors.foodPreference && <Text style={styles.errorText}>{errors.foodPreference}</Text>}
      </View>

      {/* Modal for Dropdown */}
      <Modal visible={isPreferredFoodVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={foodCategories}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    handleInputChange("foodPreference", item)
                    setIsPreferredFoodVisible(false);
                  }}
                >
                  <Text style={styles.itemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      <View style={styles.rowItem}>
      <Text style={styles.label}>Preferred Gender</Text>
      
      <TouchableOpacity style={[styles.input, errors.preferredGender && styles.errorInput]} onPress={() => setIsPrefferedGenderVisible(true)}>
        <Text style={form.preferredGender ? styles.textSelected : styles.textPlaceholder}>
          {form.preferredGender || "Select preference"}
        </Text>
      </TouchableOpacity>
      {errors.preferredGender && <Text style={styles.errorText}>{errors.preferredGender}</Text>}
      </View>

      {/* Modal for Dropdown */}
      <Modal visible={isPrefferedGenderVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={GenderCategories}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    handleInputChange("preferredGender", item)
                    setIsPrefferedGenderVisible(false);
                  }}
                >
                  <Text style={styles.itemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>}

      <Text style={styles.label}>Amenties</Text>
      <TextInput
        style={[styles.input, errors.features && styles.errorInput]}
        value={form.features}
        onChangeText={(text) => handleInputChange("features", text)}
        placeholder="Enter Amenities"
      />
      {errors.features && <Text style={styles.errorText}>{errors.features}</Text>}

      <Text style={styles.label}>Upload Pictures:</Text>
        <TouchableOpacity onPress={pickImage} style={styles.button}>
          <Text style={styles.buttonText}>Choose Images</Text>
        </TouchableOpacity>
      {errors.pictures && <Text style={styles.errorText}>{errors.pictures}</Text>}

        {/* Display Selected Images */}
        <FlatList
          horizontal
          data={form.pictures}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Image source={{ uri: item.uri }} placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000} style={styles.image} />}
        />

      <Text style={styles.label}>Additional Details</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        value={form.additionalDetails}
        onChangeText={(text) => handleInputChange("additionalDetails", text)}
        placeholder="Enter additional details"
        multiline
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: Colors.secondary
    },
    scrollContainer:{
        padding: 16
    },
    picker: {
      flex: 1,
      height: 50,
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 10,
      color: "#fff",
      backgroundColor: Colors.primary,
      padding: 16,
      paddingBottom: 10,
      paddingTop: 20
    },
    label: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 8,
      color: "#555",
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      padding: 8,
      marginBottom: 10,
      backgroundColor: "#f9f9f9",
    },
    textarea: {
      height: 100,
      textAlignVertical: "top",
    },
    rowContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    rowItem: {
      flex: 0.48,
    },
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    checkboxLabel: {
      marginLeft: 8,
      fontSize: 16,
      color: "#555",
    },
    submitButton: {
      backgroundColor: Colors.primary,
      padding: 5,
      height: 39,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 10,
    },
    switchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
      },
      switchLabel: {
        fontSize: 16,
        color: "#555",
      },
    submitButtonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
    screenContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    screenText: {
      fontSize: 20,
      fontWeight: "bold",
    },
    errorInput: {
        borderColor: "#ff0000",
      },
      errorText: {
        color: "#ff0000",
        marginBottom: 10,
        fontSize: 14,
      },
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
      closeButton: {
        padding: 15,
        alignItems: "center",
      },
      closeButtonText: {
        color: "red",
        fontSize: 16,
      },
      button: { backgroundColor: Colors.primary, padding: 5, borderRadius: 5, marginTop: 10 },
  addButton: { backgroundColor: "green" },
  buttonText: { color: "white", textAlign: "center", fontWeight: "bold", fontSize: 18 },
  image: { width: 60, height: 60, margin: 5 },
  images: {
    flex: 1,
    width: 60,
    height: 60,
    margin: "auto",
  },
  });
  

export default HomeRentalForm;
