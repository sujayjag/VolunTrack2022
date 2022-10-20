import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, ImageBackground, Image, Button, Pressable, TextInput, TouchableOpacity} from 'react-native';

const currentEvents = ({ navigation }) => {
    return (
        <View>
            <Text>There are no events at this time.</Text>
        </View>
    );
};

export default currentEvents; 