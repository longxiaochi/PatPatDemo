import React, { Component } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Text,
  ImageBackground,
} from "react-native";

const CategoryDetailStyle = require("./CategoryDetailStyles");

export default class CategoryDetailProductItem extends Component {

   render() {
    const { id, imageUrl, name, price, onPressItem } = this.props;
    return (
      <TouchableWithoutFeedback
        style={CategoryDetailStyle.productitem_styles.feedback}
        onPress={() => onPressItem(id)}
      >
        <View style={CategoryDetailStyle.productitem_styles.view}>
          <ImageBackground
            style={CategoryDetailStyle.productitem_styles.image}
            imageStyle={{
              borderRadius: 5,
            }}
            source={{
              uri: imageUrl,
            }}
          />
          <Text
            numberOfLines={1}
            style={CategoryDetailStyle.productitem_styles.text}
          >
            {name}
          </Text>
          <View style={CategoryDetailStyle.productitem_styles.bottomView}>
            <Text style={CategoryDetailStyle.productitem_styles.price}>
              {price}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
