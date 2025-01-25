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

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashPage.preventAutoHideAsync();
const Stack = createStackNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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
      {/* <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="splash" component={SplashScreen} />
      </Stack> */}

{/* <NavigationContainer> */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        {/* <Stack.Screen name="Signup" component={SignupScreen} /> */}
        <Stack.Screen name="Home" component={HomeScreen} 
        options={{
            title: 'tests', // Title for the AppBar
            headerStyle: {
              backgroundColor: '#ffffff', // AppBar background color
            },
            headerTintColor: '#FFFFFF', // Text color
            headerTitleStyle: {
              fontWeight: 'bold', // Title style
            },
          }}
           />
      </Stack.Navigator>
    {/* </NavigationContainer> */}
    {/* <FloatingAction
    actions={actions}
    color={Colors.primary}
    distanceToEdge={{vertical:60, horizontal: 20}}
    onPressItem={name => {
      console.log(`selected button: ${name}`);
    }}
  /> */}



      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
