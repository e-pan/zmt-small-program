Page({
    data: {
        index: 1,
        imgUrls: [
            'http://prod.service.zjzmjr.com/images/test/pic-1.jpg',
            'http://prod.service.zjzmjr.com/images/test/pic-1.jpg',
            'http://prod.service.zjzmjr.com/images/test/pic-1.jpg'
        ],
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
        }]
    },
    detail() {
        wx.navigateTo({
            url: '/pages/product/detail/detail'
        })
    },
    apply() {
        wx.navigateTo({
            url: '/pages/product/apply/apply'
        })
    },
    // 底部导航
    onNav(e) {
        if (!e.currentTarget.dataset.isactive) {
            wx.navigateTo({
                url: e.currentTarget.dataset.page
            })
        }
    }
})