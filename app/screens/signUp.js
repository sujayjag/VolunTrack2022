import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, Component } from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform, ImageBackground, Image, Button, Pressable, TextInput, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, addDoc, collection, getFirestore } from "firebase/firestore";
import { initializeApp, firebase } from 'firebase/app';

//import firebaseConfig from '../../db/firebaseConfig.js';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCtSa-qK2xb-Wky_vszWWACyTqru9c9l94",
  authDomain: "voluntrack-ba589.firebaseapp.com",
  projectId: "voluntrack-ba589",
  storageBucket: "voluntrack-ba589.appspot.com",
  messagingSenderId: "237292785966",
  appId: "1:237292785966:web:8813a69013f743a1afaabf",
  measurementId: "G-KN9SKC5DYZ"
});

  const validateNumber = num => {
    num = num.replace(/\D/g,'');
    if (num.length === 10) {
      return true;
    }
    return false;
  }

  const signUp = ({ navigation }) => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [phone, setPhone] = useState(""); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const validateFields = (f, l, p, e, pass, c) => {
      let phoneRe = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/
      let emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      //fname, lname, phone, email, password, confirm password, in order.
      if(!(f && l && p && e && pass && c)) {
        alert(`Please fill out all fields`);
        return;
      }
      else if(!validateNumber(p)){
        alert('Please enter a valid phone number')
      }
      else if(!emailRe.test(String(e).toLowerCase())){
        alert('Please enter a valid email')
      }
      else if(pass !== c) {
        alert("Please make sure the passwords match")
      }
      //more validation logic here
      
      
      else{
        p = p.replace(/\D+/g, "");
        setPhone(p);

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
        // Signed in 
            
            // const db = firebase.firestore();
            // const newUser = db.collection("User")
            // firebase.firestore().collection('User').add({
            //  email: email,
            //  fName: fname,
            //  lName: lname,
            //  phoneNum: phone
            // })
              
            const user = userCredential.user;
            navigation.navigate("Dashboard");
            
            
        
            
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
          // ..
          });
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../assets/logo.png")}/>
                <Text style={styles.titleText}>VolunTrack</Text>
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
                    placeholder="Enter Password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    autoCorrect="False"
                    onChangeText={(password) => setPassword(password)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                    style={styles.TextInput}
                    placeholder="Confirm Password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    autoCorrect="False"
                    onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                    />
                </View>

                <TouchableOpacity style={styles.signUpButton} onPress={() => validateFields(fname, lname, phone, email, password, confirmPassword)}>
                    <LinearGradient
                        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                        colors={['#FBD786', '#f7797d']} style={styles.signUpButton}>
                        <Text style={styles.signUpText}>Sign Up</Text>
                    </LinearGradient>
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
        backgroundColor: "#edebec",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 5,
        marginTop: 15,
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    signUpButton: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
 
      },
    signUpText: {
        alignItems: 'center',
        justifyContent: "center",
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#f7f5ed',
    },
    inputContainer: {
        position: "absolute", 
        top: 150,
        width: "90%",
        alignItems: 'center',
    },
    linearGradient: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        marginTop: 40,
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
      },
});

export default signUp;