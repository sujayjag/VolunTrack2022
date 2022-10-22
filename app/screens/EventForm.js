import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform, ImageBackground, Image, Button, Pressable, TextInput, TouchableOpacity, Dropdown} from 'react-native';
import { initializeApp, firebase } from 'firebase/app';
import { getDatabase, ref, set, push, child, update, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import { StyleSheet, Text, View, SafeAreaView, Platform, ImageBackground, Image, Button, Pressable, TextInput, TouchableOpacity, Dropdown, ScrollView} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

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

const EventForm = ({ navigation }) => {    
    const [name, setName] = useState("");
    const [descr, setDesc] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState(""); 
    const [loc, setLoc] = useState(""); 
    const [max, setMax] = useState("");
    const [cEmail, setCEmail] = useState("");
    const [cNumber, setCNumber] = useState("");

    function insertData() {
        //const eventRef = db.ref('Events')
        //const event = ref.child("Events")

        const auth = getAuth()
        const organizer = auth.currentUser
        //const eventData = push(ref(db, "Events/"),{
          const eventId = push(ref(db, "Events/"),{
          name: name,
          description: descr,
          startDate: startDate,
          endDate: endDate,
          location: loc,
          maxHours: max,
          organizerId: organizer.uid,
          contactEmail: cEmail,
          contactNumber: cNumber,
          eventEnded: 1,
          attendedUsers: [0],
        })
        .then((event) => {
          alert("Data Stored Successfully! Event code is " + event.key);
          navigation.navigate("GenerateCode", 
                  {eId: event.key})  
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
        });
      }

      
    const [region, setRegion] = React.useState({
        latitude: 51.5079145,
        longitude: -0.0899163,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    
    
    //const eventId = Math.floor(Math.random() * (999999999999 - 100000000000) + 100000000000)
   
    return (
    <ScrollView>
        <View style={styles.container}>
            {/* <View style={styles.logoContainer}>
                <Text style={styles.titleText}>Event Form </Text>
            </View>  */}
            <StatusBar style="auto"/>
            <View style={styles.inputContainer}>
                <View>
                    <MapView
                        style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        showsUserLocation
                        initialRegion={{
                        latitude: 33.7490,
                        longitude: -84.3880,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421}}
                        onRegionChangeComplete={(region) => setRegion(region)}
                    />
                    <Text style={styles.text}>Current latitude: {region.latitude}</Text>
                    <Text style={styles.text}>Current longitude: {region.longitude}</Text>
                </View>
            
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
                    placeholder="Start DateTime (ex. 10/21/2022 09:30)"
                    placeholderTextColor="#003f5c"
                    autoCorrect="False"
                    onChangeText={(startDate) => setStartDate(startDate)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                    style={styles.TextInput}
                    placeholder="End DateTime (ex. 10/21/2022 13:30)"
                    placeholderTextColor="#003f5c"
                    autoCorrect="False"
                    onChangeText={(endDate) => setEndDate(endDate)}
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
     
                <TouchableOpacity style={styles.signOutButton} onPress={() => {insertData();}}>
                    <Text style={styles.signOutText}>Start Event</Text>
                </TouchableOpacity>
            </View>
        </View>
    </ScrollView>
        
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
        width: "85%",
        height: 45,
        marginBottom: 0,
        marginTop: 15,
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    signOutButton: {
        width: "85%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        backgroundColor: "#FF1493",
        marginBottom: 50,
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
        top: 90,
        width: "90%",
        alignItems: 'center',
    },
    map: {
        height: 200,
        width: 350,
        marginBottom: 0,
        marginTop: -75,
    }
});

export default EventForm;