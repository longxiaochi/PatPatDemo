import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  ScrollView
} from "react-native";

import {
  kScreenWidth,
  kScreenHeight,
  kStatusBarHeight,
  kNavigationBarHeight,
  kBottomSafeAreaInset,
  isIPhoneXABOVE,
} from "../common/common";

const kHeaderBgImageHeight = isIPhoneXABOVE ? 230 : 210;
const kHeaderBgImageWidth = kScreenWidth;

import CountDownTimer from "../common/countDownTimer";


import Swiper from "react-native-swiper";

let page = 1;//当前第几页
const requestProductUrl = "http://h5_api.dev.patpat.vip/v1.4/product";

const PPProductDetailCellType = {
  images: 0,
  eventBanner: 1,
  nameAndPrice: 2,
  separateLine: 3,
  tabMenu: 4,
};

const DATA = [
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    type: PPProductDetailCellType.tabMenu,
    title: "Tab Menu",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    type: PPProductDetailCellType.images,
    title: "First",
  }
];

class PPProductDetailModule extends Component {
  render() {
    return (
      <View style={styles.container}>
        <PPProductDetail />
      </View>
    );
  }
}

class PPProductDetailNavigation extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const bgColor = this.props.bgColor;
    const backIcon = this.props.backIcon;
    const bagIcon = this.props.bagIcon;
    const titleColor = this.props.titleColor;

    return (
      <View style={[navigation_styles.container, {backgroundColor:bgColor}]} >
        <TouchableOpacity onPress={this.props.onBackClick}>
          <Image source={backIcon}
                 style={navigation_styles.backButton} />
        </TouchableOpacity>
        <Text style={[navigation_styles.title, {color:titleColor}]} >{this.props.title}</Text>
        <TouchableOpacity onPress={this.props.onBagClick}>
          <Image source={bagIcon}
                 style={navigation_styles.bagButton}>
          </Image>
        </TouchableOpacity>
      </View>
    );
  }
}

const Item = ({ title }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

function ImageItem(props) {
  return(
    <Image source={{uri: props.imageUrl}}
                      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} />
  );
}

class MenuTabItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const bgColor = this.props.bgColor;
    return (
      <TouchableOpacity style={{backgroundColor:bgColor, width:kScreenWidth/2, justifyContent:'center'}}>
          <Text style={{fontSize: 20, color:'black',textAlign: "center"}}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

class PPCheckInAccountContainerView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{marginTop:15, marginBottom:15,  paddingLeft:10, paddingRight:10, flexDirection:'row', justifyContent:'space-between'}}>
        <View  style={{
          flexDirection:'row',
          alignItems:'center',
          borderRadius: 8,
          borderColor: "white",
          borderWidth: 0.5,
          paddingLeft:5,
          paddingRight: 5,
          height:40,
        }}
        >
          <Image source={require("../img/checkin/checkIn_eur_icon.png")}  style={{marginLeft:5}}/>
          <Text style={{color: 'white', fontSize:12, fontWeight: 'bold',marginLeft:5}}>
              My Credites:
          </Text>
          <Text style={{color: 'white', fontSize:18, fontWeight: 'bold'}}>
            {this.props.money}
          </Text>
        </View>
        <View style={{flexDirection: "row", alignItems: "center"}}>
            <Text style={{ fontSize: 13, fontWeight: "bold", color: "white" }}>{this.props.countDownTips}</Text>
            <CountDownTimer style={{ backgroundColor: "rgba(0,0,0,0)" }}
                            textTimeStyle={{
                              fontSize: 15,
                              fontWeight:'bold',
                              color: 'white',
                              backgroundColor: 'rgba(255, 255, 255, 0.3)',
                              paddingTop:5,
                              paddingLeft:2,
                              paddingBottom: 5,
                              paddingRight:2,
                              overflow:'hidden',
                              borderRadius:5 }}
                            textUnitStyle={{ fontSize: 15, fontWeight:'bold', color: "white" }}
                            millisUntilFinished={this.props.countDownTime}
                            refreshData={() => this._showMessage()} />
        </View>
      </View>
    );
  }
}

class PPCheckInDailyItemView extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <TouchableOpacity style={{alignItems: 'center', justifyContent:'space-between'}}>
            <View style={{
              width:36,
              height:50,
              backgroundColor: 'rgba(255, 242, 234, 1)',
              borderWidth: 0.5,
              borderColor:'rgba(255, 222, 222, 1)',
              borderRadius:4,
              alignItems: 'center',
              justifyContent:'space-between',
              paddingTop:6,
              paddingBottom:6,
            }}>
              <Text style={{fontSize: 12, color: 'rgba(241, 67, 90, 1)', fontWeight:'bold'}}>{this.props.price}</Text>
              <Image source={require("../img/checkin/checkIn_eur_icon.png")}/>
            </View>
            <Text style={{color: 'rgba(168, 168, 168, 1)', fontSize: 10, textAlign:'center', marginTop:8}}>{this.props.whichDay}</Text>
        </TouchableOpacity>
      );
    }
}

