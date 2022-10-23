import React, { useState, Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { getAuth, signOut } from "firebase/auth";
import { initializeApp, firebase } from 'firebase/app';
import { getDatabase, ref, set, get, push, child, update, remove } from "firebase/database";

import MapView from "react-native-maps";
import Pic from "../assets/logo.png";

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

const dbref = ref(db);

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;



export default class screens extends Component {
  state = {
    events: {},
    eventKeys: [],
    markers: [],
    region: {
      latitude: 33.7490,
      longitude: -84.3880,
      latitudeDelta: 0.0922*2,
      longitudeDelta: 0.0421*2,
    },
  };
  
  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }
  componentDidMount() {
    get(child(dbref, 'Events/'))
      .then((snapshot) => {
        if(snapshot.exists) {
          this.setState({
            events: snapshot.val()
          })
          
          this.setState({
            eventKeys: Object.keys(this.state.events)
          })
          let locArr = []

          for(let i = 0; i < Object.keys(this.state.events).length; i++) {
            if (snapshot.val()[Object.keys(this.state.events)[i]]['eventEnded'] == 0) {
              let element = {
                eventId: Object.keys(this.state.events)[i],
                coordinate: {                
                  latitude: snapshot.val()[Object.keys(this.state.events)[i]]['latitude'],
                  longitude: snapshot.val()[Object.keys(this.state.events)[i]]['longitude']
                },
                title: snapshot.val()[Object.keys(this.state.events)[i]]['name'],
                description: snapshot.val()[Object.keys(this.state.events)[i]]['description'],
                start: snapshot.val()[Object.keys(this.state.events)[i]]['startDate'],
                end: snapshot.val()[Object.keys(this.state.events)[i]]['endDate'],
                email: snapshot.val()[Object.keys(this.state.events)[i]]['contactEmail'],
                number: snapshot.val()[Object.keys(this.state.events)[i]]['contactNumber'],
                //image: Pic
              }

              locArr.push(element)
            }
            
            
            
          }
          this.setState({
            markers: locArr
          })
        }
      })
      .catch((error) => alert(error.message))
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let len = this.state.markers.length
      
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= len) {
        index = len - 1;
      }
      if (index <= 0) {
        index = 0;
      }
      
      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {

        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  }

  render() {
    this.getData
    const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });

      

      return { scale, opacity };

   
    });

    

    return (
      <View style={styles.container}>
        <MapView
          ref={map => this.map = map}
          initialRegion={{
            latitude: 33.7490,
            longitude: -84.3880,
            latitudeDelta: 0.0922*2,
            longitudeDelta: 0.0421*2}}
          style={styles.container}
        >
          {this.state.markers.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity,
            };
            return (
              <MapView.Marker key={index} coordinate={marker.coordinate}>
                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <Animated.View style={[styles.ring, scaleStyle]} />
                  <View style={styles.marker} />
                </Animated.View>
              </MapView.Marker>
            );
          })}
        </MapView>
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {this.state.markers.map((marker, index) => (
            <View style={styles.card} key={index}>
              <View style={styles.textContent}>
                <Text numberOfLines={2} style={styles.cardtitle}>{marker.title}</Text>
                <Text numberOfLines={5} style={styles.cardDescription}>{marker.description}</Text>
                <Text></Text>
                <Text numberOfLines={1} style={styles.cardDescription}>{marker.email}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>{marker.number}</Text>
                <Text numberOfLines={2} style={styles.cardDescription}>{marker.start} - {marker.end}</Text>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    marginTop: 5,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
});

AppRegistry.registerComponent("mapfocus", () => screens);