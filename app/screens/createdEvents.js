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
    let [dict, setDict] = useState()

    // let [fName, setFName] = useState("first name")
    // let [lName, setLName] = useState("last name")
    // let [email, setEmail] = useState("email")
    // let [phoneNum, setPhoneNum] = useState("phone")



    const dbref = ref(db);

    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;
    

    // console.log("init flag = " + flag)

    SelectData(uid);

    

    // if  (flag == 0) {
    //     // console.log("if flag = 0");
    //     content = <Text style={{ fontSize: 24, color: 'red' }}>{flag}</Text>
    // }
    // else if (flag === "You have create no events") {
    //     // console.log("if flag = 1");
    //     content =  <Text style={{ fontSize: 24, color: 'gray' }}>{flag}</Text>
    // }
    // else {
    //     content = <Text></Text>
    // }

    function SelectData(uid) {
        get(child(dbref, "Users/" + uid)).then((snapshot)=> {

            if (snapshot.exists()) {
                //Array.isArray(dict)
                // let num = (Object.keys(dict).length)
                if (Array.isArray(snapshot.val().createdEvents)) {
                    setFlag("You have created no events");
                    
                }
                else {

                    setFlag("You have created events");
                    
                }
    
                // setFName(snapshot.val().firstName)
                // setLName(snapshot.val().lastName)
                // setEmail(snapshot.val().emailAddress)
                // setPhoneNum(snapshot.val().phoneNumber)
            }
            else {
                alert("No data found");
                
            }
         })
        .catch((error)=> {
            alert("unsuccessful, error"+error);
         });
    }
    
    return (
        <View>
            <Text style={{ fontSize: 24, color: 'red' }}>{flag}</Text>
        </View>
    );
};


export default createdEvents; 