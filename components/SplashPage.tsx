import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";

export default function SplashScreen ({ navigation }) {
    useEffect(() => {
      const timer = setTimeout(() => {
        navigation.replace('Login'); // Navigate to Home after 3 seconds
      }, 3000);
      return () => clearTimeout(timer); // Cleanup the timer
    }, [navigation]);
  
    return (
      <View style={styles.splashContainer}>
        <Text style={styles.splashText}>Welcome to My App</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    splashContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#4CAF50',
    },
    splashText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    homeContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
    },
    homeText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000000',
    },
  });