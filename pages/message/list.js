import {
    myToast
} from '../../utils/util'

const app = getApp()
Page({
    data: {
        navs: [{
            name: '首页',
            icon: 'home',
            active: false,
            page: '/pages/product/list/list'
        }, {
            name: '订单',
            icon: 'order',
            active: false,
            page: '/pages/order/order'
        }, {
            name: '消息',
            icon: 'message',
            active: true,
            page: '/pages/message/list'
        }, {
            name: '服务',
            icon: 'service',
            active: false,
            page: '/pages/user/info/info'
        }]
    },
    onTodo() {
        wx.navigateTo({
            url: '/pages/message/todo/todo'
        })
    },
    onNotice() {
        wx.navigateTo({
            url: '/pages/message/notice/notice'
        })
    },
    onSystem() {
        wx.navigateTo({
            url: '/pages/message/system/system'
        })
    },
    onLoad: options => {

    }
})