/**
 * @format
 */

import {AppRegistry} from 'react-native';

// import  BoldAndBeautiful from './app/TextTest2'
// import ScrollViewTest from './app/ScrollViewTest'
// import PPProductDetail from './app/App_ProductDetail'
// import CheckInModule from './app/CheckInModule'

import PPCheckInModule from './app/CheckInModule/PPCheckInModule'
import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => PPCheckInModule);
