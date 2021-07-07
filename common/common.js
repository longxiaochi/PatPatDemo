import {Dimensions,Platform} from 'react-native';

// iPhoneX/iPhoneXs/iPhone 11 Pro
const X_WIDTH = 375;
const X_HEIGHT = 812;

// iPhoneXr/iPhoneXs Max/iPhone 11/iPhone11 Pro Max
const XR_WIDTH = 414;
const XR_HEIGHT = 896;

// iPhone 12 mini
const iPhone12MINI_WIDTH = 360;
const iPhone12MINI_HEIGHT = 780;

// iPhone 12/iPhone 12 Pro
const iPhone12_WIDTH = 390;
const iPhone12_HEIGHT = 844;

// iPhone 12 Pro Max
const iPhone12PROMAX_WIDTH = 428;
const iPhone12PROMAX_HEIGHT = 926;

/**
 * 变量定义的顺序会影响访问的结果
 */
export const kScreenWidth = Dimensions.get('window').width;
export const kScreenHeight = Dimensions.get('window').height;

export const isIPhoneXABOVE =  (isIPhoneX() || isIPhoneXR() || isIPhone12mini() || isIPhone12() || isIPhone12ProMax());
export const kStatusBarHeight = (isIPhoneXABOVE ? 44 : 20);
export const kNavigationBarHeight = (isIPhoneXABOVE ? 88 : 64); // navigation + state
export const kBottomTabBarHeight = (isIPhoneXABOVE ? 83 : 49);
export const kBottomSafeAreaInset = (isIPhoneXABOVE ? 34 : 0);

// #define kStatusBarHeight               (20.f)
// #define kTopBarHeight                  (44.f)
// #define kBottomBarHeight               (49.f)
// #define kNavigationBarHeight           (isIPhoneXSeries()?88.f:64.f)
// #define kNavigationBarOriginY          (isIPhoneXSeries()?64.f:44.f)
// #define kIphoneXStatusBarHeight        (44.f)
// #define kIphoneXTopBarHeight           (44.f)
// #define kIphoneXBottomBarHeight        (83.f)
// #define kIphoneXBottomSafeAreaInset    (34.f)

//判断是否为iphoneX类型的机型
function isIPhoneX() {
  return (
    Platform.OS === 'ios' &&
    ((kScreenHeight === X_HEIGHT && kScreenWidth === X_WIDTH) ||
      (kScreenHeight === X_WIDTH && kScreenWidth === X_HEIGHT))
  )
}

//判断是否为iphoneXR类型的机型
function isIPhoneXR() {
  return (
    Platform.OS === 'ios' &&
    ((kScreenHeight === XR_HEIGHT && kScreenWidth === XR_WIDTH) ||
      (kScreenHeight === XR_WIDTH && kScreenWidth === XR_HEIGHT))
  )
}

//判断是否为iphone12mini类型的机型
function isIPhone12mini() {
  return (
    Platform.OS === 'ios' &&
    ((kScreenHeight === iPhone12MINI_HEIGHT && kScreenWidth === iPhone12MINI_WIDTH) ||
      (kScreenHeight === iPhone12MINI_WIDTH && kScreenWidth === iPhone12MINI_HEIGHT))
  )
}

//判断是否为iphone12类型的机型
function isIPhone12() {
  const a = Platform.OS === 'ios' && (kScreenHeight === iPhone12_HEIGHT && kScreenWidth === iPhone12_WIDTH);
  alert('iPhone12_HEIGHT: '+ iPhone12_HEIGHT + 'kScreenHeight :' + kScreenHeight);
  return a;
}

//判断是否为iphone12 Pro Max类型的机型
function isIPhone12ProMax() {
  return (
    Platform.OS === 'ios' &&
    ((kScreenHeight === iPhone12PROMAX_HEIGHT && kScreenWidth === iPhone12PROMAX_WIDTH) ||
      (kScreenHeight === iPhone12PROMAX_WIDTH && kScreenWidth === iPhone12PROMAX_HEIGHT))
  )
}
