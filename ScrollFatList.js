import React, {
    Component
} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    ScrollView,
    TouchableWithoutFeedback,
    ActivityIndicator
} from 'react-native';
const CategoryCommon = require('./Common')
import CategoryDetailProductItem from './CategoryDetailProductItem';
const CategoryDetailStyle = require('./CategoryDetailStyles');

export default class CategoryDetailListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topmenus: [],
            recommends: {},
            page: 1,
            error: false,
            errorInfo: "", //错误信息
            data: [],
        }
    }

    componentDidMount() {

        //    this.getCheckInData();
        this.getCheckInNavData();
    }

    getCheckInData() {

        let formData = new FormData()
        formData.append('user_id', 36617904)
        formData.append('user_token', '6c8b41215b7d6aa504f16cacc7928adf')
        formData.append('is_checkin', 0)
        formData.append('timestamp', '1625972580898')
        console.log(CategoryCommon.requestCheckInUrl)
        fetch(CategoryCommon.requestCheckInUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: formData,
        }).then((response) => {

            return response.json();

        }).then((responseData) => {

            console.log(responseData)

            let topmenus = responseData.data.topmenus;

            let recommends = responseData.data.recommends;

        }).catch((error) => {

            this.setState({
                error: true,
                errorInfo: error
            })
        }).done();
    }

    getCheckInNavData() {

        let formData = new FormData();
        formData.append('user_token', 'e8e002662f170954fa251534691d75fc');
        formData.append('nav_id', '0');
        formData.append('timestamp', '1625886947099');
        formData.append('page_size', '20');
        formData.append('page', 1);
        formData.append('user_id', '36618050');
        fetch(CategoryCommon.requestCheckInNavUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: formData,
        }).then((response) => {

            console.log(response.json)

            return response.json();

        }).then((responseData) => {

            let topmenus = responseData.data.topmenus;

            let recommends = responseData.data.recommends;

            this.setState({
                data: [{
                    "id": 1,
                    "title": 'page1',
                    "type": 'first'
                },
                {
                    "id": 2,
                    "title": 'page2',
                    "type": 'second'
                },
                {
                    "id": 3,
                    "title": 'page3',
                    "type": 'third'
                },
                {
                    "id": 4,
                    "title": 'page4',
                    "type": 'fourth'
                }],
                topmenus: topmenus,
                recommends: recommends
            })

        }).catch((error) => {

            this.setState({
                error: true,
                errorInfo: error
            })
        }).done();
    }

    render() {

        const { data } = this.state;
        return (
            <View style={
                CategoryDetailStyle.styles.container
            } >
                <FlatList ref="touchFlatListView"
                    key={
                        4
                    }
                    numColumns={
                        1
                    }
                    data={
                        data
                    }
                    renderItem={
                        ({
                            item,
                            index
                        }) => {
                            return <CreateFatListCell state={this.state} id={item} index={index}></CreateFatListCell>
                        }
                    }
                    keyExtractor={
                        (item, index) => {
                            return item.product_id
                        }
                    }
                />
            </View>
        );
    }
}

function CreateFatListCell(props) {

    switch (props.id.type) {

        case 'first':

            return <View style={{ backgroundColor: 'red', width: CategoryCommon.Screen_Width, height: 200 }}>
                <Text>{props.id.title}</Text>
            </View>

            break;

        case 'second':

            return <View style={{ backgroundColor: 'yellow', width: CategoryCommon.Screen_Width, height: 150 }}>
                <Text>{props.id.title}</Text>
            </View>

            break;

        case 'third':

            return <View style={{ backgroundColor: 'blue', width: CategoryCommon.Screen_Width, height: 100 }}>
                <Text>{props.id.title}</Text>
            </View>

            break;

        case 'fourth':

            return (
                <View>

                 <PPTapMenuView data={props}></PPTapMenuView>

                    <ScrollView
                        ref={(view) => { this.myScrollView = view }}
                        pagingEnabled={true}
                        horizontal={true}
                        scrollEnabled={true}
                        onContentSizeChange={(contentWidth, contentHeight) => {
                            var msg = 'onContentSizeChange:' + contentWidth + ',' + contentHeight;
                            // alert('onContentSizeChange')
                        }}
                    >
                        <CreateRecommendProductPageView
                            title={'best selling'}
                            data={props} />
                        <CreateRecommendProductPageView
                            title={'new arrivals'}
                            data={props} />
                    </ScrollView>

                </View>
            );
            break;
    }

}

function CreateRecommendProductPageView(props) {

    switch (props.title) {

        case 'best selling':

            return <View style={{
                backgroundColor: 'white',
                width: CategoryCommon.Screen_Width,
            }}>

                <RecommendFatList
                    data={props}>
                </RecommendFatList>

            </View>

            break;

        case 'new arrivals':

            return <View style={{
                backgroundColor: 'white',
                width: CategoryCommon.Screen_Width,
            }}>

                <RecommendFatList
                    data={props}>
                </RecommendFatList>

            </View>

            break;
    }

}

