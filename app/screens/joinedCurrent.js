import { StatusBar } from 'expo-status-bar';
import React, { useState, useRe, useEffect } from "react";
import { ScrollView, StyleSheet, View, SafeAreaView, Platform, ImageBackground, Image, Pressable, TextInput, TouchableOpacity} from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import { initializeApp, firebase } from 'firebase/app';
import { getDatabase, ref, set, get, push, child, update, remove } from "firebase/database";
import { delay } from 'q';
import { Text, Card, Button, Icon } from '@rneui/themed';

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
    let [flag, setFlag] = useState("");
    let [event, setEvent] = useState({})
    let [eventsArr, setEventsArr] = useState([])
    let [joined, setJoined] = useState([])
    let [attendees, setAttendees] = useState({})
    let [attendeesStr, setAttendeesStr] = useState(JSON.stringify(attendees))

    const dbref = ref(db);

    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;
    
    useEffect(() => {
      get(child(ref(db), 'Users/'+uid))
        .then((snapshot) => {
          const userInfo = snapshot.val()
          if(userInfo.currentEventId.length > 0) {
            setFlag("You are currently attending an event.")
            //populate event with event info.
            get(child(ref(db), 'Events/'+userInfo.currentEventId))
              .then((snapshot) => {
                if(snapshot.exists()) {
                  setEvent(snapshot.val())
                } else {
                  setFlag("You are not currently attending an event.")
                }
              })
              .catch((error) => alert(error.message))
          } else {
            setFlag("You are not currently attending an event.")
          }
        })
        .catch((error) => alert(error.message))
    }, [])

  if(Object.keys(event).length !== 0) {
    return (               
        <View>
          <Text style={{ fontSize: 15, color: 'black', textAlign: 'center', fontWeight: 'bold' }}>{flag}</Text>
           
            <Card containerStyle={{ marginTop: 15 }}>
              <Card.Title style={{ fontSize: 20, textAlign: 'center'}}>{event.name}</Card.Title>            
              <Card.Divider />                              

              <Text style={styles.fonts}>
                  Description: {event.description}
              </Text>
              <Text style={styles.fonts}>
                  Start Date & Time: {event.startDate?.split(' ')[0]} at {event.startDate?.split(' ')[1]}
              </Text>
              <Text style={styles.fonts}>
                  End Date & Time: {event.endDate?.split(' ')[0]} at {event.endDate?.split(' ')[1]}
              </Text>
              <Text style={styles.fonts}>
                  Location: ({event.latitude}, {event.longitude})
              </Text>
              <Text style={styles.fonts}>
                  Contact Email: {event.contactEmail}
              </Text>
              <Text style={styles.fonts}>
                  Contact Number: {event.contactNumber?.substring(0, 3)}-{event.contactNumber?.substring(3, 6)}-{event.contactNumber?.substring(6, 10)}
              </Text>
          </Card>
          
           
        </View>
                                                        
   );
  } else {
    return (                  
        <View>
          <Text style={{ fontSize: 15, color: 'black', textAlign: 'center', fontWeight: 'bold' }}>{flag}</Text>
        </View>
    )
  }
  
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

export default joinedEvents; 