import { mobileValidate, myToast } from '../../utils/util'

const app = getApp()
// pages/login/login.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		mobile: '',
		password: '',
		eye: '../../images/svg/eye.svg',
		inputType: 'password'
	},
	getMobile(e) {
		this.setData({
			mobile: e.detail.value
		})
	},
	getPwd(e) {
		this.setData({
			password: e.detail.value
		})
	},
	togglePwd() {
		if (this.data.inputType == 'password') {
			this.setData({
				eye: '../../images/svg/eye1.svg',
				inputType: 'text'
			})
		} else {
			this.setData({
				eye: '../../images/svg/eye.svg',
				inputType: 'password'
			})
		}
	},
	reg() {
		wx.navigateTo({
			url: '/pages/reg/reg'
		})
	},
	forgetPwd() {
		wx.navigateTo({
			url: '/pages/forgetPwd/forgetPwd'
		})
	},
	submit() {
		if (!this.data.mobile || !mobileValidate(this.data.mobile)) {
			myToast('请输入正确的手机号')
		} else if (!this.data.password) {
			myToast('请输入密码')
		} else {
			wx.showLoading()
			wx.request({
				url: app.globalData.API + '/yztz_user_login_check.htm',
				method: 'POST',
				header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
				data: {
					username : this.data.mobile,
					password: this.data.password
				},
				success: res => {
					if (!res.data.code) {
						myToast('请输入正确的用户名和密码')
					} else {
						wx.redirectTo({url: '/pages/product/list/list'})
					}
					wx.hideLoading()
				},
				complete: res => {
				}
			})

		}
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