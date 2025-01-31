import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, ScrollView, TouchableOpacity, CheckBox, Switch } from "react-native";

const OtherRentalForm = () => {
    const [form, setForm] = useState({
      title: "",
      subject: "",
      // contact: "",
      features: "",
      additionalDetails: "",
    });
  
    const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
    console.log("values",field, value)
    if (value.trim() !== "") {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));
    }
  };

  const handleSubmit = () => {
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      if (key !== "additionalDetails" && form[key].toString().trim() === "") {
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
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={[styles.input, errors.title && styles.errorInput]}
        value={form.title}
        onChangeText={(text) => handleInputChange("title", text)}
        placeholder="Enter title"
      />
      {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

      {/* <Text style={styles.label}>Contact</Text>
      <TextInput
        style={[styles.input, errors.contact && styles.errorInput]}
        value={form.contact}
        onChangeText={(text) => handleInputChange("contact", text)}
        placeholder="Enter contact details"
        keyboardType="phone-pad"
      />
      {errors.contact && <Text style={styles.errorText}>{errors.contact}</Text>} */}

      <Text style={styles.label}>Subject</Text>
      <TextInput
        style={[styles.input, errors.subject && styles.errorInput]}
        value={form.subject}
        onChangeText={(text) => handleInputChange("subject", text)}
        placeholder="Enter Subject"
      />
      {errors.subject && <Text style={styles.errorText}>{errors.subject}</Text>}

      <Text style={styles.label}>Features</Text>
      <TextInput
        style={[styles.input, errors.features && styles.errorInput]}
        value={form.features}
        onChangeText={(text) => handleInputChange("features", text)}
        placeholder="Enter features"
      />
      {errors.features && <Text style={styles.errorText}>{errors.features}</Text>}

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
      backgroundColor: Colors.secondary,
      height: "100%"
    },
    scrollContainer:{
        padding: 16
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
      marginBottom: 16,
      backgroundColor: "#f9f9f9",
    },
    textarea: {
      height: 100,
      textAlignVertical: "top",
    },
    rowContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    rowItem: {
      flex: 0.48,
    },
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    checkboxLabel: {
      marginLeft: 8,
      fontSize: 16,
      color: "#555",
    },
    submitButton: {
      backgroundColor: Colors.primary,
      padding: 16,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 16,
    },
    switchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
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
        marginBottom: 16,
        fontSize: 14,
      },
  });
  

export default OtherRentalForm;
