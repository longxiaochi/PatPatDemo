import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Text,
  ImageBackground,
  ActivityIndicator,
  Button,
  TextInput,
  PanResponder,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  PixelRatio
} from 'react-native';
import PropTypes from 'prop-types';

const Screen_Width = Dimensions.get('window').width;
const Screen_Height = Dimensions.get('window').height;

let page = 1;//当前第几页
const requestUrl = 'http://h5_api.dev.patpat.vip/v1.4/categories/products';
const requestFilterUrl = 'http://h5_api.dev.patpat.vip/v1.4/categories/filters';

export default class App extends Component {
  render() {
    return (
      <View style = {styles.container}>
        <CategoryProductList />
      </View>
    );
  }
}

class CategoryProductList extends Component {

  constructor(props){
    super(props);
    this.state = {
      columns :2,
      key: 1,
      array: [],
      error: false,
      errorInfo: "",
      total: 0,//分类商品总数
      isShowFilterModal:false,//是否展示筛选的视图
      offsetY:0,//分类视图展开的位置
      categoryId:32240,
      superCategoryId:32240,
      categoryHeight:0,//分类视图展开的高度
      categoryDatas:[],//所有分类数据源
      filterCategoryDatas:[],//筛选的分类的数据源
      categorySonName:'',//分类名称信息
    }
    this.getFilters = this.getFilters.bind(this);
    this.getProducts = this.getProducts.bind(this);
  }

  getFilters() {
    let formData = new FormData();
    formData.append('user_token', 'guest');
    formData.append('category_son_id',this.state.categoryId);
    formData.append('timestamp','1624862569139');
    formData.append('category_id',this.state.superCategoryId);
    formData.append('user_id','36618645');
    fetch(requestFilterUrl,{
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:formData,
    }).then((response)=> {
      return response.json();

    }).then((responseData) => {

      let newArray = this.state.categoryDatas.slice()

      let categoryies = newArray.concat(responseData.data.categories);

      for(let i = 0; i< categoryies.length; i++){
        var dic1 = categoryies[i];
        dic1.subNode= [];
        dic1.parentNode = {};
      }

      //设置节点信息
      for(let i = 0; i< categoryies.length; i++){
        var dic1 = categoryies[i];
        let nodeId1 = dic1.id;
        let parentId1 = dic1.parent_id;
        for(let j=i+1; j< categoryies.length; j++){
          var dic2 = categoryies[j];
          let parentId2 = dic2.parent_id;
          let nodeId2 = dic2.id;
          if (nodeId1 == parentId2) {
            dic1.subNode.push(dic2)
            dic2.parentNode = dic1
          }else if(parentId1 == nodeId2){
            dic2.subNode.push(dic1)
            dic1.parentNode = dic2
          }
        }
      }

      this.setState({
        categoryDatas: categoryies,
        categorySonName: responseData.data.category_son_name.name,
      })

      this.getFilterCategorys();

      this.getProducts();

    }).catch((error) => {

      this.setState({
        error: true,
        errorInfo: error,
        isShowFilterModal:false
      })
      console.warn(error);
    }).done();

  }

