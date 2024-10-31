import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
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
      await logout(navigation);
      Alert.alert("Logged Out", "You have been logged out successfully.");
    } catch (error) {
      Alert.alert("Logout Failed", error.message);
    }
  };

  const RoomCard = ({ item }) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('RoomDetail', { roomId: item.id })}
      style={styles.cardContainer}
    >
      <View style={styles.card}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.cardImage} 
          blurRadius={1}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.overlay}
        />
        <View style={styles.cardContent}>
          <Text style={styles.locationText}>{item.location}</Text>
          <Text style={styles.priceText}>${item.price}/night</Text>
          <Text 
            style={styles.descriptionText} 
            numberOfLines={2}
          >
            {item.description}
          </Text>
          <View style={styles.cardFooter}>
            <TouchableOpacity 
              style={styles.detailButton}
              onPress={() => navigation.navigate('RoomDetail', { roomId: item.id })}
            >
              <Text style={styles.detailButtonText}>View Details</Text>
              <Ionicons name="arrow-forward" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6a11cb', '#2575fc']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Rooms</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradient>
      
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RoomCard item={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  cardContainer: {
    marginBottom: 15,
  },
  card: {
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardImage: {
    width: '100%',
    height: 200,
    position: 'absolute',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cardContent: {
    padding: 15,
    justifyContent: 'flex-end',
    height: 200,
  },
  locationText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  priceText: {
    color: '#e0e0e0',
    fontSize: 16,
    marginBottom: 5,
  },
  descriptionText: {
    color: '#e0e0e0',
    fontSize: 14,
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  detailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  detailButtonText: {
    color: 'white',
    marginRight: 8,
    fontWeight: '600',
  },
});

export default RoomListScreen;