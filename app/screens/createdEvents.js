import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, ImageBackground, Image, Button, Pressable, TextInput, TouchableOpacity} from 'react-native';

const createdEvents = ({ navigation }) => {
    return (
        <View>
            <Text>You haven't created any events at this time.</Text>
        </View>
    );
};

export default createdEvents; 