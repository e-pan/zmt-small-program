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
        navs: [{
            name: '首页',
            icon: 'home',
            active: false,
            page: '/pages/product/list/list'
        }, {
            name: '订单',
            icon: 'order',
            active: true,
            page: '/pages/order/list/list'
        }, {
            name: '消息',
            icon: 'message',
            active: false,
            page: '/pages/message/list/list'
        }, {
            name: '服务',
            icon: 'service',
            active: false,
            page: '/pages/user/info/info'
        }],
        tabs: [{
            name: '全部',
            status: '500,520,510,10,530,540,550,560,570,80,90,130,580,190,140,590,600,610,620,50,110,160,630',
            active: true
        }, {
            name: '进行中',
            status: '500,520,510,10,530,540,550,560,570,80,90,130,580,190,140,590',
            active: false
        }, {
            name: '已完成',
            status: '600,610,620',
            active: false
        }, {
            name: '已关闭',
            status: '50,110,160,630',
            active: false
        }],
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
        filterIndex: 0,
        lists: [],
        rows: 20,
        page: 1,
        webStatus : '',
        search: ''
    },
    // 底部导航
    onNav(e) {
        if (!e.currentTarget.dataset.isactive) {
            wx.navigateTo({
                url: e.currentTarget.dataset.page
            })
        }
    },
    // 筛选状态
    changeStatus(e) {
        this.setData({
            filterIndex: e.detail.value,
            webStatus: this.data.filters[e.detail.value].status,
            search: ''
        })
        this.getList()
    },
    onTabs(e) {
        const tabs = this.data.tabs
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].active = false
        }
        tabs[e.target.dataset.index].active = true
        this.setData({
            webStatus: e.target.dataset.status,
            tabs: tabs,
            search: '',
            filterIndex: 0
        })
        this.getList()
    },
    // 搜索列表
    getSearch(e) {
        this.setData({
            search: e.detail.value
        })
    },
    onSearch() {
        if (this.data.search) {
            ajax({
                url: '/agentLoanApply/user/getMerchantLoanApply.htm',
                method: 'POST',
                param: {
                    rows: 800,
                    page: 1,
                    queryParams: this.data.search
                },
                sessionId,
                callback: data => {
                    if (data.success) {
                        for (let i = 0; i < data.rows.length; i++) {
                            data.rows[i].webStatusCN = webStatus(data.rows[i].webStatus)
                        }
                        this.setData({
                            lists: data.rows
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
        }
    },
    // 获取订单列表
    getList() {
        ajax({
            url: '/agentLoanApply/user/getMerchantLoanApply.htm',
            method: 'POST',
            param: {
                rows: this.data.rows,
                page: this.data.page,
                webStatusLst: this.data.webStatus
            },
            sessionId,
            callback: data => {
                if (data.success) {
                    for (let i = 0; i < data.rows.length; i++) {
                        data.rows[i].webStatusCN = webStatus(data.rows[i].webStatus)
                    }
                    this.setData({
                        lists: data.rows
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
        });
    },
    // 进入详情
    onList(e) {
        wx.navigateTo({
            url: 'pages/order/detai/detail'
        })
    },
    onLoad: function(option) {
        this.getList()
    }
})