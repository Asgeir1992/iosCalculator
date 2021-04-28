import React,{useState} from 'react'
import {StyleSheet, Text, View } from 'react-native'

import NumpadButton from '../Components/NumpadButton';
import CommaConvert from './Utilities/CommaCoverter';

// keycodes for Numpad buttons.
const numpadBtns = [
  [`c`, `±`, '%', '÷'],
  ['7', '8', '9', 'x'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', ',', '=']
]



export default function Calculator() {
  /*

  currentValue : is the display value on numpad screen.
  previous : value is memory of the calculator.
  operator : takes in the operators code to simplify calculations.
  isPressed : helper state to color change buttons.
  operatorId : operator code is helper state for changes in text   and color.
  buttonId : button code is helper state to keep track of keycode of buttons pressed.
  */
  const [currentValue,setCurrentValue] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [isOperatorOn, setIsOperatorOn] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [operatorId, setOperatorId] = useState(null);
  const [buttonId, setButtonId] = useState(null);

  /* 
  renderNumpadButtons: Function that displays the buttons with mapping, using two helper functions to style the buttons and text. 
  */
  const renderNumpadButtons = () => {

    // Styling text 
    const textColor = (i,btnIndex) => {
      let color;
      if (i == 0 && (btnIndex === 0 || btnIndex === 1 || btnIndex === 2)){
        color = 'black';
      }else if(i === 0 && btnIndex === 3){
        color = 'white';
      } else{
        color = 'white'
      }
      return color;
    }
    // styling backgroundColor
    const backgroundColor = (i,btnIndex) =>{
      let color;
      if(i == 0 && btnIndex != 3){
        color = 'gray'
      } else if( btnIndex == 3 || (i == 4 && btnIndex == 2)){
          color = 'orange'     
      } else{
        color = '#323232'
      }
      return color;
    }

    let numpadLayout = numpadBtns.map((NumpadRows,i)=>{
      let rowItem = NumpadRows.map((btns,btnIndex)=>{
        return <NumpadButton 
                key={'btn-' + btnIndex}
                bcolor={backgroundColor(i,btnIndex)}
                tcolor={textColor(i,btnIndex)}
                value={btns}
                operatorId={operatorId}
                buttonId={buttonId}
                width={btnIndex === 0 && i == 4 ? 160 : 80}
                onPress={(val)=>{
                  handleValue(val)
                }}
                isPressed={isPressed}></NumpadButton>

      });

        return <View 
                style={styles.numpadRow}
                key={'btn-' + i}>{rowItem}</View>

    });
    return numpadLayout;
  }
  /*
  handleValue: function that takes care of calculations, using switch to keep track of which buttons are pressed.

  clearValue: function that helps when switching text of the reset button from 'C' to 'AC'

  calculateInput: helper functions that takes in the operators input for all operators and performs calculations using previous and current state.
  
  
  */


  const handleValue = (input) =>{

    const ClearInput = (input) =>{
        setCurrentValue('0');
        setPreviousValue(null)
        setIsOperatorOn(false);
        setOperator(null);
        setIsPressed(false);
        setButtonId(null);
    }

    const calculateInput = (input) =>{
          setIsOperatorOn(!isOperatorOn);
          setOperator(input)
          setPreviousValue(currentValue);
          if(operator !== null){
            setPreviousValue(eval(previousValue + operator + currentValue))
            setCurrentValue(eval(previousValue + operator + currentValue))
          } else{
          }
    }

    switch(input){
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
            if(currentValue.length == 9 ){
              break;            
            }
            setButtonId(input)
            setCurrentValue(currentValue === '0' || isOperatorOn === true? input : currentValue + input)
            setIsOperatorOn(false);
            setIsPressed(false);
        break;
      case 'c':
      case 'AC':
        ClearInput()
        break;
      case '±':
        setCurrentValue(eval(currentValue)*-1)
        break;
      case '%':
        setCurrentValue(eval(currentValue)/100);
        break;
      case '÷':
      case 'x':
      case '-':
      case '+':
        let opr = input
        if(input === '÷'){
          input = '/'
          opr = '÷'
        }

        if(input === 'x'){
          input = '*'
          opr = 'x'
        }
        setIsPressed(true);
        setOperatorId(opr);
        calculateInput(input);
        break;
      case '=':
        setCurrentValue(eval(previousValue + operator + currentValue));
        setPreviousValue(null);
        setOperator(null);
        break;
      case ',':
        setCurrentValue(currentValue + '.');
        break;
    }
    
  }
  /*
  shrinkText :  is an attempt to shrink text when currentValue length of string is larger than x digits. I tried using experimenting with checking the value of the number as indicator but failed to do so.
  this function might behave little bit strange.
  */
  const shrinkText = () =>{
    if(currentValue.length <= 7){
      return 68
    } else if (currentValue.length == 8){
      return 64
    } else { 
      return 58
    }
      
  }


  return (
    <View styles={styles.container}>
        <View style={{
      marginRight: 20,
      marginTop: 70,
    }}><Text numberOfLines={1} style={{color:'white',fontSize:shrinkText(),textAlign: 'right' }}>{CommaConvert(currentValue)}</Text></View>
    <View>
     {renderNumpadButtons()}
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 50,
  },
  screenContainer:{
    flex:1,
  },
  numpadContainer:{
    flex:3,
    justifyContent:'flex-end',
  },
  numpadRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  }
});
