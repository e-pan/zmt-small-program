import { myToast, ajax } from '../../utils/util'

const app = getApp()
Page({
    data: {
        name: '',
        bankCard: '',
        type: ''  // edit编辑  add添加
    },
    getName(e) {
        this.setData({
            name: e.detail.value
        })
    },
    getBandCadr(e) {
        this.setData({
            bankCard: e.detail.value
        })
    },
    formSubmit(e) {
        const that = this
        if (!e.detail.value.name) {
            myToast('请输入持卡人姓名')
        } else if (!e.detail.value.bandCard) {
            myToast('请输入银行卡号')
        } else {
            let sessionId = wx.getStorageSync('sessionId')
            if (sessionId) {
                ajax({
                    url: '/repayment/user/bindBank.htm',
                    method: 'POST',
                    sessionId: sessionId,
                    param: {
                        bankCard: e.detail.value.bandCard,
                        transactionType: 15
                    },
                    callback: data => {
                        if (data.success) {
                            that.bindCard(data)
                        } else {
                            myToast(data.resultMsg)
                        }
                    }
                })
            }
        }
    },
    // 跳转到连连进行银行卡验证绑定
    bindCard(data) {
        wx.request({
            url: data.url,
            data: {
                req_data: data.data
            },
            method: 'POST',
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: res => {
                // TODO 
                // 提交到了连连支付，但是页面没有跳转过去。
            }
        })
    },
    onLoad: function (options){
        this.data.type = options.type
    }
})