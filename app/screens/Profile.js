import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform, ImageBackground, Image, Button, Pressable, TextInput, TouchableOpacity, Dropdown, Compact, Picker} from 'react-native';
import { getAuth, signOut } from "firebase/auth";

const Profile = ({ navigation }) => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [phone, setPhone] = useState(""); 
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignOut = () => {
      const auth = getAuth();
      signOut(auth).then(() => {
        navigation.navigate("Home");
      }).catch((error) => {
      // An error happened.
        alert(`Error: ${error}`);
      });
    }

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Text style={styles.titleText}>Profile</Text>
            </View>
            <StatusBar style="auto"/>
            <View style={styles.inputContainer}>
                <View style={styles.inputView}>
                    <TextInput
                    style={styles.TextInput}
                    placeholder="Enter First Name"
                    placeholderTextColor="#003f5c"
                    autoCorrect="False"
                    autoCapitalize="words"
                    onChangeText={(fname) => setFname(fname)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                    style={styles.TextInput}
                    placeholder="Enter Last Name"
                    placeholderTextColor="#003f5c"
                    autoCorrect="False"
                    autoCapitalize="words"
                    onChangeText={(lname) => setLname(lname)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                    style={styles.TextInput}
                    placeholder="Enter Phone Number"
                    placeholderTextColor="#003f5c"
                    autoCorrect="False"
                    onChangeText={(phone) => setPhone(phone)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                    style={styles.TextInput}
                    placeholder="Enter Email"
                    placeholderTextColor="#003f5c"
                    autoCorrect="False"
                    onChangeText={(email) => setEmail(email)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                    style={styles.TextInput}
                    placeholder="Enter Role (ex: Volunteer)"
                    placeholderTextColor="#003f5c"
                    autoCorrect="False"
                    onChangeText={(role) => setRole(role)}
                    />
                </View>

                <TouchableOpacity style={styles.signOutButton} onPress={() => handleSignOut()}>
                    <Text style={styles.signOutText}>Sign out</Text>
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

export default Profile;