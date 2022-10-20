import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform, ImageBackground, Image, Button, Pressable, TextInput, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = () => {
      const auth = getAuth();
      let emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if(!(email && password)) {
        alert("Please fill out both fields");
        return;
      }
      else if(!emailRe.test(String(email).toLowerCase())){
        alert('Please enter a valid email')
      }
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          navigation.navigate("Dashboard")
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
         });
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../assets/logo.png")}/>
                <Text style={styles.titleText}>VolunTrack</Text>
            </View>
            <StatusBar style="auto" />
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

            <TouchableOpacity style={styles.signUpButton} onPress={() => handleSignIn()}>
                    <LinearGradient
                        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                        colors={['#FBD786', '#f7797d']} style={styles.signUpButton}>
                        <Text style={styles.signUpText}>Login</Text>
                    </LinearGradient>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({

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
        top: 70,
        alignItems: 'center',
    },
    inputView: {
        backgroundColor: "#edebec",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 5,
        marginTop: 10,
    },
     
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    loginButton: {
        width: "60%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FF1493",
      },
    loginText: {
        alignItems: 'center',
        justifyContent: "center",
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});

export default Login;