import { StatusBar } from 'expo-status-bar';
import React, { useState, useRe, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform, ImageBackground, Image, Button, Pressable, TextInput, TouchableOpacity} from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import { initializeApp, firebase } from 'firebase/app';
import { getDatabase, ref, set, get, push, child, update, remove } from "firebase/database";
import { delay } from 'q';

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

const createdEvents = ({ navigation }) => {
    // let content;
    let [flag, setFlag] = useState("");
    let [events, setEvents] = useState("None")
    let [eventsArr, setEventsArr] = useState([])
    let [eventStr, setEventStr] = useState(JSON.stringify(events))
    let [created, setCreated] = useState([])
    let [attendees, setAttendees] = useState({})
    let [attendeesStr, setAttendeesStr] = useState(JSON.stringify(attendees))

    const dbref = ref(db);

    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;
    
    useEffect(() => {
      get(child(dbref, "Users/" + uid))
        .then((snapshot)=> {
          if (snapshot.exists()) {
            if (Array.isArray(snapshot.val().createdEvents)) {
                    setFlag("You have created no events");
            }
            // values of created event keys stored in state variable
            else {
                setCreated(Object.values(snapshot.val().createdEvents))
                if (created.length == 2) {
                    setFlag("You have created an event");
                }
                else if (created.length == 3) {
                    setFlag("You have created an event and one is ongoing/upcoming");
                } 
                else {
                    setFlag("You have created some events and some are ongoing/upcoming");
                }

                let createdArr = []
                // console log for created event keys
                console.log(Object.values(snapshot.val().createdEvents))
                // loop traversing through all created event keys
                for(let i = 1; i < Object.values(snapshot.val().createdEvents).length; i++) {
                    //const dbref = ref(db);
                    let eid = Object.values(snapshot.val().createdEvents)[i]
                    
                    get(child(dbref, `Events/${eid}`))
                    .then((snapshot) => {
                        if(snapshot.exists) {
                            if (snapshot.val().eventEnded == 1) {
                                let info = snapshot.val()
                                createdArr.push(info)
                                setEventsArr(createdArr)
                                setEventStr(JSON.stringify(createdArr))
                                console.log(createdArr)
                                let toggle = true;
                                console.log(Object.keys(createdArr).length);
                                if ((Object.keys(createdArr).length) == 1 && toggle) {
                                  setFlag("You have created an event");
                                }
                                if ((Object.keys(createdArr).length) > 1 && toggle) {
                                  setFlag("You have created some events");
                                }
                            }
                        } else {
                            console.log("snapshot doesnt exist")
                        }
                    })
                    .catch((error) => console.log(error.message))
                }
            }
              let createdArr = []
              let attendeesDict = {}
              // console log for created event keys
              console.log(Object.values(snapshot.val().createdEvents))
              // loop traversing through all created event keys
              for(let i = 1; i < Object.values(snapshot.val().createdEvents).length; i++) {
                  //const dbref = ref(db);
                  let eid = Object.values(snapshot.val().createdEvents)[i]
                  
                  get(child(dbref, `Events/${eid}`))
                  .then((snapshot) => {
                      if(snapshot.exists) {

                          let info = snapshot.val()
                          createdArr.push(info)
                          setEventsArr(createdArr)
                          setEventStr(JSON.stringify(createdArr))
                          console.log(createdArr)

                          let attendeesArr = Object.values(snapshot.val().attendedUsers)
                          let attendeesData = []
                          for(let i = 1; i < attendeesArr.length; i++) {
                            let cur = attendeesArr[i]
                          
                            get(child(dbref, `Users/${cur}`))
                              .then((snapshot) => {
                                if(snapshot.exists) {
                                  let curData = {
                                    uid: cur,
                                    firstName: snapshot.val().firstName,
                                    lastName: snapshot.val().lastName,
                                    email: snapshot.val().emailAddress,
                                    phone: snapshot.val().phoneNumber
                                  }
                                  attendeesData.push(curData)
                                  console.log(`attendee data obj list ${attendeesData}`)

                                  attendeesDict[eid] = attendeesData
                                  setAttendees(attendeesDict)
                                  setAttendeesStr(JSON.stringify(attendeesDict))
                                  //setAttendees(attendeesDict)
                                  //setAttendeesStr(JSON.stringify(attendeesDict))
                                  //console.log(attendeesDict)
                                } else {
                                  alert(`attendee id ${cur} does not exist`)
                                }
                              })
                              .catch((error) => alert(error.message))
                          }
                        
                          //console.log(attendeesArr)
                          // attendeesDict[eid] = attendeesData
                          // console.log(attendeesDict)
                          // setAttendees(attendeesDict)
                          // setAttendeesStr(JSON.stringify(attendeesDict))
                          console.log(attendeesDict)
                          console.log(attendeesStr)
                      } else {
                          console.log("snapshot doesnt exist")
                      }
                  })
                  .catch((error) => console.log(error.message))
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

            <Text style={{ fontSize: 24, color: 'orange' }}>Event info: {attendeesStr}</Text>
            
        </View>
    );
};


export default createdEvents; 