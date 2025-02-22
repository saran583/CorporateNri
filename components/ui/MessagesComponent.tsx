import { Colors } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";

const messagesReceived = [
  {
    id: "1",
    type: "received",
    name: "John Doe",
    contact: "+1234567890",
    email: "abc@google.com",
    postTitle: "Flat for Rent",
    postImage: "https://via.placeholder.com/100",
  },
  {
    id: "2",
    type: "received",
    name: "John Doe",
    contact: "+1234567890",
    email: "abc@google.com",
    postTitle: "Flat for Rent",
    postImage: "https://via.placeholder.com/100",
  },
  {
    id: "3",
    type: "received",
    name: "John Doe",
    contact: "+1234567890",
    email: "abc@google.com",
    postTitle: "Flat for Rent",
    postImage: "https://via.placeholder.com/100",
  },
  {
    id: "4",
    type: "received",
    name: "John Doe",
    contact: "+1234567890",
    email: "abc@google.com",
    postTitle: "Flat for Rent",
    postImage: "https://via.placeholder.com/100",
  },
 
];

const messagesSent = [
  {
    id: "1",
    type: "sent",
    name: "Jane Smith",
    contact: "+9876543210",
    email: "abc@google.com",
    postTitle: "Furniture Items for Sale",
    postImage: "https://via.placeholder.com/100",
  },
  {
    id: "2",
    type: "sent",
    name: "Jane Smith",
    contact: "+9876543210",
    email: "abc@google.com",
    postTitle: "Furniture Items for Sale",
    postImage: "https://via.placeholder.com/100",
  },
  {
    id: "3",
    type: "sent",
    name: "Jane Smith",
    contact: "+9876543210",
    email: "abc@google.com",
    postTitle: "Furniture Items for Sale",
    postImage: "https://via.placeholder.com/100",
  },
]



const MessagesScreen = ({selection}) => {

    const navigation = useNavigation()
  console.log(selection)
  // const selection= route.params.selection
    


    const MessageCard = ({ message }) => {
        const isReceived = message.type === "received";
      
        return (
          <View style={[styles.messageContainer, isReceived ? styles.received : styles.sent]}>
          <Text style={{fontWeight:"bold", textAlign:"center", marginBottom: 15, fontSize: 17}}>I am Interested</Text>
            <Text style={styles.name}>{message.name}</Text>
            <Text style={styles.contact}>{message.email}</Text>
            <Text style={styles.contact}>{message.contact}</Text>
            <TouchableOpacity onPress={()=>{navigation.navigate("DetailPage")}}>
              <View style={styles.postContainer}>
                  <Image source={require("../../assets/images/house.jpg")} style={styles.postImage} />
                  <Text style={styles.postTitle}>{message.postTitle}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      };


  return (
    <>
    {selection.length>0 && <FlatList
      data={selection==='Received'?messagesReceived:messagesSent}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <MessageCard message={item} />}
      contentContainerStyle={styles.container}
    />}
    </>
  );
};

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor:Colors.secondary, minHeight:"100%" },
  messageContainer: {
    maxWidth: "80%",
    minWidth: "70%",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#f1f1f1",
  },
  received: { alignSelf: "flex-start", backgroundColor: "#e6f7ff" },
  sent: { alignSelf: "flex-end", backgroundColor: "#d9fdd3" },
  name: { fontWeight: "bold", marginBottom: 5 },
  contact: { fontSize: 15, color: "gray", marginBottom: 8 },
  postContainer: { flexDirection: "row", alignItems: "center", borderWidth: 1, padding: 5, borderRadius: 10, borderColor: "grey" },
  postImage: { width: 50, height: 50, borderRadius: 5, marginRight: 10 },
  postTitle: { fontSize: 15, fontWeight: "bold" },
});

export default MessagesScreen;
