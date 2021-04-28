import React,{useState} from 'react'
import {StyleSheet, Text, View } from 'react-native'
import Numpad from '../Components/Numpad';

export default function Calculator() {
  return (
    <View styles={styles.container}>
    <Numpad></Numpad>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
