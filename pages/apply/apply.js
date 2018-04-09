// pages/apply/apply.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		bankArray: ['杭州联合银行', '中国', '巴西', '日本'],
		bankIndex: 0,
		peopleArray: ['e-pan', 'e-pan', 'e-pan', 'e-pan'],
		peopleIndex: 0,
		carArray: ['新车', '新车', '新车', '新车'],
		carIndex: 0,
		departmentArray: ['安吉'],
		departmentIndex: 0,
		carBrand: '',
		tempFilePaths: '',
		IDcardUp: '../../images/ID-car-u.png',
		IDcardDown: '../../images/ID-car-d.png',
		isMarry: false,
		isguarantee1: false,
		isguarantee2: false,
		authorizationArr: []
	},
	onLoad: option => {
		// 获取业务部门
		wx.request({
			url: 'https://prod.service.zjzmjr.com/area/userDepartment.htm',
			method: 'POST',
			data: {},
			success: res => {
				console.log(res)
			}
		})
		// 获取贷款银行
		wx.request({
			url: 'https://prod.service.zjzmjr.com/bank/user/creditBankList.htm',
			method: 'POST',
			data: {},
			success: res => {
				//console.log(res)
			}
		})
	},
	// 选择贷款银行
	changeBank(e) {
		this.setData({
			bankIndex: e.detail.value
		})
	},
	// 选择制单人
	changePeople(e) {
		this.setData({
			peopleIndex: e.detail.value
		})
	},
	// 选择车辆属性
	changeCar(e) {
		this.setData({
			carIndex: e.detail.value
		})
	},
	// 车辆属性
	carBrand(e) {
		this.setData({
			carBrand: e.detail.value
		})
	},
	// 图片上传
	changeImg(e) {
		let that = this
		let imgType = e.currentTarget.dataset.type
		wx.chooseImage({
			count: 1, // 默认9
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: function (res) {
				// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
				if (imgType == 'authorization')  {
					// 信用审查
					that.data.authorizationArr.push(res.tempFilePaths[0])
					that.setData({
						authorizationArr: that.data.authorizationArr
					})
				} else {
					that.setData({
						[imgType]: res.tempFilePaths[0]
					})
				}
				//that.uploadFile(res.tempFilePaths[0])
			}
		})
	},
	uploadFile: filePath => {
		// 上传文件到服务器
		console.log(filePath)
		wx.uploadFile({
			url: 'https://prod.service.zjzmjr.com/fileUpLoad/user/fileUpLoad.htm', //仅为示例，非真实的接口地址
			filePath,
			name: 'fileAddress',
			formData: {
				'fileAddress': 'fileAddress'
			},
			success: function (res) {
				var data = res.data
				//do something
			},
			complete: res => {
				console.log(res)
			}
		})
	},
	// 切换是否有配偶
	changeMarry() {
		console.log(this.data)
		this.setData({
			isMarry: !this.data.isMarry
		})
	},
	// 切换是否有担保人1
	changeGuarantee1() {
		this.setData({
			isguarantee1: !this.data.isguarantee1
		})
	},
	// 切换是否有担保人2
	changeGuarantee2() {
		this.setData({
			isguarantee2: !this.data.isguarantee2
		})
	},
	// 删除信用报告
	remove(e) {
		console.log(e)
		let index = e.currentTarget.dataset.index
		const that = this
		wx.showModal({
			title: '提示',
			content: '确认删除?',
			success: function (res) {
				if (res.confirm) {
					//console.log('用户点击确定')
					let arrs = that.data.authorizationArr
					arrs.baoremove(index);
					console.log(that.data.authorizationArr)
					that.data.authorizationArr.baoremove(index);
					
					that.setData({
						authorizationArr: arrs
					})

					console.log(arrs)


				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
	}
})