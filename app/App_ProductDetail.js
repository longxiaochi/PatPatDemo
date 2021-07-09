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
} from "react-native";

import {
  kScreenWidth,
  kScreenHeight,
  kStatusBarHeight,
  kNavigationBarHeight,
  kBottomSafeAreaInset,
} from "../common/common";

import CountDownTimer from "../common/countDownTimer";


import Swiper from "react-native-swiper";

let page = 1;//当前第几页
const requestProductUrl = "http://h5_api.dev.patpat.vip/v1.4/product";

const PPProductDetailCellType = {
  images: 0,
  eventBanner: 1,
  nameAndPrice: 2,
  separateLine: 3,
};

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    type: PPProductDetailCellType.images,
    title: "First",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    type: PPProductDetailCellType.eventBanner,
    title: "Second Item",
  },
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
  render() {
    return (
      <View style={navigation_styles.container}>
        <TouchableOpacity onPress={this.props.onBackClick}>
          <Image source={require("../img/product_detail/product_detail_black_close.png")}
                 style={navigation_styles.backButton} />
        </TouchableOpacity>

        {/*<View style={navigation_styles.searchBox}>*/}
        {/*  <Image source={require('../img/search.png')} style={navigation_styles.searchIcon}/>*/}
        {/*  <TextInput style={navigation_styles.inputText}*/}
        {/*             keyboardType='web-search'*/}
        {/*             placeholder='What are you looking for?' />*/}
        {/*</View>*/}

        <Image style={navigation_styles.thumbnail} source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }} />
        <TouchableOpacity onPress={this.props.onBagClick}>
          <Image source={require("../img/product_detail/product_detail_black_bag.png")}
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
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //   {/*<Image source={{ uri: props.imageUrl}}/>*/}
    //   <Image source={require("../img/product_detail/product_detail_banner_more.png")} />
    // </View>
    <Image source={{uri: props.imageUrl}}
                      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} />
  );
}


const PPProductDetailImagesView = ({ images }) => {
  let imageItems = new Array();
  for (let i = 0; i < images.length; i++) {
    let item = <ImageItem imageUrl={images[i]} />;
    imageItems.push(item);
  }
  return (
    <Swiper style={product_detail_styles.wrapper}
            showsButtons={false}
            horizontal={true}
            height={kScreenWidth}
            autoplay={false}
            dot={
              <View
                style={{
                  backgroundColor: "white",
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: 3,
                  marginBottom: 3,
                }}
              />
            }
            activeDot={
              <View
                style={{
                  backgroundColor: "red",
                  width: 16,
                  height: 8,
                  borderRadius: 4,
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: 3,
                  marginBottom: 3,
                }}
              />
            }
    >
      {imageItems}
    </Swiper>
  );
};

function EntranceView(props) {
  if (props.hintText != "") {
    return (
      <View style={{ flex: 2, backgroundColor: "blue", flexDirection: "row" }}>
        <View style={{
          flex: 5,
          justifyContent: "center",
          alignItems: "flex-end",
          backgroundColor: "gray",
        }}>
          <Text style={{ fontSize: 13, fontWeight: "bold", color: "white", paddingRight: 10 }}>{props.hintText}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Image source={require("../img/product_detail/product_detail_banner_more.png")} />
        </View>
      </View>
    )
  } else {
    return (
      <View style={{ flex: 2, backgroundColor: "blue", flexDirection: "row" }}>
        <View style={{
          flex: 5,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "gray",
        }}>
          <Text style={{ fontSize: 13, fontWeight: "bold", color: "white" }}>{props.countDownTips}</Text>
          <CountDownTimer style={{ backgroundColor: "rgba(0,0,0,0)" }}
                          textTimeStyle={{ fontSize: 12, color: "#cccccc", marginBottom: 3 }}
                          textUnitStyle={{ fontSize: 10, color: "white" }}
                          millisUntilFinished={props.countDownTime}
                          refreshData={() => this._showMessage()} />
        </View>
        <View style={{ flex:1, justifyContent: "center" }}>
          <Image source={require("../img/product_detail/product_detail_banner_more.png")} />
        </View>
      </View>
    );
  }
};

const PPProductDetailEventBannerView = ({
                                          eventPirce,
                                          title,
                                          limitText,
                                          hintText,
                                          countDownTips,
                                          countDownTime,
                                          isShowArrow,
                                        }) => {

  return (
    <View style={{ backgroundColor: "green", flexDirection: "row", height: 50 }}>
      <ImageBackground source={require("../img/product_detail/product_detail_event_banner_bg.png")}
                       style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 4 }}>
          <Text style={{ fontSize: 22, fontWeight: "bold", color: "white", marginLeft: 15 }}>{eventPirce}</Text>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: "green" }}>
            <Text style={{
              fontSize: 11,
              fontWeight: "bold",
              color: "white",
              textAlign: "left",
              marginLeft: 15,
              marginTop: 5,
            }}>
              {title}
            </Text>
            <Text style={{
              fontSize: 10,
              fontWeight: "bold",
              color: "white",
              textAlign: "left",
              borderRadius: 8,
              borderColor: "white",
              borderWidth: 1,
              paddingLeft: 5,
              paddingRight: 5,
              marginLeft: 5,
              marginTop: 5,
            }}>
              {limitText}
            </Text>
          </View>
        </View>

        <EntranceView hintText={hintText} countDownTips={countDownTips} countDownTime={countDownTime}/>
      </ImageBackground>
    </View>
  );
};

