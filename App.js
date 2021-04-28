import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Calculator from './screen/Calculator';
export default function App() {
  return (
    <View style={styles.container}>
    <Calculator></Calculator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 10,
  }
});
