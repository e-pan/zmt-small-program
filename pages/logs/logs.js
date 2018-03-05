//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function (option) {
	  console.log(option)
	  const { id } = option
	  console.log(id)

    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  goback() {
	  wx.navigateBack({
		  delta: 1
	  })
  }
})
