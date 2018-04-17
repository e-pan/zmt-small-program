import {
    ajax,
    myToast
} from '../../../utils/util'
import {
    webStatus
} from '../../../utils/status'

const app = getApp()
const sessionId = wx.getStorageSync('sessionId')
Page({
    data: {
        filters: [{
            'status': '0',
            'name': '筛选'
        }, {
            'status': '500',
            'name': '草稿'
        }, {
            'status': '520',
            'name': '再申请审核中'
        }, {
            'status': '510',
            'name': '不符合要求'
        }, {
            'status': '10',
            'name': '征信中'
        }, {
            'status': '530',
            'name': '征信通过,审核中'
        }, {
            'status': '540',
            'name': '待更新'
        }, {
            'status': '550',
            'name': '待追加'
        }, {
            'status': '560,570,80,90',
            'name': '待确认'
        }, {
            'status': '130',
            'name': '待放款'
        }, {
            'status': '580',
            'name': '更换银行审核'
        }, {
            'status': '190',
            'name': '待收费'
        }, {
            'status': '140',
            'name': '已放款'
        }, {
            'status': '590',
            'name': '待抵押'
        }, {
            'status': '600',
            'name': '还款中'
        }, {
            'status': '610',
            'name': '结清中'
        }, {
            'status': '620',
            'name': '还款完成'
        }, {
            'status': '50',
            'name': '征信未通过'
        }, {
            'status': '110',
            'name': '审核未通过'
        }, {
            'status': '160',
            'name': '已全额退资'
        }, {
            'status': '630',
            'name': '拒绝再申请'
        }],

        steps: [{
            name: '申请',
            key: 0
        }, {
            name: '征信',
            key: 1
        }, {
            name: '审核',
            key: 2
        }, {
            name: '放款',
            key: 3
        }, {
            name: '抵押',
            key: 4
        }, {
            name: '还款',
            key: 5
        }],
        step: 3,


        banks: [],
        departments: [],
        orderDetail: {}

    },

    // 获取银行
    getBank() {
        ajax({
            url: '/bank/user/creditBankList.htm',
            method: 'POST',
            param: {},
            callback: data => {
                if (data.success) {
                    this.setData({
                        banks: data.data
                    })
                } else {
                    if (data.code == 'record_not_exsist') {
                        this.setData({
                            banks: []
                        })
                    } else {
                        myToast(data.resultMsg)
                    }
                }
            }
        });
    },
    // 获取业务部门
    getDepartment() {
        ajax({
            url: '/area/userDepartment.htm',
            method: 'POST',
            param: {},
            callback: data => {
                if (data.success) {
                    this.setData({
                        departments: data.data
                    })
                } else {
                    if (data.code == 'record_not_exsist') {
                        this.setData({
                            departments: []
                        })
                    } else {
                        myToast(data.resultMsg)
                    }
                }
            }
        });
    },
    onLoad: function(option) {
        // 获取订单信息信息
        this.setData({
            orderDetail: wx.getStorageSync('orderDetail')
        })
        console.log(this.data.orderDetail)

        this.getBank()
        this.getDepartment()
    },
    // 拨打电话
    onCall() {
        wx.makePhoneCall({
            phoneNumber: this.data.orderDetail.user.userCode
        })
    }
})