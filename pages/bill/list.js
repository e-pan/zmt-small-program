import {
    myToast
} from '../../utils/util'

const app = getApp()
Page({
    data: {
        lists: [],
        typeArrs: [{
            value: '全部',
            key: 0
        }, {
            value: '充值',
            key: 1
        }, {
            value: '提现',
            key: 2
        }, {
            value: '奖励',
            key: 3
        }, {
            value: '推荐奖励',
            key: 4
        }, {
            value: '购买保险',
            key: 5
        }, {
            value: '购买理财',
            key: 6
        }, {
            value: '理财回款',
            key: 7
        }, {
            value: '商品购买',
            key: 8
        }, {
            value: '商品购买退款',
            key: 9
        }],
        typeIndex: 0
    },
    // 筛选
    changeType(e) {
        this.setData({
            typeIndex: e.detail.value
        })
        this.getBill()
    },
    // 获取账单
    getBill() {
        wx.showLoading()
        wx.request({
            url: app.globalData.API + '/account/getAccountBalanceType.htm',
            method: 'POST',
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                type: this.data.key
            },
            success: res => {
                const datas = res.data
                console.log(datas)
            },
            complete: res => {
                wx.hideLoading()
            }
        })
    },
    onLoad: function(options) {
        this.getBill()
    }
})