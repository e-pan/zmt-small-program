const global = {
    mobileReg: /^1[3|4|5|6|7|8|][0-9]{9}$/,
    emailReg: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    pwdReg: /^([0-9a-zA-Z_]|[~!@#$%^&*\(\)\_\+\=\{\}\[\]\?\/\,\.]){6,20}$/,
    cardReg: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    host: 'https://prod.service.zjzmjr.com'
}

const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

Array.prototype.baoremove = function(index) {
    if (isNaN(index) || index > this.length) {
        return false;
    }
    this.splice(index, 1);
}

// toast 提醒框
const myToast = title => {
    wx.showToast({
        title: title,
        icon: 'none',
        duration: 2000
    })
}

// 验证手机号
const mobileValidate = mobile => {
    return global.mobileReg.test(mobile) ? true : false;
}

// 验证密码
const pwdValidate = pwd => {
    return global.pwdReg.test(pwd) ? true : false;
}

// 验证身份证
const IDcardVailidate = card => {
    let num = card.toUpperCase().split(''), // 大写/格式化成数组
        ratio = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2], // 前17未对应的系数
        verification = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2], // 最后一位对应值
        type,
        total = 0;

    if (num.length != 18 && num.length != 15) {
        // 位数不对，返回错误信息
        type = false;
    } else {
        if (num.length == 18) {
            for (var i = 0; i < ratio.length; i++) {
                total += Number(ratio[i]) * Number(num[i]);
            }
            // 计算方式：前17位身份证号乘以对应的系数再除以11取余，用余数为索引去取最后一位对应的值，把值与身份证最后一位做比较
            if (verification[total % 11] != num[num.length - 1]) {
                // 末尾验证不过，返回错误信息
                type = false;
            } else {
                // 通过
                type = true;
            }
        }
    }
    return type;
}

// 公共请求
// url: 异步接口地址 '/userMerchant/user/getUserInfoSum.htm',
// method: 请求到后台服务的方法 POST/GET
// sessionId:  wx.getStorageSync('sessionId') 获取到的值
// param: 请求参数 { a : 1, b: "string" }
// callback: 请求成功之后的回调函数

// EX:
// ajax({
//     url: '/userMerchant/user/getUserInfoSum.htm',
//     method: 'POST',
//     sessionId: sessionId,
//     param: {
//         isChoose: 1
//     },
//     callback: data => {
//         console.log(data)
//     }
// })
const ajax = obj => {
    const { sessionId } = wx.getStorageSync('userInfo')
    if (sessionId) {
        wx.showLoading()
        wx.request({
            url: global.host + obj.url,
            method: obj.method,
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'Cookie': 'JSESSIONID=' + sessionId || obj.sessionId
            },
            data: obj.param,
            success: res => {
                if (res.statusCode != 200) {
                    myToast(res.data.resultMsg)
                } else {
                    if (res.data.code == 405) {
                        // 如果本地有用户信息做自动登录，没有进入登录页面
                        const userInfo = wx.getStorageSync('userInfo')
                        if (wx.getStorageSync('userInfo')) {
                            again(obj.callback)
                        } else {
                            wx.redirectTo({
                                url: '/pages/login/login'
                            })
                        }
                    } else {
                        obj.callback && obj.callback(res.data)
                    }
                }
            },
            complete: () => {
                wx.hideLoading()
            }
        })
    } else {
        wx.navigateTo({
            url: '/pages/login/login'
        })
    }
}

// 自动登录
const again = () => {
    let { userName, springtoken, sessionId } = wx.getStorageSync('userInfo')
    wx.request({
        url: global.host + '/yztz_user_login_check.htm',
        method: 'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
            username: userName,
            password: "123456",
            springtoken: springtoken
        },
        success: res => {
            // 存入sessionId，userInof到本地
            wx.setStorageSync('sessionId', res.data.sessionId)
            wx.setStorageSync('userInfo', res.data)
            obj.callback && obj.callback(res.data)
        }
    })
}

module.exports = {
    formatTime: formatTime,
    myToast,
    mobileValidate,
    pwdValidate,
    IDcardVailidate,
    ajax
}