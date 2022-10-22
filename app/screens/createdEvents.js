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
    let [valArray, setValArray] = useState([])
    let [events, setEvents] = useState({'test':0})
    let [eventsArr, setEventsArr] = useState([])
    let [eventStr, setEventStr] = useState(JSON.stringify(events))
    let [created, setCreated] = useState([])
    let [createdStr, setCreatedStr] = useState('')

    //let [eventName, setName] = useState("");
    //let [descr, setDesc] = useState("");
    //let [sd, setStartDate] = useState("");
    //let [ed, setEndDate] = useState(""); 
    //const [loc, setLoc] = useState(""); 
    //let [max, setMax] = useState("");
    //let [cEmail, setCEmail] = useState("");
    //let [cNumber, setCNumber] = useState("");

    let [eventName, setEventName] = useState('')
    let [desc, setDesc] = useState('')
    //let [region, setRegion] = React.useState({
        //latitude: 0,
        //longitude: 0,
        //latitudeDelta: 0.01,
        //longitudeDelta: 0.01
    //})

    const dbref = ref(db);

    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;



    // function SelectData(uid) {
    //     get(child(dbref, "Users/" + uid)).then((snapshot)=> {

    //         if (snapshot.exists()) {
    //             //console.log(snapshot.val())
    //             //setEvents(snapshot.val())
    //             //console.log(snapshot.val())
                
    //             //setEventStr(JSON.stringify(snapshot.val()))
    //             setCreated(Object.values(snapshot.val().createdEvents))
    //             //console.log(events)
    //             //Array.isArray(dict)
    //             // let num = (Object.keys(dict).length)


    //             //uncomment later!!!!!
    //             // if (Array.isArray(snapshot.val().createdEvents)) {
    //             //     setFlag("You have created no events");
                    
    //             // }
    //             // else {
    //             //     let data = snapshot.val().createdEvents;
    //             //     var objectData = Object.values(data);
    //             //     objectData.shift();
    //             //     setValArray(objectData);
    //             //     let s = "";
    //             //     for (var i = 0; i < valArray.length; i++) {
    //             //         const result = await SelectEventData(objectData[i]);
    //             //         s += result + "\n" + "\n";
    //             //     }
    //             //     setFlag(s);
    //             // }
    
    //             // setFName(snapshot.val().firstName)
    //             // setLName(snapshot.val().lastName)
    //             // setEmail(snapshot.val().emailAddress)r
    //             // setPhoneNum(snapshot.val().phoneNumber)
    //         }
    //         else {
    //             console.log("no data!!")
    //             alert("No data found");
                
    //         }
    //      })
    //     .catch((error)=> {
    //         console.log('weird')
    //         alert("unsuccessful, error"+error);
    //      });
    // }

    // function getEventInfo(eid) {
    //     const dbref  = ref(db)
        

    //     get(child(dbref, `Events/${eid}`))
    //         .then((snapshot) => {
    //             if(snapshot.exists) {
    //                 let info = snapshot.val()
    //                 setEvents({
    //                     ...events,
    //                     eid: info
    //                 })
    //                 //events.eventId = info
    //                 setEventStr(JSON.stringify(events))
    //                 console.log(events)
    //             } else {
    //                 console.log("snapshot doesnt exist")
    //             }
    //         })
    //         .catch((error) => console.log(error.message))

    // }
    
    // function selectEventData(eventId) {
    //     const dbref = ref(db);
    //     get(child(dbref, "Events/" + eventId)).then((snapshot)=> {
    //         if (snapshot.exists()) {
    //             setName(snapshot.val().name)
    //             setDesc(snapshot.val().description)
    //             setStartDate(snapshot.val().startDate)
    //             setEndDate(snapshot.val().endDate)
    //             setMax(snapshot.val().maxHours)
    //             setCEmail(snapshot.val().contactEmail)
    //             setCNumber(snapshot.val().contactNumber)
    //             return new Promise((resolve) => {
    //                 resolve(eventName + " " + descr + " " + sd + " " + ed + " " + max + " " + cEmail + " " + cNumber);
    //             })
    //         }
    //         else {
    //             alert("No data found")
                
    //         }
    //      })
    //      .catch((error)=> {
    //         alert("unsuccessful, error"+error);
    //      });
        
    // }

    //const selectedData = SelectData(uid);


    
    // let createdArr = []
    
    // for(let i = 1; i < created.length; i++) {
    //     const dbref = ref(db);
    //     let eid = created[i]
        
    //     get(child(dbref, `Events/${eid}`))
    //     .then((snapshot) => {
    //         if(snapshot.exists) {

    //             let info = snapshot.val()
    //             createdArr.push(info)
    //             setEventsArr(createdArr)
    //             setEventStr(JSON.stringify(createdArr))
    //             console.log(createdArr)
    //         } else {
    //             console.log("snapshot doesnt exist")
    //         }
    //     })
    //     .catch((error) => console.log(error.message))
    // }
    //console.log(events)
    
    useEffect(() => {
      get(child(dbref, "Users/" + uid))
        .then((snapshot)=> {
          if (snapshot.exists()) {
              setCreated(Object.values(snapshot.val().createdEvents))

              let createdArr = []
              console.log(Object.values(snapshot.val().createdEvents))
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
                      } else {
                          console.log("snapshot doesnt exist")
                      }
                  })
                  .catch((error) => console.log(error.message))
              }
          }
          else {
              console.log("no data!!")
              alert("No data found");            
          }
        })
    .catch((error)=> {
        console.log('weird')
        alert("unsuccessful, error"+error);
     });
    }, [])

    return (  
        <View>
            <Text style={{ fontSize: 24, color: 'red' }}>Created: {created.join()}</Text>

            <Text style={{ fontSize: 24, color: 'red' }}>Event info??: {eventStr}</Text>

            <Button onPress={() => console.log(eventsArr)}>Click me</Button>
            
        </View>
    );
};


export default createdEvents; 