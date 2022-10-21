import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform, ImageBackground, Image, Button, Pressable, TextInput, TouchableOpacity, Dropdown} from 'react-native';

const EventForm = ({ navigation }) => {
    const [name, setName] = useState("");
    const [descr, setDesc] = useState("");
    const [date, setDate] = useState(""); 
    const [loc, setLoc] = useState(""); 
    const [max, setMax] = useState("");
    const [cEmail, setCEmail] = useState("");
    const [cNumber, setCNumber] = useState("");


    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Text style={styles.titleText}>Event Form</Text>
            </View>
            <StatusBar style="auto"/>
            <View style={styles.inputContainer}>
                <View style={styles.inputView}>
                    <TextInput
                    style={styles.TextInput}
                    placeholder="Event Name"
                    placeholderTextColor="#003f5c"
                    autoCorrect="False"
                    autoCapitalize="words"
                    onChangeText={(name) => setName(name)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                    style={styles.TextInput}
                    placeholder="Description"
                    placeholderTextColor="#003f5c"
                    autoCorrect="False"
                    autoCapitalize="words"
                    onChangeText={(desc) => setDesc(desc)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                    style={styles.TextInput}
                    placeholder="Date and Time (ex 10/24/2021 9:45am)"
                    placeholderTextColor="#003f5c"
                    autoCorrect="False"
                    onChangeText={(date) => setDate(date)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                    style={styles.TextInput}
                    placeholder="Location"
                    placeholderTextColor="#003f5c"
                    autoCorrect="False"
                    onChangeText={(loc) => setLoc(loc)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                    style={styles.TextInput}
                    placeholder="Max Hours"
                    placeholderTextColor="#003f5c"
                    autoCorrect="False"
                    onChangeText={(max) => setMax(max)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                    style={styles.TextInput}
                    placeholder="Contact email"
                    placeholderTextColor="#003f5c"
                    autoCorrect="False"
                    onChangeText={(cEmail) => setCEmail(cEmail)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                    style={styles.TextInput}
                    placeholder="Contact Number"
                    placeholderTextColor="#003f5c"
                    autoCorrect="False"
                    onChangeText={(cNumber) => setCNumber(cNumber)}
                    />
                </View>
     
                <TouchableOpacity style={styles.signOutButton} onPress={() => navigation.navigate("QRCode")}>
                    <Text style={styles.signOutText}>Start Event</Text>
                </TouchableOpacity>
            </View>
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
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    signOutButton: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FF1493",
      },
    signOutText: {
        alignItems: 'center',
        justifyContent: "center",
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    inputContainer: {
        position: "absolute", 
        top: 150,
        width: "90%",
        alignItems: 'center',
    },
});

export default EventForm;