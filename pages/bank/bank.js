import { ajax, myToast } from '../../utils/util'

const app = getApp()
Page({
    data: {
        bank: '',
        bankcard: '',
        bankname: ''
    },
    onEdit() {
        wx.navigateTo({
            url: '/pages/bank/info?type=edit'
        })
    },
    onAdd() {
        wx.navigateTo({
            url: '/pages/bank/info?type=add'
        })
    },
    // 获取银行卡信息
    getBankInfo() {
        const that = this
        let sessionId = wx.getStorageSync('sessionId')
        if (sessionId) {
            ajax({
                url: '/bank/bankQuery.htm',
                method: 'POST',
                sessionId,
                param: {},
                callback: data => {
                    if (data.success) {
                        that.setData({
                            bank: data.data.bank,
                            bankcard: data.data.bankcard,
                            bankname: data.data.bankname
                        })
                    } else {
                        myToast(data.resultMsg)
                    }
                }
            })
        }
    },
    onLoad: function (options) {
        this.getBankInfo()
    }
})