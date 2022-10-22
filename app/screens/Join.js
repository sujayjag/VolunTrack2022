import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, addDoc, collection, getFirestore } from "firebase/firestore";
import { initializeApp, firebase } from 'firebase/app';
import { getDatabase, ref, set, child, update, remove, get } from "firebase/database";
//import { createStackNavigator, createAppContainer } from 'react-navigation';  

export default function Join() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned')
  const [x, setX] = useState(false)
  const [buttonText, setButtonText] = useState("Successfully Signed In!\nTap to Scan Out.")
  const [buttonColor, setButtonColor] = useState("green")

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    //if the code is a valid created event, add it to attended events
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
    const uid = getAuth().currentUser.uid
    const path = `Events/${data}`
    get(child(ref(db), path))
      .then((snapshot) => {
        if(snapshot.exists()) {
          // alert('yay')
          // alert(typeof(data))
          newPath = `Users/${uid}/attendedEvents/${data}`
          set(ref(db, newPath), snapshot.val())
            .then(() => {alert("Lit")})
            .catch((error) => {alert(error.message)})
        } else {
          alert("hello")
        }
      })
      .catch((error) => {alert(error.message)})
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>)
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>)
  }

  function doChanges() {
    setButtonColor("red")
    setButtonText("Successfully Signed Out!\nTap to Scan In to Another Event.");
  }
  function reverseChanges() {
    setButtonColor("green")
    setButtonText("Successfully Signed In!\nTap to Scan Out of This Event.");
  }

  function setValues(val) {
    setScanned(val);
    if (x === true) {
      reverseChanges();
      setX(false);
    } else if (x === false) {
      doChanges();
      setX(true);
    }
  }

  // Return the View
  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }} />
      </View>
      <Text style={styles.maintext}>{text}</Text>
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato'
  }
});