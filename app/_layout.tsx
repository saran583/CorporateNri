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
import SearchComponent from '@/components/ui/SearchScreen';
import MessagesScreen from '@/components/ui/MessagesComponent';
import MessagesPage from '@/components/ui/MessagesPage';
// import messaging from "@react-native-firebase/messaging"
// import { Alert } from 'react-native';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashPage.preventAutoHideAsync();
const Stack = createStackNavigator();

export default function RootLayout() {

  // const requestUserPermission = async () =>{
  //   const authStatus = await messaging().requestPermission();
  //   const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if(enabled){
  //     console.log("Auth", authStatus)
  //   }
  // }
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/Quattrocento-Regular.ttf'),
  });

  useEffect(() => {
    // // if(requestUserPermission()){
    //   messaging().getToken().then((res)=>{
    //     console.log("toekn",res)
    //   })

    // // }
    // messaging().getInitialNotification().then((remoteMessage)=>{
    //   if(remoteMessage){
    //     console.log("notification caused app to open", remoteMessage.notification)
    //   }
    // })
    if (loaded) {
      SplashPage.hideAsync();
    }
    // else {
    //   messaging().onNotificationOpenedApp((remoteMessage)=>{
    //     console.log(remoteMessage)
    //   })
    
    //   messaging().setBackgroundMessageHandler(async (remoteMessage)=>{
    //     console.log("background", remoteMessage)
    //   })
    
    //   const unsubscribe = messaging().onMessage(async (remoteMessage)=>{
    //     Alert.alert("A new FCM message", JSON.stringify(remoteMessage))
        
    //   });

    //   return unsubscribe;
    // }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

{/* <NavigationContainer> */}
      <Stack.Navigator >
        <Stack.Screen name="Splash" component={SplashScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpPage}  options={{ headerShown: false }} />

        {/* <Stack.Screen name="Signup" component={SignupScreen} /> */}
        <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }}          />
        {/* <Stack.Screen name="Messages" component={MessagesScreen}  options={{
            headerTitle: "Messages",
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}          /> */}
          <Stack.Screen name="MessagesPage" component={MessagesPage}  options={{
            headerTitle: "Messages",
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}          />
        <Stack.Screen name="Home2" component={TabTwoScreen}  options={{ headerShown: false }}          />
        <Stack.Screen name="Home3" component={TabThreeScreen}  options={{ headerShown: false }}          />
        <Stack.Screen name="Profile" component={ProfileScreen}  options={{
            headerTitle: "Profile",
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}          />
          <Stack.Screen name="Search" component={SearchComponent}  options={{
            headerTitle: "Search",
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
