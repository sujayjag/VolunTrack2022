import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {LogBox, StyleSheet, Text, View, SafeAreaView, Platform, ImageBackground, Image} from 'react-native';
import Home from './app/screens/Home';
import Login from './app/screens/Login';
import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigator } from "./navigation/StackNavigator.js";

const App = () => {
 
// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);
 
//Ignore all log notifications
LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <MainStackNavigator/>
    </NavigationContainer>
    //test
  );
}

export default App;