import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform, ImageBackground, Image, Button, Pressable, TextInput, TouchableOpacity, Dropdown, Compact, Picker} from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import { initializeApp, firebase } from 'firebase/app';
import { getDatabase, ref, set, get, push, child, update, remove } from "firebase/database";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyCtSa-qK2xb-Wky_vszWWACyTqru9c9l94",
    authDomain: "voluntrack-ba589.firebaseapp.com",
    projectId: "voluntrack-ba589",
    storageBucket: "voluntrack-ba589.appspot.com",
    messagingSenderId: "237292785966",
    appId: "1:237292785966:web:8813a69013f743a1afaabf",
    measurementId: "G-KN9SKC5DYZ",
    databaseURL: "https://voluntrack-ba589-default-rtdb.firebaseio.com/"
  });
  
const db = getDatabase(firebaseApp);

const Profile = ({ navigation }) => {

    let [fName, setFName] = useState("")
    let [lName, setLName] = useState("")
    let [email, setEmail] = useState("")
    let [phoneNum, setPhoneNum] = useState("")
  
    function SelectData(uid) {
        const dbref = ref(db);
        get(child(dbref, "Users/" + uid)).then((snapshot)=> {
            if (snapshot.exists()) {
                setFName(snapshot.val().firstName)
                setLName(snapshot.val().lastName)
                setEmail(snapshot.val().emailAddress)
                setPhoneNum(snapshot.val().phoneNumber)
            }
            else {
                alert("No data found")
                
            }
         })
         .catch((error)=> {
            alert("unsuccessful, error"+error);
         });
    }

    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;

    SelectData(uid);

    const handleSignOut = () => {
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
                <Text style={styles.title}>Profile</Text>
            </View>
            {<StatusBar style="auto"/>}
            <View style={{justifyContent: 'center'}}>
                <Text style={styles.titleText}>First Name</Text>
                <Text style={styles.baseText}>{fName}</Text>
                <View style={{justifyContent: 'space-between'}}>
                    <Text style={styles.titleText}></Text>
                </View>
                <View style={{justifyContent: 'space-between'}}>
                    <Text style={styles.titleText}></Text>
                </View>
                <View style={{justifyContent: 'space-between'}}>
                    <Text style={styles.titleText}></Text>
                </View>
                <Text style={styles.titleText}>Last Name</Text>
                <Text style={styles.baseText}>{lName}</Text>
                <View style={{justifyContent: 'space-between'}}>
                    <Text style={styles.titleText}></Text>
                </View>
                <View style={{justifyContent: 'space-between'}}>
                    <Text style={styles.titleText}></Text>
                </View>
                <View style={{justifyContent: 'space-between'}}>
                    <Text style={styles.titleText}></Text>
                </View>
                <Text style={styles.titleText}>Email Address</Text>
                <Text style={styles.baseText}>{email}</Text>
                <View style={{justifyContent: 'space-between'}}>
                    <Text style={styles.titleText}></Text>
                </View>
                <View style={{justifyContent: 'space-between'}}>
                    <Text style={styles.titleText}></Text>
                </View>
                <View style={{justifyContent: 'space-between'}}>
                    <Text style={styles.titleText}></Text>
                </View>
                <Text style={styles.titleText}>Phone Number</Text>
                <Text style={styles.baseText}>{phoneNum}</Text>
                <View style={{justifyContent: 'space-between'}}>
                    <Text style={styles.titleText}></Text>
                </View>
                <View style={{justifyContent: 'space-between'}}>
                    <Text style={styles.titleText}></Text>
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
    title: {
        fontSize: 45,
        fontWeight: "bold",
    },
    logo: {
        width: 50,
        height: 50,
    },
    logoContainer: {
        position: "absolute", 
        top: 30,
        bottom: 30,
        marginBottom: 10,
        alignItems: 'center',
    },
    inputView: {
        backgroundColor: "#FFC0CB",
        borderRadius: 30,
        width: "50%",
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
        width: 200,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
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
        top: 100,
        width: "90%",
        alignItems: 'center',
    },
    baseText: {
        alignItems: 'center',
        fontSize: 17, 
    },
    titleText: {
        alignItems: 'center',
        fontSize: 23, 
        fontWeight: "bold"
    }
});

export default Profile;