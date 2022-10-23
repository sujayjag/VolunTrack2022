import { StatusBar } from 'expo-status-bar';
import React, { useState, useRe, useEffect } from "react";
import { ScrollView, StyleSheet, View, SafeAreaView, Platform, ImageBackground, Image, Pressable, TextInput, TouchableOpacity} from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import { initializeApp, firebase } from 'firebase/app';
import { getDatabase, ref, set, get, push, child, update, remove } from "firebase/database";
import { delay } from 'q';
import { Text, Card, Button, Icon } from '@rneui/themed';
import QRCode from 'react-native-qrcode-svg';
import moment from 'moment';

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
    let [flag, setFlag] = useState("");
    let [events, setEvents] = useState("None")
    let [eventsArr, setEventsArr] = useState([])
    let [eventStr, setEventStr] = useState(JSON.stringify(events))
    let [created, setCreated] = useState([])
    let [attendees, setAttendees] = useState({})
    let [attendeesStr, setAttendeesStr] = useState(JSON.stringify(attendees))
    let [eidArr, setEidArr] = useState([])

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
            else {
                setCreated(Object.values(snapshot.val().createdEvents))
                if (created.length >= 2) {
                    setFlag("You have created one or more events");
                }

                let createdArr = []
                let tempEids = []
                console.log(Object.values(snapshot.val().createdEvents))
                console.log("CURREENT SNAP SHOT:" + JSON.stringify(snapshot.val()))
                for(let i = 1; i < Object.values(snapshot.val().createdEvents).length; i++) {
                    var date = moment().utcOffset('-5:00').format('MM/DD/YYYY HH:mm');

                    let eid = Object.values(snapshot.val().createdEvents)[i]
                    console.log("EIDDDDD:" + eid)
                    get(child(dbref, `Events/${eid}`))
                    .then((snapshot) => {
                        if(snapshot.exists()) {
                          if (snapshot.val().endDate < date) {
                            update(ref(db, "Events/" + eid), {
                                eventEnded: 1,
                              })
                              .then(() => {
                              })
                              .catch((error) => {
                                const errorMessage = error.message;
                                alert(errorMessage);
                              });          
                          }
                          if (snapshot.val().eventEnded == 0) {
                            let info = snapshot.val()
                            createdArr.push(info)
                            tempEids.push(eid)
                            setEidArr(tempEids)
                            
                            setEventsArr(createdArr)
                            setEventStr(JSON.stringify(createdArr))
                          }
                        }
                    })
                    .catch((error) => console.log(error.message))
                }
            }
              let createdArr = []
              let attendeesDict = {}
              for(let i = 1; i < Object.values(snapshot.val().createdEvents).length; i++) {
                  let eid = Object.values(snapshot.val().createdEvents)[i]
                  
                  get(child(dbref, `Events/${eid}`))
                  .then((snapshot) => {
                      if(snapshot.exists()) {
                        if (snapshot.val().eventEnded == 0) {
                          let info = snapshot.val()
                          createdArr.push(info)
                          setEventsArr(createdArr)
                          setEventStr(JSON.stringify(createdArr))
                        
                          let attendeesArr = Object.values(snapshot.val().attendedUsers)
                          let attendeesData = []
                          for(let i = 1; i < attendeesArr.length; i++) {
                            let cur = attendeesArr[i]
                          
                            get(child(dbref, `Users/${cur}`))
                              .then((snapshot) => {
                                if(snapshot.exists()) {
                                  let curData = {
                                    uid: cur,
                                    firstName: snapshot.val().firstName,
                                    lastName: snapshot.val().lastName,
                                    email: snapshot.val().emailAddress,
                                    phone: snapshot.val().phoneNumber
                                  }
                                  attendeesData.push(curData)

                                  attendeesDict[eid] = attendeesData
                                  setAttendees(attendeesDict)
                                  setAttendeesStr(JSON.stringify(attendeesDict))
                                }
                              })
                              .catch((error) => alert(error.message))
                          }
                        }
                      } 
                  })
                  .catch((error) => console.log(error.message))
              }
          }
        })
    .catch((error)=> {
     });
    }, [])

    const handleClick = (eventObj) => {
      console.log("clicked!")
      navigation.navigate('viewCurrentCreated', {eids: eventObj})
    }
    console.log("EID ARR: " + eidArr.join())
    console.log("EVENTS ARR: " + JSON.stringify(eventsArr))
    return (       
        <ScrollView keyboardShouldPersistTaps={true} style={{ marginBottom: 10 }}>
          {
          eventsArr.map((element, index) => { return (
            
             
                <View>
                <Card containerStyle={{ marginTop: 15 }} >
                  <Card.Title style={{ fontSize: 20, textAlign: 'center'}}>{eventsArr[index]?.name}</Card.Title>            
                  <Card.Divider />                              

                  <Text style={styles.fonts}>
                      Description: {eventsArr[index]?.description}
                  </Text>
                  <Text style={styles.fonts}>
                      Start Date & Time: {eventsArr[index]?.startDate.split(' ')[0]} at {eventsArr[index]?.startDate.split(' ')[1]}
                  </Text>
                  <Text style={styles.fonts}>
                      End Date & Time: {eventsArr[index]?.endDate.split(' ')[0]} at {eventsArr[index]?.endDate.split(' ')[1]}
                  </Text>
                  <Text style={styles.fonts}>
                      Location: ({eventsArr[index]?.latitude}, {eventsArr[index]?.longitude})
                  </Text>
                  <Text style={styles.fonts}>
                      Number of Attendees: {Object.keys(eventsArr[index]?.attendedUsers).length - 1}
                  </Text>
                  <Text style={styles.fonts}>
                      Contact Email: {eventsArr[index]?.contactEmail}
                  </Text>
                  <Text style={styles.fonts}>
                      Contact Number: {eventsArr[index]?.contactNumber.substring(0, 3)}-{eventsArr[index]?.contactNumber.substring(3, 6)}-{eventsArr[index]?.contactNumber.substring(6, 10)}
                  </Text>

                  <QRCode
                    value={eidArr[index]}
                    logo={require("../assets/logo.png")}
                    logoBackgroundColor='white'
                    logoSize={60}
                    size={300}
                    color={'#32174d'}

                  />
                  
              </Card>
              </View>            
            
            )})
          }                                            
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    fonts: {
      marginBottom: 8,
      fontSize: 12
    },
    user: {
      flexDirection: 'row',
      marginBottom: 6,
    },
    image: {
      width: 30,
      height: 30,
      marginRight: 10,
    },
    name: {
      fontSize: 16,
      marginTop: 5,
    },
});

export default createdEvents; 