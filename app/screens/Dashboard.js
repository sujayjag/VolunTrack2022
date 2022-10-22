import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, ImageBackground, Image, Button, Pressable, TextInput, TouchableOpacity} from 'react-native';

const Dashboard = ({ navigation }) => {
    return (
        <View style={styles.cont}>
            <StatusBar style="auto"/>

            <TouchableOpacity style={styles.profileIcon2} onPress={() => navigation.navigate("Profile")}>
                <Image style = {styles.logo} source={require("../assets/user.png")}></Image> 
            </TouchableOpacity>

            <View style={{justifyContent: 'space-between'}}>
                <Text style={styles.titleText}></Text>
            </View>
            <View style={{justifyContent: 'space-between'}}>
                <Text style={styles.titleText}></Text>
            </View>
            <View style={{justifyContent: 'space-between'}}>
                <Text style={styles.titleText}></Text>
            </View>
            <View style={{justifyContent: 'space-between'}}>
                <Text style={styles.titleText}></Text>
            </View>

            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../assets/logo.png")}/>
                <Text style={styles.titleText}>VolunTrack</Text>
            </View>
                
            <TouchableOpacity style={styles.joinButton} onPress={() => navigation.navigate("Join")}>
                <Text style={styles.joinText}>Join / Leave Event</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate("EventForm")}>
                <Text style={styles.createText}>Create Event</Text>
            </TouchableOpacity>

            <View style={styles.container}>
                <TouchableOpacity style={styles.pastButton} onPress={() => navigation.navigate("pastEvents")}>
                    <Text style={styles.pastText}>Past Events</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.currentButton} onPress={() => navigation.navigate("currentEvents")}>
                    <Text style={styles.currentText}>Current Events</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    logoContainer: {
        position: "absolute", 
        top: 70,
        alignItems: 'center',
    },
    titleText: {
        fontSize: 45,
        fontWeight: "bold",
    },
    logo: {
        width: 50,
        height: 50,
    },
    profileIcon2: {
        width: 50,
        height: 50,
        position: "absolute",
        top: 20,
        right: 20,
    },

    cont: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
    },
    joinButton: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF1493",
        marginBottom: 30,
        marginTop: 200,
    },
    joinText: {
        alignItems: 'center',
        justifyContent: "center",
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    createButton: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF1493",
    },
    createText: {
        alignItems: 'center',
        justifyContent: "center",
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

    pastButton: {
        width: "40%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF1493",
        marginBottom: 20,
        marginRight: 10,
    },
    pastText: {
        alignItems: 'center',
        justifyContent: "center",
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    currentButton: {
        width: "40%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF1493",
        marginBottom: 20,
        marginLeft: 10,
    },
    currentText: {
        alignItems: 'center',
        justifyContent: "center",
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    profileIcon: {
        width: 50,
        height: 50,
        backgroundColor: "red",
        position: "absolute",
        top: 20,
        right: 20,
    },
    join: {
        alignItems: 'center',
        justifyContent: "center",
        width: "100%",
        height: 70,
        backgroundColor: "limegreen",
    },
    signUp: {
        alignItems: 'center',
        justifyContent: "center",
        width: "100%",
        height: 70,
        backgroundColor: "#4ecdc4",
    },
});

export default Dashboard;