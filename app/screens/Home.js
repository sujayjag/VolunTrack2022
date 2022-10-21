import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, ImageBackground, Image, Button, Pressable} from 'react-native';


const Home = ({ navigation }) => {
    return (
        <ImageBackground style={styles.background} source={require("../assets/background.jpg")}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../assets/logo.png")}/>
                <Text style={styles.titleText}>VolunTrack</Text>
            </View>
            <Pressable style={styles.login} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginText}>Login</Text>
            </Pressable>
            <Pressable style={styles.signUp} onPress={() => navigation.navigate("Sign Up")}>
                <Text style={styles.signUpText}>Sign Up</Text>
            </Pressable>
        </ImageBackground>
    );
}  


const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "flex-end",
    },
    login: {
        alignItems: 'center',
        justifyContent: "center",
        width: "100%",
        height: 70,
        backgroundColor: "#fc5c65",
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
    titleText: {
        fontSize: 45,
        fontWeight: "bold",
    },
    logo: {
        width: 50,
        height: 50,
    },
    logoContainer: {
        marginTop: 30,
        position: "absolute", 
        top: 70,
        alignItems: 'center',
    },
    signUp: {
        alignItems: 'center',
        justifyContent: "center",
        width: "100%",
        height: 70,
        backgroundColor: "#4ecdc4",
    },
    signUpText: {
        alignItems: 'center',
        justifyContent: "center",
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});

export default Home;