import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Colors } from '@/constants/Colors';

const SignUpPage = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [showOTP,setShowOTP] = useState(false)

  const onSubmit = (data) => {
    if(!showOTP){
      setShowOTP(true)
    }
    console.log(data);
  };



  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <Controller
            control={control}
            rules={{ required: 'First name is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.firstName && styles.errorInput]}
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                placeholder="Enter first name"
              />
            )}
            name="firstName"
          />
          {errors.firstName && <Text style={styles.error}>{errors.firstName.message}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name</Text>
          <Controller
            control={control}
            rules={{ required: 'Last name is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.lastName && styles.errorInput]}
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                placeholder="Enter last name"
              />
            )}
            name="lastName"
          />
          {errors.lastName && <Text style={styles.error}>{errors.lastName.message}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Company Name</Text>
          <Controller
            control={control}
            rules={{ required: 'Company name is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.companyName && styles.errorInput]}
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                placeholder="Enter company name"
              />
            )}
            name="companyName"
          />
          {errors.companyName && <Text style={styles.error}>{errors.companyName.message}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Corporate Email Address</Text>
          <Controller
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Enter a valid email',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.email && styles.errorInput]}
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                placeholder="Enter email"
                keyboardType="email-address"
              />
            )}
            name="email"
          />
          {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mobile Number</Text>
          <Controller
            control={control}
            rules={{
              required: 'Mobile number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Enter a valid 10-digit mobile number',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.mobileNumber && styles.errorInput]}
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                placeholder="Enter mobile number"
                keyboardType="phone-pad"
              />
            )}
            name="mobileNumber"
          />
          {errors.mobileNumber && <Text style={styles.error}>{errors.mobileNumber.message}</Text>}
        </View>


        {showOTP&&<View style={styles.inputContainer}>
          <Text style={styles.label}>OTP</Text>
          <Controller
            control={control}
            rules={{
              required: 'Mobile number is required'
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.otp && styles.errorInput]}
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                placeholder="Enter OTP"
                keyboardType="phone-pad"
              />
            )}
            name="otp"
          />
          {errors.mobileNumber && <Text style={styles.error}>{errors.otp.message}</Text>}
        </View>}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.submitText}> { showOTP?"Sign UP":"Get OTP"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: Colors.secondary,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // for Android
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    height: 45,
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    fontSize: 16,
  },
  errorInput: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    width: '100%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignUpPage;
