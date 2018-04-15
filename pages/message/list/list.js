import {
    myToast,
    ajax
} from '../../../utils/util'

const app = getApp()
const sessionId = wx.getStorageSync('sessionId')
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
            page: '/pages/order/list/list'
        }, {
            name: '消息',
            icon: 'message',
            active: true,
            page: '/pages/message/list/list'
        }, {
            name: '服务',
            icon: 'service',
            active: false,
            page: '/pages/user/info/info'
        }],
        todoNum: 0,
        todoCon: '',
        todoDate: '',
        noticeNum: 0,
        noticeCon: '',
        noticeDate: '',
        systemNum: 0,
        systemCon: '',
        systemDate: ''
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
    // 底部导航
    onNav(e) {
        if (!e.currentTarget.dataset.isactive) {
            wx.navigateTo({
                url: e.currentTarget.dataset.page
            })
        }
    },
    // 获取代办事项列表和数量
    getTodo() {
        ajax({
            url: '/message/user/getMessageCount.htm',
            method: 'POST',
            sessionId,
            param: {
                sourceTypeId: 0,
                type: 1
            },
            callback: data => {
                if (data.success) {
                    this.setData({
                        todoNum: data.num
                    })
                }
            }
        })
        ajax({
            url: '/message/user/getMessage.htm',
            method: 'POST',
            sessionId,
            param: {
                type: 1,
                sourceTypeId: 0,
                handleResult: 0
            },
            callback: data => {
                if (data.success) {
                    this.setData({
                        todoCon: data.data[0].context,
                        todoDate: data.data[0].messageDate
                    })
                }
            }
        })
    },
    // 获取系统消息列表和数量
    getNotice() {
        ajax({
            url: '/message/user/getMessageCount.htm',
            method: 'POST',
            sessionId,
            param: {
                sourceTypeId: 0,
                type: 2
            },
            callback: data => {
                if (data.success) {
                    this.setData({
                        noticeNum: data.num
                    })
                }
            }
        })
        ajax({
            url: '/message/user/getMessage.htm',
            method: 'POST',
            sessionId,
            param: {
                type: 2,
                sourceTypeId: 0,
                handleResult: 0
            },
            callback: data => {
                if (data.success) {
                    this.setData({
                        noticeCon: data.data[0].context,
                        noticeDate: data.data[0].messageDate
                    })
                }
            }
        })
    },
    // 获取系统公告列表和数量
    getSystem() {
        ajax({
            url: '/message/user/getMessageCount.htm',
            method: 'POST',
            sessionId,
            param: {
                sourceTypeId: 0,
                type: 3
            },
            callback: data => {
                if (data.success) {
                    this.setData({
                        systemNum: data.num
                    })
                }
            }
        })
        ajax({
            url: '/message/user/getMessage.htm',
            method: 'POST',
            sessionId,
            param: {
                type: 3,
                sourceTypeId: 0,
                handleResult: 0
            },
            callback: data => {
                if (data.success) {
                    this.setData({
                        systemCon: data.data[0].context,
                        systemDate: data.data[0].messageDate
                    })
                }
            }
        })
    },
    onLoad: function(options) {
        this.getTodo()
        this.getNotice()
        this.getSystem()
    }
})