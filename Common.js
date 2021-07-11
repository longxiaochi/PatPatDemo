import {
    Dimensions,
    Animated,
    Easing
} from "react-native";

export const Screen_Width = Dimensions.get("window").width;
export const Screen_Height = Dimensions.get("window").height;
export const requestCheckInNavUrl = "http://h5_api.dev.patpat.vip/v1.4/account/checkin/nav";
export const requestCheckInUrl = "http://h5_api.dev.patpat.vip/v1.4/account/new_checkin";
export const requestUrl =
    "http://h5_api.dev.patpat.vip/v1.4/categories/products";
export const requestFilterUrl =
    "http://h5_api.dev.patpat.vip/v1.4/categories/filters";


//全局变量
spinValue = new Animated.Value(0);
Animated.timing(this.spinValue, {
    toValue: 1,
    duration: 1000,
    easing: Easing.linear,
}).start();

export const spin1 = this.spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0 deg", "180 deg"],
});
export const spin2 = this.spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["180 deg", "0 deg"],
});