import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, ImageBackground, Image, Button, Pressable, TextInput, TouchableOpacity} from 'react-native';

const joinedEvents = ({ navigation }) => {
    return (
        <View>
            <Text>You haven't joined any events at this time.</Text>
        </View>
    );
};

export default joinedEvents; 