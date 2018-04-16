import {
    mobileValidate,
    pwdValidate,
    myToast,
    ajax
} from '../../../utils/util.js'

const app = getApp()
Page({
    data: {
        departmentArray: [],
        departmentIndex: 0,

        agentName: '',

        bankArray: [],
        bankIndex: 0,

        carTypeArr: ['新车', '二手车', '商用车'],
        carTypeIndex: 0,
        carType: '新车',
        carBrand: '',
        carModel: '',
        carPrice: '',
        carMerchant: '',

        isMarry: false,
        isguarantee1: false,
        isguarantee2: false,
        step: true,

        tempFilePaths: '',
        IDcardUp: '../../../images/ID-car-u.png',
        IDcardDown: '../../../images/ID-car-d.png',

        authorizationArr: [],

        userName: '',
        userIDcard: '',
        userMobile: '',
        userIDcardUp: '',
        userIDcardDown: '',

        marryName: '',
        marryIDcard: '',
        marryMobile: '',
        marryIDcardUp: '',
        marryIDcardDown: '',

        guarantee1Name: '',
        guarantee1IDcard: '',
        guarantee1Mobile: '',
        guarantee1IDcardUp: '',
        guarantee1IDcardDown: '',

        guarantee2Name: '',
        guarantee2IDcard: '',
        guarantee2Mobile: '',
        guarantee2IDcardUp: '',
        guarantee2IDcardDown: ''


    },
    // 车辆相关
    changeCarType(e) {
        this.setData({
            carTypeIndex: e.detail.value,
            carType: this.data.carTypeArr[e.detail.value]
        })
    },
    getCarBrand(e) {
        this.setData({
            carBrand: e.detail.value
        })
    },
    getCarModel(e) {
        this.setData({
            carModel: e.detail.value
        })
    },
    getCarPrice(e) {
        this.setData({
            carPrice: e.detail.value
        })
    },
    getCarMerchant(e) {
        this.setData({
            carMerchant: e.detail.value
        })
    },
    // 业务部门
    getDepartment() {
        ajax({
            url: '/area/userDepartment.htm',
            method: 'POST',
            param: {},
            callback: data => {
                if (data.success) {
                    this.setData({
                        departmentArray: data.data
                    })
                } else {
                    if (data.code == 'record_not_exsist') {
                        this.setData({
                            departmentArray: []
                        })
                    } else {
                        myToast(data.resultMsg)
                    }
                }
            }
        });
    },
    changeDepartment(e) {
        this.setData({
            departmentIndex: e.detail.value
        })
    },
    // 借款银行
    getBank() {
        ajax({
            url: '/bank/user/creditBankList.htm',
            method: 'POST',
            param: {},
            callback: data => {
                if (data.success) {
                    this.setData({
                        bankArray: data.data
                    })
                } else {
                    if (data.code == 'record_not_exsist') {
                        this.setData({
                            bankArray: []
                        })
                    } else {
                        myToast(data.resultMsg)
                    }
                }
            }
        });
    },
    changeBank(e) {
        this.setData({
            bankIndex: e.detail.value
        })
    },
    // 获取借款人信息
    getUserName(e) {
        this.setData({
            userName: e.detail.value
        })
    },
    getUserIDcard(e) {
        this.setData({
            userIDcard: e.detail.value
        })
    },
    getUserMobile(e) {
        this.setData({
            userMobile: e.detail.value
        })
    },
    // 切换是否有配偶
    changeMarry() {
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
        let index = e.currentTarget.dataset.index
        const that = this
        wx.showModal({
            title: '提示',
            content: '确认删除?',
            success: function(res) {
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
    },
    // 图片上传
    changeImg(e) {
        let that = this
        let imgType = e.currentTarget.dataset.type
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: res => {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                if (imgType == 'authorization') {
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
                that.uploadFile(res.tempFilePaths[0])

            }
        })
    },
    uploadFile: filePath => {
        // TODO
        // 上传文件到服务器
        console.log(filePath)
        // wx.uploadFile({
        //     url: app.globalData.API + '/fileUpLoad/user/fileUpLoad.htm', //仅为示例，非真实的接口地址
        //     method: 'POST',
        //     filePath,
        //     name: 'file',

        //     success: function(res) {
        //         var data = res.data
        //         //do something
        //     },
        //     complete: res => {
        //         console.log(res)
        //     }
        // })
        // let formData = new FormData()
        // formData.append("fileAddress", filePath);
        //formData.append("fileAddress", filePath);

        let formData = {}
        formData.name = 'fileAddress'
        formData.fileAddress = filePath
        wx.request({
            url: app.globalData.API + '/fileUpLoad/user/fileUpLoad.htm',
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'Cookie': 'JSESSIONID=' + wx.getStorageSync('sessionId')
            },
            data: formData,
            success: res => {
                // if (res.statusCode != 200) {
                //     myToast(res.data.resultMsg)
                // } else {
                //     obj.callback && obj.callback(res.data)
                // }
            },
            complete: () => {
                //wx.hideLoading()
            }
        })
    },
    // 进入下一步
    next() {
        if (!this.data.userName) {
            myToast('请输入借款人姓名')
        } else if (!this.data.userIDcard) {
            myToast('请输入借款人身份证号')
        } else if (!this.data.userMobile) {
            myToast('请输入借款人手机号')
        } else if (!this.data.userMobile) {
            myToast('请输入借款人手机号')
        } else if (this.data.userIDcardUp == this.data.IDcardUp) {
            myToast('请上传借款人身份证正面照')
        } else if (this.data.userIDcardDown == this.data.IDcardDown) {
            myToast('请上传借款人身份证反面照')
        } else if (isMarry) {
            // 有配偶
            if (!this.data.spouseName) {
            myToast('请输入借款人配偶姓名')
            } else if (!this.data.spouseIDcard) {
                myToast('请输入借款人配偶身份证号')
            } else if (!this.data.spouseMobile) {
                myToast('请输入借款人配偶手机号')
            } else if (this.data.spouseIDcardUp == this.data.IDcardUp) {
                myToast('请上传借款人配偶身份证正面照')
            } else if (this.data.spouseIDcardDown == this.data.IDcardDown) {
                myToast('请上传借款人配偶身份证反面照')
            }
        } else if (isguarantee1) {
            // 有担保人1
            if (!this.data.guarantor1Name) {
                myToast('请输入借担保人1姓名')
            } else if (!this.data.guarantor1IDcard) {
                myToast('请输入担保人1配偶身份证号')
            } else if (!this.data.guarantor1Mobile) {
                myToast('请输入担保人1配偶手机号')
            } else if (this.data.guarantor1IDcardUp == this.data.IDcardUp) {
                myToast('请上传担保人1身份证正面照')
            } else if (this.data.guarantor1IDcardDown == this.data.IDcardDown) {
                myToast('请上传担保人1身份证反面照')
            }
        } else if (isguarantee2) {
            // 有担保人2
            if (!this.data.guarantor2Name) {
                myToast('请输入担保人2配偶姓名')
            } else if (!this.data.guarantor2IDcard) {
                myToast('请输入担保人2配偶身份证号')
            } else if (!this.data.guarantor2Mobile) {
                myToast('请输入担保人2配偶手机号')
            } else if (this.data.guarantor2IDcardUp == this.data.IDcardUp) {
                myToast('请上传担保人2身份证正面照')
            } else if (this.data.guarantor2IDcardDown == this.data.IDcardDown) {
                myToast('请上传担保人2身份证反面照')
            }
        } else {
            // 进入下一步
            this.setData({
                step: true
            })
        }
    },
    // 返回下一步
    prev() {
        this.setData({
            step: false
        })
    },
    // 提交数据
    submit() {
        if (!this.data.carType) {
            myToast('请选择车辆属性')
        } else if (!this.data.carBrand) {
            myToast('请输入汽车品牌')
        } else if (!this.data.carModel) {
            myToast('请输入车型')
        } else if (!this.data.carPrice) {
            myToast('请输入车价')
        } else if (!this.data.carMerchant) {
            myToast('请输入经销商')
        } else {
            // TODO 暂未请求接口直接进入成功页面
            wx.redirectTo({
                url: 'pages/product/success/success'
            })
        }
    },
    onLoad: function(option) {
        // 获取用户昵称
        const {
            realName
        } = wx.getStorageSync('userInfo')
        this.setData({
            agentName: realName
        })

        this.getBank()
        this.getDepartment()
    }
})