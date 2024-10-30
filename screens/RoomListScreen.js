// screens/RoomListScreen.js
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, Image, Button, Alert } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { AuthContext } from '../context/AuthContext';

const RoomListScreen = ({ navigation }) => {
  const [rooms, setRooms] = useState([]);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchRooms = async () => {
      const roomCollection = collection(db, 'rooms');
      const roomSnapshot = await getDocs(roomCollection);
      setRooms(roomSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchRooms();
  }, []);

  const handleLogout = async () => {
    try {
      await logout(navigation); // Pass navigation to logout
      Alert.alert("Logged Out", "You have been logged out successfully.");
    } catch (error) {
      Alert.alert("Logout Failed", error.message);
    }
  };

  return (
    <View>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
            <Text>{item.location}</Text>
            <Text>{item.price} per night</Text>
            <Text>{item.description}</Text>
            <Button title="View Details" onPress={() => navigation.navigate('RoomDetail', { roomId: item.id })} />
          </View>
        )}
      />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default RoomListScreen;
