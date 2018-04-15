import {
    ajax,
    myToast
} from '../../../utils/util'

const app = getApp()
const sessionId = wx.getStorageSync('sessionId')
Page({
    data: {
        guidances: []
    },
    // 获取列表
    getList() {
        const that = this
        if (sessionId) {
            ajax({
                url: '/operationGuidance/user/getQuestionAnswerClassInfoList.htm',
                method: 'POST',
                sessionId,
                param: {},
                callback: data => {
                    if (data.success) {
                        that.setData({
                            guidances: data.data
                        })
                    } else {
                        if (data.code == 'record_not_exsist') {
                            that.setData({
                                guidances: []
                            })
                        }
                        myToast(data.resultMsg)
                    }
                }
            })
        }
    },
    onList(e) {
        console.log(e)
        let { answer, question } = e.currentTarget.dataset
        wx.navigateTo({
            url: '/pages/user/guidance/detail?answer=' + answer + '&question=' + question
        })
    },
    onLoad: function (options) {
        this.getList()
    }
})