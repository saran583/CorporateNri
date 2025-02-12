import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

import { FloatingAction } from "react-native-floating-action";
import { useNavigation } from '@react-navigation/native';


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();


  const actions = [
    {
      text: "Commerce",
      icon:<IconSymbol size={28} name="house.fill" color="#FFF" />,
      name: "utility",
      position: 2,
      color: Colors.primary,
      textStyle:{ fontSize: 15}

    },
    {
      text: "Other",
      icon:<IconSymbol size={28} name="house.fill" color="#FFF" />,
      name: "other",
      position: 1,
      color: Colors.primary,
      textStyle:{ fontSize: 15}

    },
    {
      text: "Rental",
      icon: <IconSymbol size={28} name="house.fill" color="#FFF" />,
      name: "rental",
      position: 3,
      color: Colors.primary,
      textStyle:{ fontSize: 15}
    },
    
  ];



  return (
    <>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {
            backgroundColor: Colors.primary
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Latest',
          tabBarIcon: ({ color }) => <Icon name="whatshot" size={25} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore copy"
        options={{
          title: 'Featured',
          tabBarIcon: ({ color }) =>  <Icon name="star" size={25} color={color} />,
        }}
      />
    </Tabs>
    <FloatingAction
    actions={actions}
    color={Colors.primary}
    distanceToEdge={{vertical:60, horizontal: 20}}
    actionsPaddingTopBottom={2}
    onPressItem={name => {
      navigation.navigate(name=='rental'?"HomeRental":name=='other'?"OtherRental":"UtilityRental")
      console.log(`selected button: ${name}`);
    }}
  />
    </>
  );
}