const PPProductDetailNameAndPriceView = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "blue" }}>
      <Text style={{ fontSize: 30, fontWeight: "bold" }}>Event Banner</Text>
    </View>
  );
};

const PPProductDetailCellTypeSeparateLine = ({ height }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "gray", height: height }} />
  );
};

class PPProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getProductDetail = this.getProductDetail.bind(this);
  }

// 组件刚加载完成的时候调用一次，以后不会再被调用。
  componentDidMount() {
    console.log("sdsdlfkjsdlfkjsdlf000000001");
    // this.getProductDetail();
  }

  getProductDetail() {
    let formData = new FormData();
    formData.append("product_id", 451060);
    formData.append("timestamp", "1625542350234");
    formData.append("user_id", 5637589);
    formData.append("user_token", "abceglmnpqstxyzCDFHILMPQRUWXZ245");
    formData.append("source_page", "default");

    fetch(requestProductUrl, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: formData,
    }).then((response) => {
      return response.json();
    }).then((responseData) => {

      // let newArray = this.state.array.slice()
      //
      let products = responseData.data.products;
      console.log(products);

      //
      // let count = dataInfo.total;
      //
      // let total_count = count;
      //
      // let products = newArray.concat(dataInfo.items);
      //
      // //filter data
      // let filtersInfo = responseData.data.filters;
      // if(filtersInfo !=null){
      //
      //   alert(filtersInfo);
      //
      // }
      //
      //
      //
      // this.setState({
      //   array: products,
      //   total: count,
      //   isShowFilterModal:false
      // })


    }).catch((error) => {

      // this.setState({
      //   error: true,
      //   errorInfo: error,
      //   isShowFilterModal:false
      // })
      // console.warn(error);
    }).done();
  }

  render() {
    const imageArr = ["http://patpatwebstatic.s3.us-west-2.amazonaws.com/origin/product/000372000561/5ed5b8c853dd3.jpg",
      "http://patpatwebstatic.s3.us-west-2.amazonaws.com/origin/product/013579000000/5e79a5df51570.jpg",
      "http://patpatwebstatic.s3.us-west-2.amazonaws.com/origin/product/013579000000/5e79a5df8faff.jpg"];

    const renderItem = ({ item }) => {
      if (item.type === PPProductDetailCellType.images) {
        return (
          <PPProductDetailImagesView images={imageArr} />
        );
      } else if (item.type === PPProductDetailCellType.eventBanner) {
        return (
          <PPProductDetailEventBannerView title={"新人专享"}
                                          eventPirce={"$4.99"}
                                          limitText={"每人限制5件"}
                                          hintText={""}
                                          countDownTips={"Ends in:"}
                                          countDownTime={3000000}
                                          isShowArrow={false}
          />
        );
      } else if (item.type === PPProductDetailCellType.nameAndPrice) {
        return (
          <PPProductDetailNameAndPriceView title={item.title} />
        );
      } else if (item.type === PPProductDetailCellType.separateLine) {
        return (
          <PPProductDetailCellTypeSeparateLine title={item.title} />
        );
      } else if (item.type === PPProductDetailCellType.separateLine) {

      }

      return (
        <Item title={item.title} />
      );
    };

    return (
      <View style={product_detail_styles.container}>
        <StatusBar />
        <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id} />

        <PPProductDetailNavigation
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

// const _styles = StyleSheet.create({
//
// });

const navigation_styles = StyleSheet.create({
  container: {
    flex: 1,
    height: kNavigationBarHeight,
    width: kScreenWidth,
    backgroundColor: "transparent", //'pink',
    flexDirection: "row",
    alignItems: "center",  // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中
    justifyContent: "space-between",
    position: "absolute",
  },
  backButton: {
    marginTop: kStatusBarHeight,
    marginLeft: 15,
    width: 28,
    height: 28,
    resizeMode: "stretch",
  },
  searchBox: {
    marginTop: kStatusBarHeight,
    height: 30,
    flexDirection: "row",   // 水平排布
    flex: 1,
    borderRadius: 15,  // 设置圆角边
    backgroundColor: "#F8F8F8",
    alignItems: "center",
    marginLeft: 15,
    marginRight: 15,
  },

  inputText: {
    flex: 1,
    backgroundColor: "transparent",
    fontSize: 15,
  },

  searchIcon: {
    height: 17,
    width: 17,
    marginLeft: 5,
    resizeMode: "stretch",
  },
  thumbnail: {
    marginTop: kStatusBarHeight,
    width: 25,
    height: 25,
  },
  bagButton: {
    marginTop: kStatusBarHeight,
    marginRight: 15,
    width: 28,
    height: 28,
    resizeMode: "stretch",
  },
});

export default PPProductDetail;
