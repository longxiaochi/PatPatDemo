import React, { Component } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Text,
  ImageBackground,
} from "react-native";

const CheckInStyles = require("./PPCheckInStyles");

export default class PPCheckInProductItem extends Component {

   render() {
    const { id, imageUrl, name, price, onPressItem } = this.props;
    return (
      <TouchableWithoutFeedback
        style={CheckInStyle.productitem_styles.feedback}
        onPress={() => onPressItem(id)}
      >
        <View style={CheckInStyle.productitem_styles.view}>
          <ImageBackground
            style={CheckInStyle.productitem_styles.image}
            imageStyle={{
              borderRadius: 5,
            }}
            source={{
              uri: imageUrl,
            }}
          />
          <Text
            numberOfLines={1}
            style={CheckInStyle.productitem_styles.text}
          >
            {name}
          </Text>
          <View style={CheckInStyle.productitem_styles.bottomView}>
            <Text style={CheckInStyle.productitem_styles.price}>
              {price}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
