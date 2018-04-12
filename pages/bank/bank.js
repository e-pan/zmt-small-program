Page({
    data: { },
    onEdit() {
        wx.navigateTo({
            url: '/pages/bank/info?type=edit'
        })
    },
    onAdd() {
        wx.navigateTo({
            url: '/pages/bank/info?type=add'
        })
    }
})