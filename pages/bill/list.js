import {
    myToast,
    ajax
} from '../../utils/util'

const app = getApp()
Page({
    data: {
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
        bills: [],
        typeIndex: '',
        typeText: '全部'
    },
    // 筛选
    changeType(e) {
        const that = this
        this.setData({
            typeIndex: e.detail.value,
            typeText: that.data.typeArrs[e.detail.value].value
        })
        this.getBill()
    },
    // 获取账单
    getBill() {
        const that = this
        let sessionId = wx.getStorageSync('sessionId')
        if (sessionId) {
            ajax({
                url: '/account/getAccountBalanceType.htm',
                method: 'POST',
                sessionId: sessionId,
                param: {
                    type: that.data.typeIndex
                },
                callback: data => {
                    if (data.success) {
                        that.setData({
                            bills: data.data
                        })
                    } else {
                        myToast(data.resultMsg)
                    }
                }
            })
        }
    },
    onLoad: function(options) {
        this.getBill()
    }
})