class PPCheckInProgressContainerView extends  Component {
  render() {
    return (
     <View style={{
       backgroundColor: 'rgba(255, 255, 255, 1)',
       height:100,
       marginLeft:10,
       marginRight:10,
       borderRadius:5,
       borderWidth:1,
       borderColor: 'rgba(255, 239, 239, 1)',
       overflow:'hidden',
       flexDirection: 'row',
       justifyContent:'space-between',
       alignItems:'center',
       paddingLeft:15,
       paddingRight:15,
     }}
     >
       <PPCheckInDailyItemView price={'+$1'} whichDay={'Lun'} />
       <PPCheckInDailyItemView price={'+$1'} whichDay={'Tue'}/>
       <PPCheckInDailyItemView price={'+$1'} whichDay={'Wed'}/>
       <PPCheckInDailyItemView price={'+$1'} whichDay={'Thu'}/>
       <PPCheckInDailyItemView price={'+$1'} whichDay={'Fri'}/>
       <PPCheckInDailyItemView price={'+$1'} whichDay={'Sta'}/>
       <PPCheckInDailyItemView price={'+$1'} whichDay={'Sun'}/>
     </View>
    );
  }
}

class PPCheckInHeadModuleView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{marginTop: kNavigationBarHeight}}>
        <PPCheckInAccountContainerView countDownTips={'Scade tra 5 giorni'} countDownTime={'3000000'} money={'$1'}/>
        <PPCheckInProgressContainerView />
      </View>
    );
  }
}

class PPProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgImageFrame: {
        x: 0,
        y: 0,
        height: kHeaderBgImageHeight,
        width: kHeaderBgImageWidth,
      },
      navigation: {
        bgColor: 'rgba(255, 255, 255, 0)',
        backIcon: require("../img/checkin/checkIn_back_white_icon.png"),
        bagIcon: require("../img/checkin/checkIn_rules_white_icon.png"),
        title: '每日签到',
        titleColor:'white',
      }
    };

    this._onScroll = this._onScroll.bind(this);
    this._handleBgImageAndNavWithOffsetY = this._handleBgImageAndNavWithOffsetY.bind(this);
  }

  _handleBgImageAndNavWithOffsetY(offsetY) {
    // 更新nav
    let navigation = this.state.navigation;
    let headViewHeight = kScreenWidth * 230.0/750;
    if (offsetY <= headViewHeight - 50) {
      let alpha = offsetY / headViewHeight;
      navigation.bgColor = 'rgba(255, 255, 255, ' + alpha + ')';
      navigation.backIcon = require("../img/checkin/checkIn_back_white_icon.png");
      navigation.bagIcon = require("../img/checkin/checkIn_rules_white_icon.png");
      navigation.titleColor = 'white';
    } else {
      navigation.bgColor = 'rgba(255, 255, 255, 1.0)';
      navigation.backIcon = require("../img/checkin/checkIn_back_black_icon.png");
      navigation.bagIcon = require("../img/checkin/checkIn_rules_black_icon.png");
      navigation.titleColor = 'black';
    }

    // 处理头部背景
    let frame = this.state.bgImageFrame;
    if (offsetY < 0) {
      frame.height = kHeaderBgImageHeight - offsetY;
      frame.width = kHeaderBgImageWidth* (kHeaderBgImageHeight-offsetY)/kHeaderBgImageHeight;
      frame.x = -(frame.width-kHeaderBgImageWidth)/2;
      frame.y = 0;
    } else {
      frame.height = kHeaderBgImageHeight;
      frame.width = kHeaderBgImageWidth;
      frame.x = 0;
      frame.y = -offsetY;
    }
    this.setState({
      bgImageFrame:frame,
      navigation:navigation,
    });
  };

 _onScroll(event) {
    let contentOffsetY = event.nativeEvent.contentOffset.y;
    this._handleBgImageAndNavWithOffsetY(contentOffsetY);
  }

  render() {
    const renderItem = ({ item }) => {
      if (item.type === PPProductDetailCellType.tabMenu) {
        return (
          <PPCheckInHeadModuleView />
        );
      }
      return (
        <Item title={item.title} />
      );
    };

    return (
      <View style={product_detail_styles.container}>
        <ImageBackground source={require("../img/checkin/checkIn_header_bg.png")}
                         style={{
                           marginLeft:this.state.bgImageFrame.x,
                           marginTop:this.state.bgImageFrame.y,
                           width: this.state.bgImageFrame.width,
                           height: this.state.bgImageFrame.height,
                           position: 'absolute'}}
        />
        <FlatList data={DATA} renderItem={renderItem}
                  keyExtractor={item => item.id}
                  automaticallyAdjustContentInsets={false}
                  onScroll={this._onScroll}
                  scrollEventThrottle={1}
        />

        <PPProductDetailNavigation
          bgColor={this.state.navigation.bgColor}
          backIcon={this.state.navigation.backIcon}
          bagIcon={this.state.navigation.bagIcon}
          title={this.state.navigation.title}
          titleColor={this.state.navigation.titleColor}
          onBackClick={handleBackClick}
          onBagClick={handleBagClick} />
      </View>
    );
  }
};

function handleBackClick() {
  alert("back");
}

function handleBagClick() {
  alert("bag");
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color: "black",
  }
});

const product_detail_styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {},

  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});

const navigation_styles = StyleSheet.create({
  container: {
    height: kNavigationBarHeight,
    width: kScreenWidth,
    backgroundColor: "pink", //'pink',transparent
    flexDirection: "row",
    alignItems: "center",  // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中
    justifyContent: "space-between",
    position: "absolute",
  },
  backButton: {
    marginTop: kStatusBarHeight,
    marginLeft: 15,
    width: 22,
    height: 22,
    resizeMode: "stretch",
  },
  title: {
    marginTop: kStatusBarHeight,
  },
  bagButton: {
    marginTop: kStatusBarHeight,
    marginRight: 15,
    width: 22,
    height: 22,
    resizeMode: "stretch",
  },
});

export default PPProductDetail;
