import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, ImageBackground, Image} from 'react-native';
import Home from './app/screens/Home';
import Login from './app/screens/Login';
import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigator } from "./navigation/StackNavigator.js";

const App = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator/>
    </NavigationContainer>
    //test
  );
}

export default App;