  getFilterCategorys() {

    if (!this.state.categoryDatas || this.state.categoryDatas.length <=0) {
      return;
    }
    var datas = [];
    //find sub nodes
    for(let i = 0; i< this.state.categoryDatas.length; i++){
      var dic = this.state.categoryDatas[i];
      let nodeId = dic.id;
      if(nodeId == this.state.categoryId) {
        datas = dic.subNode;
      }else {
        if(dic.subNode.length > 0){
          for (let j = 0; j< dic.subNode.length; j++){
            var dic2 = dic.subNode[j];
            let nodeId2 = dic2.id;
            if(nodeId2 == this.state.categoryId){
              datas = dic2.subNode;
              break;
            }else {
              if(dic2.subNode.length > 0){
                for (let k = 0; k< dic2.subNode.length; k++){
                  var dic3 = dic2.subNode[k];
                  let nodeId3 = dic3.id;
                  if(nodeId3 == this.state.categoryId){
                    if(dic3.subNode.length <=0 || !dic3.subNode){
                      datas = dic2.subNode;
                      break;
                    }else {
                      datas = dic3.subNode;
                      break;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    let row = Math.ceil(datas.length / 4);
    this.setState({
      filterCategoryDatas: datas,
      categoryHeight: row * 80 + (row - 1)*10
    })

  }

  getProducts() {

    let formData = new FormData();
    formData.append('user_token', 'e8e002662f170954fa251534691d75fc');
    formData.append('category_son_id',this.state.categoryId);
    formData.append('is_sale','0');
    formData.append('timestamp','1624248710309');
    formData.append('category_id',this.state.superCategoryId);
    formData.append('start_price','0');
    formData.append('user_id','36618050');
    formData.append('type','0');
    formData.append('product_id','0');
    formData.append('filter','0');
    formData.append('page',page);
    formData.append('page_size','28');
    formData.append('sort','0');
    formData.append('end_price','0');

    fetch(requestUrl,{
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:formData
    }).then((response)=> {
      alert('dddd');
      return response.json()

    }).then((responseData) => {

      let newArray = this.state.array.slice()

      let dataInfo = responseData.data.products;

      let count = dataInfo.total;

      let total_count = count;

      let products = newArray.concat(dataInfo.items);

      //filter data
      let filtersInfo = responseData.data.filters;
      if(filtersInfo !=null){

        alert(filtersInfo);

      }



      this.setState({
        array: products,
        total: count,
        isShowFilterModal:false
      })


    }).catch((error) => {

      this.setState({
        error: true,
        errorInfo: error,
        isShowFilterModal:false
      })
      console.warn(error);
    }).done();

  }

  componentDidMount() {

    this._panResponder = PanResponder.create({

      onStartShouldSetPanResponder: () => true,
      //开启移动手势响应
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      //开启移动手势响应是否劫持 true：不传递给子view false：传递给子view
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      //手指触碰屏幕那一刻触发 成为激活状态。
      onPanResponderGrant: (evt, gestureState) => {
        return true;

      },
      // 表示手指按下时，成功申请为事件响应者的回调。
      onPanResponderStart: (evt, gestureState) => {
        // 表示申请成功，你成为了事件的响应者，这个时候开始，组件就进入了激活状态。
      },
      //手指在屏幕上移动触发
      onPanResponderMove: (evt, gestureState) => {

        if(gestureState.dy < 10) {
          this.refs.headerview.setNativeProps({
            style:{
              marginTop:-130
            }
          })
        }else {
          this.refs.headerview.setNativeProps({
            style:{
              marginTop:0
            }
          })
        }

      },
      //当有其他不同手势出现，响应是否中止当前的手势
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      //手指离开屏幕触发
      onPanResponderRelease: (evt, gestureState) => {
      },
      // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      onPanResponderTerminate: (evt, gestureState) => {
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        return false;
      },

    });

    this.getFilters();

  }

  onPressingItem(product_id) {
    alert(product_id);
  }

  backAction(){
    alert('back action')
  }

  bagAction() {
    alert('bag action')
  }

  clickCategory(category) {

    // console.log(category);

// this.setState({
//   array:[],
//   page:1,
//   categoryId:category.id,
//   superCategoryId:category.parent_id
// })

    this.state.array = [];
    this.state.page = 1;
    this.state.categoryId = category.id;
    this.state.superCategoryId = category.parent_id;

// alert(category.id);

// alert(category.parent_id);

    this.getProducts();

  }

  _renderFooter(){
    if (this.state.array.length ==0){ //第一次不显示loading more
      return (
        <View style={productlist_styles.footer}>
          <Text></Text>
        </View>
      );
    }
    return (
      <View style={productlist_styles.footer}>
        <ActivityIndicator />
        <Text>加载更多</Text>
      </View>
    );
  }

  //加载等待页
  renderLoadingView() {
    return (
      <View style={productlist_styles.loading_container}>
        <ActivityIndicator
          animating={true}
          color='grey'
          size="large"
        />
      </View>
    );
  }

  //加载失败view
  renderErrorView() {
    return (
      <View style={productlist_styles.container}>
        <Text>
          Fail
        </Text>
      </View>
    );
  }

  _onEndReached(){

    page++;
    //获取数据
    this.getProducts();

  }

  onClickCategoryTap() {

    alert("000")
  }

  onClickSizeTap() {

    alert('size')

  }

  onClickSortTap() {

    alert('sort')

  }

  onClickFilterTap() {

    alert('filter')

  }


  render() {

    const {columns, key, array, filterCategoryDatas} = this.state;

    if (this.state.array.length ==0 && !this.state.error){
      return this.renderLoadingView();
    }else if(this.state.error){
      return this.renderErrorView();
    }

    return (

      <View style = {productlist_styles.container}>

        <View style={productlist_styles.headerview} ref="headerview">

          <View style={{height:20,backgroundColor:'white'}}></View>

          <View style={productlist_styles.navigationview}>
            <TouchableWithoutFeedback onPress={this.backAction}>
              <Image source={require('./img/nav_back.png')} style={productlist_styles.backbtn} />
            </TouchableWithoutFeedback>

            <View style={productlist_styles.searchBox}>
              <Image source={require('./img/search.png')} style={productlist_styles.searchIcon}/>
              <TextInput style={productlist_styles.inputText}
                         keyboardType='web-search'
                         placeholder='What are you looking for?' />
            </View>

            <TouchableWithoutFeedback onPress={this.bagAction}>
              <Image source={require('./img/nav_bag.png')} style={productlist_styles.bagbtn} >
              </Image>
            </TouchableWithoutFeedback>
          </View>


          <View style={productlist_styles.categoryheaderview}>
            <View style={productlist_styles.categoryview} ref="categoryPopupView">
              <TouchableOpacity
                onPress = {() => {
                  this.refs.categoryPopupView.measure((fx, fy, width, height, px, py) => {
                    this.setState({
                      isShowFilterModal:true,
                      offsetY:py+height
                    })
                  })
                }}
              >
                <View style={{alignItems:'center', flex:1,flexDirection: 'row'}}>
                  <Text>{"Category"}</Text>
                  <Image source={require('./img/gradePullDown.png')} style={{marginLeft:5,width:10,height:10}} ref='categoryImage' ></Image>
                </View>
              </TouchableOpacity>
            </View>


            <View style={productlist_styles.sizeview} ref="sizePopupView">
              <TouchableWithoutFeedback onPress={this.onClickSizeTap}>
                <View style={{alignItems:'center', flex:1, flexDirection: 'row'}}>
                  <Text>{"Size"}</Text>
                  <Image source={require('./img/gradePullDown.png')} style={{marginLeft:5,width:10,height:10}} ></Image>
                </View>
              </TouchableWithoutFeedback>
            </View>


            <View style={productlist_styles.sortview} ref="sortPopupView">
              <TouchableWithoutFeedback onPress={this.onClickSortTap}>
                <View style={{alignItems:'center', flex:1,flexDirection: 'row'}}>
                  <Text>{"Sort"}</Text>
                  <Image source={require('./img/gradePullDown.png')} style={{marginLeft:5,width:10,height:10}} ></Image>
                </View>
              </TouchableWithoutFeedback>
            </View>


            <View style={productlist_styles.filterView} ref="filterPopupView">
              <TouchableWithoutFeedback onPress={this.onClickFilterTap}>
                <View style={{alignItems:'center', flex:1,flexDirection: 'row'}}>
                  <Text>{"Filter"}</Text>
                  <Image source={require('./img/gradePullDown.png')} style={{marginLeft:5,width:10,height:10}} ></Image>
                </View>
              </TouchableWithoutFeedback>
            </View>



            <Modal
              animationType='none'
              transparent={true}
              visible={this.state.isShowFilterModal} //可见
              onShow={() => {
              }}
            >
              <TouchableWithoutFeedback onPress={()=>this.setState({isShowFilterModal:false})}>
                <View  style={{position:'absolute',height:this.state.offsetY,top:0,left:0,right:0,backgroundColor:'rgba(0,0,0,.5)'}}/>
              </TouchableWithoutFeedback>
              <View style={{position:'absolute',flex:1, marginTop: this.state.offsetY,height:this.state.categoryHeight,left:0,right:0, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                <FlatList
                  key = {key}
                  numColumns = {4}
                  data = {filterCategoryDatas}
                  renderItem = {({item , index}) => {
                    return <CategoryItemView
                      id = {item}
                      itemWidth = {Screen_Width/4}
                      imageUrl = {item.icon}
                      name = {item.name}
                      onPressItem = {this.clickCategory.bind(this)}
                    />
                  }}
                  keyExtractor = {
                    (item, index) => {return item.product_id}
                  }
                />
              </View>
              <TouchableWithoutFeedback onPress={()=>this.setState({isShowFilterModal:false})}>
                <View  style={{position:'absolute',height:Screen_Height-this.state.offsetY-this.state.categoryHeight,top:this.state.categoryHeight+this.state.offsetY,left:0,right:0,backgroundColor:'rgba(0,0,0,.5)'}}/>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
          <CreateCategoryHeaderView state={this.state} />


        </View>

        <FlatList
          ref="touchFlatListView"
          {...this._panResponder.panHandlers}
          key = {key}
          numColumns = {columns}
          data = {array}
          renderItem = {({item , index}) => {
            return <ProductItem
              id = {item.product_id}
              itemWidth = {(Screen_Width-30)/columns}
              imageUrl = {item.icon}
              name = {item.product_name}
              price = {item.price}
              onPressItem = {this.onPressingItem.bind(this)}
            />
          }}
          ListFooterComponent={this._renderFooter.bind(this)}
          onEndReached={this._onEndReached.bind(this)}
          onEndReachedThreshold={1}
          keyExtractor = {
            (item, index) => {return item.product_id}
          }
        />
      </View>
    );


  }
}

function CreateCategoryHeaderView(props) {

  if(props.state.categorySonName !=null){
    return <View style={{backgroundColor: 'white',
      height:60,
      paddingTop:0,
      paddingLeft:10,
      paddingRight:10}}>
      <Text style={styles.text}>{props.state.categorySonName}</Text>
      <Text style={styles.subtext}>{props.state.total} {"Results"}</Text>
    </View>
  }else {
    return  <View style={{backgroundColor: 'white',
      height:40,
      paddingTop:0,
      paddingLeft:10,
      paddingRight:10}}>
      <Text style={styles.text}>{props.state.total} {"Results"}</Text>
    </View>
  }
}

//product item
class ProductItem extends Component {

  render() {

    const {id, itemWidth, imageUrl, name, price, onPressItem} = this.props;

    return (

      <TouchableWithoutFeedback style={productitem_styles.feedback} onPress={ () => onPressItem(id)}>

        <View style={productitem_styles.view}>

          <ImageBackground style={productitem_styles.image} imageStyle={{borderRadius:5}} source= {{uri: imageUrl}} >

          </ImageBackground>

          <Text  numberOfLines={1} style={productitem_styles.text}>{name}</Text>

          <View style={productitem_styles.bottomView}>

            <Text style={productitem_styles.price}>{price}</Text>

          </View>

        </View>
      </TouchableWithoutFeedback>

    );
  }
}

class CategoryItemView extends Component {
  render() {
    const {id, parentId,itemWidth, imageUrl, name, onPressItem} = this.props;
    return (
      <TouchableWithoutFeedback style={productitem_styles.feedback} onPress={ () => onPressItem(id)}>
        <View style={productitem_styles.categoryItemview}>
          <ImageBackground style={productitem_styles.categoryItemImage} imageStyle={{borderRadius:25}} source= {{uri: imageUrl}} >
          </ImageBackground>
          <Text  numberOfLines={1} style={productitem_styles.categoryText}>{name}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const productitem_styles = StyleSheet.create({

  feedback: {
    flex: 1,
    alignItems:'center'
  },

  view: {
    marginTop: 2,
    marginBottom:2
  },

  image:{
    width: (Screen_Width-30)/2.0,
    height:200,
    flex: 1,
    resizeMode: "cover",
    marginLeft:10
  },

  text: {
    width: (Screen_Width-30)/2.0,
    flexWrap: 'wrap',
    fontSize: 12,
    color:'black',
    textAlign: 'center',
    flex:1,
    paddingLeft:10,
    paddingRight:10,
    paddingTop: 5,
    height:25,
    backgroundColor:'white'
  },

  bottomView:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingRight: 10,
    backgroundColor:'white',
    paddingBottom:10
  },

  price: {
    flex: 1,
    textAlign: 'center',
    fontSize: 13,
    color: '#f15353',
    alignItems:'center'
  },

  button: {
    width: 50,
    height:20,
    backgroundColor:'pink',
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center'
  },

  simal:{
    color: '#f15353',
    fontSize: 12,
    textAlign:'center'
  },

  categoryItemview: {
    backgroundColor: 'white',
    width:Screen_Width/4,
    height:80,
    justifyContent:'center',
    alignItems:'center'
  },

  categoryItemImage: {
    marginTop:10,
    width: 50,
    height:50,
    flex: 1,
    resizeMode: "cover",
  },

  categoryText: {
    flexWrap: 'wrap',
    fontSize: 10,
    color:'black',
    textAlign: 'center',
    paddingTop:5
  }


});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

  resultView: {
    backgroundColor: 'red',
    justifyContent:'center',
    height:40,
    marginBottom:10
  },

  text: {
    flex:1,
    textAlign: 'center',
    color: 'grey',
    marginTop:10,
  },

  subtext: {
    flex:1,
    textAlign: 'center',
    color: 'grey',
  },

});

const productlist_styles = StyleSheet.create({

  container: {
    flex:1
  },

  headerview:{
    backgroundColor: 'white',
    marginTop:0
  },

  navigationview:{
    height: 44,
    backgroundColor: 'white',
    paddingLeft:25,
    paddingRight:25,
    flexDirection:'row',
    alignItems: 'center'  // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中

  },

  backbtn: {
    width:22,
    height:22,
    resizeMode: 'stretch'
  },

  searchBox: {
    height:30,
    flexDirection: 'row',   // 水平排布
    flex:1,
    borderRadius: 15,  // 设置圆角边
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,

  },

  inputText: {
    flex:1,
    backgroundColor:'transparent',
    fontSize:15,
  },

  searchIcon: {//搜索图标
    height: 17,
    width: 17,
    marginLeft: 5,
    resizeMode: 'stretch'
  },


  bagbtn: {
    width:22,
    height:22,
    resizeMode: 'stretch'
  },


  categoryheaderview: {
    height:40,
    // backgroundColor: 'grey',
    flexDirection:'row',
  },

  categoryview: {
    flex:1,
    // backgroundColor: 'yellow',
    color: 'black',
    justifyContent:'center',
    alignItems: 'center',

  },

  sizeview:{
    flex:1,
    // backgroundColor: 'red',
    color: 'black',
    justifyContent:'center',
    alignItems: 'center',
  },

  sortview: {
    flex:1,
    // backgroundColor: 'green',
    color: 'black',
    justifyContent:'center',
    alignItems: 'center',

  },

  filterView: {
    flex:1,
    // backgroundColor: 'grey',
    color: 'black',
    justifyContent:'center',
    alignItems: 'center',

  },


  topView: {
    backgroundColor: 'white',
    height:40,
    paddingTop:0,
    paddingLeft:10,
    paddingRight:10
  },

  footer:{
    flexDirection:'row',
    height:40,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:10,
  },

  loading_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

})
