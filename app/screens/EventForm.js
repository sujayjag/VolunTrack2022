import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform, ImageBackground, Image, Button, Pressable, TextInput, TouchableOpacity, Dropdown, ScrollView} from 'react-native';
import { initializeApp, firebase } from 'firebase/app';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { getDatabase, ref, set, push, child, update, remove } from "firebase/database";
import { getAuth } from "firebase/auth";

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

  const validateNumber = num => {
    num = num.replace(/\D/g,'');
    if (num.length === 10) {
      return true;
    }
    return false;
  }

const EventForm = ({ navigation }) => {    
    const [name, setName] = useState("");
    const [descr, setDesc] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState(""); 
    const [cEmail, setCEmail] = useState("");
    const [cNumber, setCNumber] = useState("");
    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    })

    function insertData() {

        const auth = getAuth()
        
        const organizer = auth.currentUser
        const payload = {
          name: name,
          description: descr,
          startDate: startDate,
          endDate: endDate,
          latitude: region["latitude"],
          longitude: region["longitude"],
          organizerId: organizer.uid,
          contactEmail: cEmail,
          contactNumber: cNumber,
          eventEnded: 0,
          attendedUsers: [0],
        }
        const eventId = push(ref(db, "Events/"), payload)
        .then((event) => {
          push(ref(db, "Users/" + organizer.uid + "/createdEvents"), event.key)
            .then(() => {
              navigation.navigate("GenerateCode", 
                  {eId: event.key}) 
            })
            .catch((error) => {
            })

           
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
        });
      }

    const validateEvent = (n, d, sd, ed, ce, cn, r) => {
      let phoneRe = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/
      let emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      let dateRe =  /^[0-1][0-9]\/[0-3][0-9]\/[0-2][0-9][0-9][0-9]\ [0-2][0-9]\:[0-6][0-9]$/
      //fname, lname, phone, email, password, confirm password, in order.
      if(!(n && d && sd && ed && ce && cn && r)) {
        alert(`Please fill out all fields`);
        return;
      }
      else if(!validateNumber(cn)){
        alert('Please enter a valid contact number')
      }
      else if(!emailRe.test(String(ce).toLowerCase())){
        alert('Please enter a valid contact email')
      }
      else if(!dateRe.test(String(sd).toLowerCase())) {
        alert("Please enter a valid start date and time")
      }
      else if(!dateRe.test(String(ed).toLowerCase())) {
        alert("Please enter a valid end date and time")
      } else {
        insertData();
      }  
    
    }
    return (
        <ScrollView>
            <View style={styles.container}>
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
                    
                    <TouchableOpacity style={styles.signOutButton} onPress={() => {validateEvent(name, descr, startDate, endDate, cEmail, cNumber, region)} }>
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