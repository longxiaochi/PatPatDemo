import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";

const BoldAndBeautiful = () =>  {
  return (
    <Text style={stlyes.baseText}>
      I am bold
      <Text style={stlyes.innerText}> and red </Text>
    </Text>
  );
}

const stlyes = StyleSheet.create({
  baseText: {
    marginTop: 100,
    fontWeight: 'bold'
  },
  innerText: {
    color: 'red'
  }
});

export default BoldAndBeautiful;


// export default class BlueCool extends Component {
//   render() {
//     return (
//       <Text>
//         There is a blue square
//         <View stlye={{width: 50, height: 50, backgroundColor: 'steeblue'}} />
//         in between my text
//       </Text>
//     );
//   }
// }
