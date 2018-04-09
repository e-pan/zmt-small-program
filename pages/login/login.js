import { mobileValidate, myToast } from '../../utils/util'

const app = getApp()
// pages/login/login.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		disabled: true,
		mobile: '',
		password: ''
	},
	getMobile(e) {
		if (e.detail.value.length == 11) {
			this.verSubmit()
			this.setData({
				mobile: e.detail.value
			})
		}
	},
	getPwd(e) {
		this.setData({
			password: e.detail.value
		})
		this.verSubmit()
	},
	verSubmit() {
		if (mobileValidate(this.data.mobile) && this.data.password) {
			this.setData({
				disabled: false
			})
		}
	},
	submit() {
		wx.request({
			url: 'http://prod.service.zjzmjr.com/yztz_user_login_check.htm',
			method: 'GET',
			data: {
				username : this.data.mobile,
				password: this.data.password
			},
			success: res => {
				console.log(res)
				if (res.data.code != 0) {
					myToast('请输入正确的用户名和密码')
				} else {
					wx.redirectTo({
						url: '/pages/apply/apply',
					})
				}
			},
			complete: res => {

			}
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})