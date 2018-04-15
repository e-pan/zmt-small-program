import {
    myToast,
    ajax
} from '../../../utils/util'

const app = getApp()
const sessionId = wx.getStorageSync('sessionId')
Page({
    data: {
    	lists: []
    },
    // 获取系统通知列表
    getList() {	
    	ajax({
            url: '/message/user/getMessage.htm',
            method: 'POST',
            sessionId,
            param: {
                type: 2,
                sourceTypeId: 0
            },
            callback: data => {
                if (data.success) {
                    this.setData({
                        lists: data.data
                    })
                } else {
                    if (data.code == 'record_not_exsist') {
                        this.setData({
                            lists: []
                        })
                    } else {
                        myToast(data.resultMsg)
                    }
                }
            }
        })
    },
    onLoad: function (option) {
    	this.getList()
    }
})