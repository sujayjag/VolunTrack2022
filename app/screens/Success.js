import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform, ImageBackground, Image, Button, Pressable, TextInput, TouchableOpacity, Dropdown} from 'react-native';

const Success = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Text style={styles.titleText}>Successfully Joined</Text>
                <Text style={styles.titleText}>Successfully Left</Text>
            </View>

            <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate("Dashboard")}>
                    <Text style={styles.homeText}>Go Home</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    titleText: {
        fontSize: 45,
        fontWeight: "bold",
    },
    logo: {
        width: 50,
        height: 50,
    },
    logoContainer: {
        position: "absolute", 
        top: 20,
        bottom: 70,
        alignItems: 'center',
    },
    inputView: {
        backgroundColor: "#FFC0CB",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 10,
        marginTop: 15,
    },
    homeButton: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FF1493",
      },
    homeText: {
        alignItems: 'center',
        justifyContent: "center",
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});

export default Success;