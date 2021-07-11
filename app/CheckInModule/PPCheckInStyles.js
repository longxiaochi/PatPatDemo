import {
    StyleSheet,
    Dimensions
} from 'react-native';

const CheckInCommon = require('../../common/common')

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    text: {
        flex: 1,
        textAlign: 'center',
        color: 'grey',
        marginTop: 10,
    },
    subtext: {
        flex: 1,
        textAlign: 'center',
        color: 'grey',
    },
})

export const productlist_styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerview: {
        backgroundColor: 'white',
        marginTop: 0
    },
    navigationview: {
        height: 44,
        backgroundColor: 'white',
        paddingLeft: 25,
        paddingRight: 25,
        flexDirection: 'row',
        alignItems: 'center' // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中
    },
    backbtn: {
        width: 22,
        height: 22,
        resizeMode: 'stretch'
    },
    searchBox: {
        height: 30,
        flexDirection: 'row', // 水平排布
        flex: 1,
        borderRadius: 15, // 设置圆角边
        backgroundColor: '#F8F8F8',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15
    },
    inputText: {
        flex: 1,
        backgroundColor: 'transparent',
        fontSize: 15,
    },
    searchIcon: { //搜索图标
        height: 17,
        width: 17,
        marginLeft: 5,
        resizeMode: 'stretch'
    },
    bagbtn: {
        width: 22,
        height: 22,
        resizeMode: 'stretch'
    },
    categoryheaderview: {
        height: 40,
        // backgroundColor: 'grey',
        flexDirection: 'row',
    },
    categoryview: {
        flex: 1,
        // backgroundColor: 'yellow',
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',

    },
    sizeview: {
        flex: 1,
        // backgroundColor: 'red',
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sortview: {
        flex: 1,
        // backgroundColor: 'green',
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',

    },
    filterView: {
        flex: 1,
        // backgroundColor: 'grey',
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topView: {
        backgroundColor: 'white',
        height: 40,
        paddingTop: 0,
        paddingLeft: 10,
        paddingRight: 10
    },
    footer: {
        flexDirection: 'row',
        height: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },

    loading_view:{
        flexDirection: 'row',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },

    loading_container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    sizebottomview: {
        height: 60,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    sizeResetBtn: {
        backgroundColor: '#B1B3B7',
        height: 40,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 112,
        borderRadius: 5
    },
    sizeApplyBtn: {
        backgroundColor: '#F1435A',
        height: 40,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: CheckInCommon.kScreenWidth - 142,
        borderRadius: 5
    },
    sizeText: {
        color: 'white',
        fontSize: 10
    },
    selectSizeText: {
        color: '#444444',
        fontSize: 10,
        marginLeft: 10,
        justifyContent: 'center',
    },
    sizeimage: {
        marginLeft: 10,
        marginRight: 10
    }

})

export const productitem_styles = StyleSheet.create({
    feedback: {
        flex: 1,
        alignItems: 'center'
    },
    view: {
        marginTop: 2,
        marginBottom: 2
    },
    image: {
        width: (CheckInCommon.kScreenWidth - 30) / 2.0,
        height: 200,
        flex: 1,
        resizeMode: "cover",
        marginLeft: 10
    },
    text: {
        width: (CheckInCommon.kScreenWidth - 30) / 2.0,
        flexWrap: 'wrap',
        fontSize: 12,
        color: 'black',
        textAlign: 'center',
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        height: 25,
        backgroundColor: 'white'
    },
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingRight: 10,
        backgroundColor: 'white',
        paddingBottom: 10
    },
    price: {
        flex: 1,
        textAlign: 'center',
        fontSize: 13,
        color: '#f15353',
        alignItems: 'center'
    },
    button: {
        width: 50,
        height: 20,
        backgroundColor: 'pink',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    simal: {
        color: '#f15353',
        fontSize: 12,
        textAlign: 'center'
    },
    categoryItemview: {
        backgroundColor: 'white',
        width: CheckInCommon.kScreenWidth / 4,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    categoryItemImage: {
        marginTop: 10,
        width: 50,
        height: 50,
        flex: 1,
        resizeMode: "cover",
    },
    categoryText: {
        flexWrap: 'wrap',
        fontSize: 10,
        color: 'black',
        textAlign: 'center',
        paddingTop: 5
    },
    sortItemview: {
        backgroundColor: 'white',
        width: CheckInCommon.kScreenWidth,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sortItemText: {
        fontSize: 12,
        color: 'black',
        textAlign: 'center',
    },
    sortSelectItemText: {
        fontSize: 12,
        color: 'red',
        textAlign: 'center',
    },
    sortLineview: {
        backgroundColor: '#F1F3F2',
        width: CheckInCommon.kScreenWidth,
        height: 0.5,
    },
    onesizeItemview: {
        backgroundColor: '#F1F3F2',
        width: (CheckInCommon.kScreenWidth - 40) / 3,
        height: 30,
        marginLeft: 10,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    onesizeSelectedItemview: {
        backgroundColor: '#FAE4E7',
        width: (CheckInCommon.kScreenWidth - 40) / 3,
        height: 30,
        marginLeft: 10,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    sizeItemview: {
        backgroundColor: '#F1F3F2',
        width: (CheckInCommon.kScreenWidth - 40) / 3,
        height: 30,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        borderRadius: 5,
    },
    sizeSelectedItemview: {
        backgroundColor: '#FAE4E7',
        width: (CheckInCommon.kScreenWidth - 40) / 3,
        height: 30,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        borderRadius: 5,
    },
    sizeText: {
        color: '#444444',
    },
    sizeSelectedText: {
        color: '#F1435A'
    }
});
