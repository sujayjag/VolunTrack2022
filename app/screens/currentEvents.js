import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform, ImageBackground, Image, Button, Pressable, TouchableOpacity} from 'react-native';

const currentEvents = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <TouchableOpacity style={styles.createdButton} onPress={() => navigation.navigate("createdCurrent")}>
                <Text style={styles.createdText}>Created Events</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.joinedButton} onPress={() => navigation.navigate("joinedCurrent")}>
                <Text style={styles.joinedText}>Joined Events</Text>
            </TouchableOpacity>
        </View>
    );
}  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    createdButton: {
        width: "40%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF1493",
        marginBottom: 20,
        marginRight: 10,
    },
    createdText: {
        alignItems: 'center',
        justifyContent: "center",
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    joinedButton: {
        width: "40%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF1493",
        marginBottom: 20,
        marginLeft: 10,
    },
    joinedText: {
        alignItems: 'center',
        justifyContent: "center",
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});

export default currentEvents;