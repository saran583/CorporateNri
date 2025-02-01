import { Colors } from "@/constants/Colors";
import { useEffect } from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
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
        {/* <Text style={styles.splashText}>Corporate NRI</Text> */}
        <Image
        source={require("../assets/images/CNLogo.png")}
        style={styles.image}
      />
      </View>
    );
  };

  const styles = StyleSheet.create({
    splashContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.primary,
    },
    splashText: {
      fontSize: 35,
      fontWeight: 'bold',
      color: Colors.secondary,
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
    image: {
      width: Dimensions.get('window').width * 0.95, // Set image width
      height: 200, // Set image height
      resizeMode: 'contain', // Ensures full image is shown
    },
  });