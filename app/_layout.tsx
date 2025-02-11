import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashPage from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import SplashScreen from '@/components/SplashPage';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@/components/HomeScreen';
import LoginScreen from '@/components/ui/LoginScreen';
import { FloatingAction } from 'react-native-floating-action';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import HomeRentalForm from '@/components/ui/HomeRentalForm';
import OtherRentalForm from '@/components/ui/OtherRentalForm';
import SignUpPage from '@/components/ui/SignUpPage';
import UtilityRental from '@/components/ui/UtilityForm';
import PropertyDetails from '@/components/ui/DetailPage';
import TabTwoScreen from './(tabs)/explore';
import TabThreeScreen from './(tabs)/explore copy';
import ProfileScreen from '@/components/ui/ProfilePage';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashPage.preventAutoHideAsync();
const Stack = createStackNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/Quattrocento-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashPage.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  
  const actions = [
    {
      text: "Accessibility",
      icon:<IconSymbol size={28} name="house.fill" color="#FFF" />,
      name: "bt_accessibility",
      position: 2,
      color: Colors.primary
    },
    {
      text: "Language",
      icon:<IconSymbol size={28} name="house.fill" color="#FFF" />,
      name: "bt_language",
      position: 1,
      color: Colors.primary
    },
    {
      text: "Location",
      icon: <IconSymbol size={28} name="house.fill" color="#FFF" />,
      name: "bt_room",
      position: 3,
      color: Colors.primary,
      textStyle:{ fontSize: 14}
    },
    
  ];

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

{/* <NavigationContainer> */}
      <Stack.Navigator >
        <Stack.Screen name="Splash" component={SplashScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpPage}  options={{ headerShown: false }} />

        {/* <Stack.Screen name="Signup" component={SignupScreen} /> */}
        <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }}          />
        <Stack.Screen name="Home2" component={TabTwoScreen}  options={{ headerShown: false }}          />
        <Stack.Screen name="Home3" component={TabThreeScreen}  options={{ headerShown: false }}          />
        <Stack.Screen name="Profile" component={ProfileScreen}  options={{
            headerTitle: "Profile",
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}          />


        <Stack.Screen name="HomeRental" component={HomeRentalForm} options={{
            headerTitle: "Create Home Rental",
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }} />
        <Stack.Screen name="OtherRental" component={OtherRentalForm} options={{
            headerTitle: "Other Listing",
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }} />
          <Stack.Screen name="UtilityRental" component={UtilityRental} options={{
            headerTitle: "Commerce Listing",
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }} />
          <Stack.Screen name="DetailPage" component={PropertyDetails}  options={{
            headerTitle: "Rental Detail Page",
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }} />

          {/* <Stack.Screen name="RentalDetails" component={RentalDetails} options={{
            headerTitle: "Rental Details",
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }} /> */}


      </Stack.Navigator>
   



      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
