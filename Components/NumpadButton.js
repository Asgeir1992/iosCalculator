import React,{useState} from 'react'
import {StyleSheet,Text, TouchableOpacity} from 'react-native';

/*
NumpadButton: is reusable button component that takes in handfull of props to help style the backgroundColor and color of text.

*/

export default function NumpadButton({
  bcolor,
  operatorId,
  buttonId,
  tcolor,
  style,
  value,
  onPress,
  isPressed,
  width
}) {
  
  const TextChange = () =>{
    if(value == 'c' && buttonId!= null){
    value = 'AC'
    
    } else if (value == 'AC'){
      value = 'c'
    }
    return value
  }
  
return (
    <TouchableOpacity activeOpacity={.8} style={[styles.container,{backgroundColor: isPressed === true && value === operatorId ? 'white' : bcolor},{...style},{width:width}]} onPress={()=>{
      onPress(value)
    }}>
      <Text style={[styles.text,{color:tcolor}]}>{TextChange()}</Text>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  text:{
    fontSize: 30,
    textTransform: 'uppercase',
  }
})
