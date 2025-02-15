import { Colors } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";



const MessagesPage = () => {

    const navigation = useNavigation()
    const [selection, setSelection] = useState("")

  return (
    <View style={{backgroundColor:"#fff", minHeight: "100%"}}>
        <TouchableOpacity onPress={()=>{navigation.navigate("Messages",{selection:"Received"})}} style={{paddingHorizontal: 10, paddingVertical: 20, borderWidth: 1 }}>
      <Text style={{fontSize: 16}}>Interestes Received</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>{navigation.navigate("Messages",{selection:"Sent"})}} style={{paddingHorizontal: 10, paddingVertical: 20, borderWidth: 1, borderTopWidth:0 }}>
      <Text style={{fontSize: 16}}>Interestes Sent</Text>
    </TouchableOpacity>
    
    </View>
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

export default MessagesPage;
