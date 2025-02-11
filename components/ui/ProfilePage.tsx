import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const ProfilePage = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "Select Gender",
    dob: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    preferredCity: "",
    preferredPincode: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.dob.trim()) newErrors.dob = "Date of Birth is required";
    if (!form.email.includes("@")) newErrors.email = "Enter a valid email";
    if (form.mobile.length !== 10) newErrors.mobile = "Enter a valid 10-digit mobile number";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";
    if (!form.pincode.trim() || form.pincode.length !== 6)
      newErrors.pincode = "Enter a valid 6-digit pincode";
    if (!form.country.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });

    // Remove error when user starts typing
    if (errors[field]) {
      let newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Profile Saved Successfully", form);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* <Text style={styles.header}>Profile Page</Text> */}

        {renderInput("First Name", "firstName")}
        {renderInput("Last Name", "lastName")}
        {renderInput("Date of Birth", "dob", "YYYY-MM-DD")}
        {renderInput("Email", "email", "Enter your email", "email-address")}
        {renderInput("Mobile", "mobile", "Enter 10-digit mobile", "phone-pad", 10)}
        {renderInput("Address", "address")}
        {renderInput("City", "city")}
        {renderInput("State", "state")}
        {renderInput("Pincode", "pincode", "Enter 6-digit pincode", "numeric", 6)}
        {renderInput("Country", "country")}
        {renderInput("Preferred City", "preferredCity")}
        {renderInput("Preferred Pincode", "preferredPincode", "Enter pincode", "numeric")}

        {/** Submit Button */}
        <TouchableOpacity style={[styles.button, styles.submitButton]} >
          <Text style={styles.buttonText}>View History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.submitButton]} >
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  function renderInput(label, field, placeholder = "", keyboardType = "default", maxLength) {
    return (
      <>
        <Text style={styles.label}>{label}:</Text>
        <TextInput
          value={form[field]}
          onChangeText={(text) => handleInputChange(field, text)}
          style={styles.input}
          placeholder={placeholder}
          keyboardType={keyboardType}
          maxLength={maxLength}
        />
        {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
      </>
    );
  }
};

const styles = {
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  header: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  label: { fontSize: 14, fontWeight: "bold", marginTop: 10 },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
    marginBottom: 5,
  },
  errorText: { color: "red", fontSize: 12, marginBottom: 10 },
  button: { backgroundColor: "#007bff", padding: 12, borderRadius: 5, marginTop: 10 },
  submitButton: { backgroundColor: Colors.primary, marginBottom: 20 },
  buttonText: { color: "white", textAlign: "center", fontWeight: "bold" },
};

export default ProfilePage;
