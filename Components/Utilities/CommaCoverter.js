
/* 
CommaConvert :  function that converts string to having dots as separations taking in considering negative numbers. I attempted to handle large numbers with expotential values to fit the screen.
*/
const CommaConvert = str => {
  let output = '';
  let decimal = '';
  let isNegative = false;

  output = str;


  if(parseFloat(str) < 0){
    isNegative = true;
    output = output.toString().substring(1);
  }


  if(isNegative){
    output = "-" + parseFloat(output).toLocaleString() + decimal
  } else{
    output = parseFloat(output).toLocaleString() + decimal
  }

  return parseFloat(output) < 999999999 ? output : parseFloat(output).toExponential(4); 

}

export default CommaConvert;
