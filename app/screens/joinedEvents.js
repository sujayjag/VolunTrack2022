import { StatusBar } from 'expo-status-bar';
import React, { useState, useRe, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform, ImageBackground, Image, Button, Pressable, TextInput, TouchableOpacity} from 'react-native';
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

const joinedEvents = ({ navigation }) => {
    // let content;
    let [flag, setFlag] = useState("");
    let [events, setEvents] = useState("None")
    let [eventsArr, setEventsArr] = useState([])
    let [eventStr, setEventStr] = useState(JSON.stringify(events))
    let [joined, setJoined] = useState([])

    const dbref = ref(db);

    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;
    
    useEffect(() => {
      get(child(dbref, "Users/" + uid))
        .then((snapshot)=> {
          if (snapshot.exists()) {
            if (Array.isArray(snapshot.val().attendedEvents)) {
                    setFlag("You have attended no events");
            }
            // values of attended event keys stored in state variable
            else {
                setJoined(Object.values(snapshot.val().attendedEvents))
                if (joined.length == 2) {
                    setFlag("You have attended an event");
                }
                else if (joined.length == 3) {
                    setFlag("You have attended an event and one is ongoing");
                } 
                else {
                    setFlag("You have attended some events and one is ongoing");
                }

                let joinedArr = []
                // console log for attended event keys
                console.log(Object.values(snapshot.val().attendedEvents))
                // loop traversing through all attended event keys
                for(let i = 1; i < Object.values(snapshot.val().attendedEvents).length; i++) {
                    //const dbref = ref(db);
                    let eid = Object.values(snapshot.val().attendedEvents)[i]

                    
                    get(child(dbref, `Events/${eid}`))
                    .then((snapshot) => {
                        if(snapshot.exists) {
                          if (snapshot.val().eventEnded == 1) {
                              console.log(JSON.stringify(snapshot.val()))
                              let info = snapshot.val()
                              joinedArr.push(info)
                              setEventsArr(joinedArr)
                              setEventStr(JSON.stringify(joinedArr))
                              //console.log(joinedArr)
                          }
                        } else {
                            console.log("snapshot doesnt exist")
                        }
                    })
                    .catch((error) => console.log(error.message))
                }

            }

          }
          else {
              alert("No data found");            
          }
        })
    .catch((error)=> {
        alert("unsuccessful, error"+error);
     });
    }, [])

    return (  
        <View>
            <Text style={{ fontSize: 24, color: 'red' }}>{flag}</Text>

            <Text style={{ fontSize: 24, color: 'red' }}>Event info: {eventStr}</Text>
            
        </View>
    );
};

export default joinedEvents; 