class RecommendFatList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            page: 1,
            navId: 0,
            isOver: false,//数据加载是否完成
            isRequesting: false,
            key: ''
        }
    }

    getRecommendProducts() {

        let formData = new FormData();
        formData.append('user_token', 'e8e002662f170954fa251534691d75fc');
        formData.append('nav_id', this.state.navId);
        formData.append('timestamp', '1625886947099');
        formData.append('page_size', '20');
        formData.append('page', this.state.page);
        formData.append('user_id', '36618050');
        fetch(CategoryCommon.requestCheckInNavUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: formData,
        }).then((response) => {

            return response.json();

        }).then((responseData) => {

            let topmenus = responseData.data.topmenus;

            let datas = [];
            let over = false;

            let recommends = responseData.data.recommends;

            let newArray = this.state.products.slice()

            if (recommends.products.length > 0) {
                datas = newArray.concat(recommends.products);
            } else {
                over = true
            }

            this.setState({
                products: datas,
                isOver: over,
                isRequesting: false
            })

        }).catch((error) => {

            this.setState({
                error: true,
                errorInfo: error,
                isRequesting: false
            })
        }).done();

    }

    _renderFooter() {

        if (this.props.data.title == 'best selling') {
            if (this.state.isOver) {
                return (<
                    View style={
                        CategoryDetailStyle.productlist_styles.footer
                    } >
                    <
                        Text >
                    </Text>
                </View>
                );
            }
            return (<
                View style={
                    CategoryDetailStyle.productlist_styles.footer
                } >
                <
                    ActivityIndicator />
                <
                    Text > 加载更多 </Text>
            </View>
            );
        } else {

            return (<
                View style={
                    CategoryDetailStyle.productlist_styles.loading_view
                } >
                <
                    ActivityIndicator />
            </View>
            );
        }
    }

    _onEndReached() {

        alert('_onEndReached')

        if (this.state.isRequesting) {
            return
        }
        this.state.isRequesting = true
        this.state.navId = 1;
        this.state.page++;
        this.getRecommendProducts();
    }

    render() {

        if (!this.state.products || this.state.products.length <= 0 && this.props.data.title == 'best selling') {
            this.state.products = this.props.data.data.state.recommends.products
            this.state.key = this.props.data.title
        }

        return <FlatList
            listKey={this.state.key}
            numColumns={
                2
            }
            data={
                this.state.products
            }
            renderItem={
                ({
                    item,
                    index
                }) => {
                    return <CategoryDetailProductItem
                        id={
                            item.product_id
                        }
                        itemWidth={
                            (CategoryCommon.Screen_Width - 30) / 2
                        }
                        imageUrl={
                            item.image
                        }
                        name={
                            item.product_name
                        }
                        price={
                            item.price
                        }
                    />
                }
            }
            ListFooterComponent={
                this._renderFooter.bind(this)
            }
            onEndReached={
                this._onEndReached.bind(this)
            }
            onEndReachedThreshold={
                1
            }
            keyExtractor={
                (item, index) => {
                    return index + '_' + item.product_id + "_";
                }
            }
        />
    }
}

class PPMenuButtonView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectIndex:0,
        }
    }  

    clickItem() {

        let index = this.props.data.indexOf(this.props.id);
        if(index == this.props.selectedIndex){
            return
        } 

        // this.setState({
        //      selectIndex:index 
        // })

        this.props.onUpdateStatus(index)

    }

    render() {

        console.log(this.props.data)
        return <TouchableWithoutFeedback
            onPress={
                 this.clickItem.bind(this)
             }
            >
            <View style={{flex: 1 / 2, justifyContent: 'center', alignItems: 'center'}}>
                <UpdateMenuButtonStatus selectMenu={this.props.id} datas={this.props.data} selectIndex={this.props.selectedIndex} /> 
            </View>
        </TouchableWithoutFeedback>
    }
}

function UpdateMenuButtonStatus(props) {
 
     let index = props.datas.indexOf(props.selectMenu);
     if(index == props.selectIndex) {
     return  <Text style={{ color: 'red', fontSize: 18 }}>{props.selectMenu.display_name_en}</Text>
     }else {
      return  <Text style={{ color: 'black', fontSize: 18 }}>{props.selectMenu.display_name_en}</Text>
     }
}


class PPTapMenuView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectIndex:0
        }
    }  

     updateStatus(index) {

        // alert(index)
        console.log(this)
        // this.setState({
        //     selectIndex: true,
        // })

        // this.state.selectIndex = index

    //  this.setState({
    //     selectIndex:index
    //  })

    }

    render() {

        // console.log(this.props.state)
        return <View style={{ backgroundColor: 'grey', width: CategoryCommon.Screen_Width, height: 50, flex: 1, flexDirection: 'row' }}>
            <PPMenuButtonView id={this.props.data.state.topmenus[0]} data={this.props.data.state.topmenus}  selectedIndex={this.state.selectIndex} onUpdateStatus={this.updateStatus}>
            </PPMenuButtonView>
            <PPMenuButtonView id={this.props.data.state.topmenus[1]} data={this.props.data.state.topmenus}  selectedIndex={this.state.selectIndex} onUpdateStatus={this.updateStatus}>
            </PPMenuButtonView>
        </View>
    }


}





