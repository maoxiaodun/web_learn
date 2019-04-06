// pages/operationSituation/operationSituation.js
//index.js
//获取应用实例
const app = getApp()
var timeOut
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    WXApp:'欢迎使用业务交互系统WXApp端',
    motto: '点击此处进入',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    role_id:null,
    user_id: null
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getPhoneNumber: function (e) {
    var that = this
    if (e.detail.errMsg == "getPhoneNumber:fail user deny") return;
    //用户允许授权
    console.log("iv", e.detail.iv);
    console.log(e.detail.encryptedData);
    wx.showLoading()
    var self = this
    //1. 调用登录接口获取临时登录code
    wx.login({
      success: res => {
        if (res.code) {
          //2. 访问登录凭证校验接口获取session_key、openid
          wx.request({
            url: "https://api.weixin.qq.com/sns/jscode2session",
            data: {
              'appid': "wx90c49031c0d42aae",
              'secret': "8caa0fe3036d57420ef74c0102b42b09",
              'js_code': res.code,
              'grant_type': "authorization_code"
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              'content-type': 'application/json'
            }, // 设置请求的 header
            success: function (data) {
              console.log("data", data)
              if (data.statusCode == 200) {
                //3. 解密
                wx.request({
                  url: 'http://localhost/CustomerManager/customer/Login/demo.php',
                  data: {
                    'encryptedData': e.detail.encryptedData,
                    'iv': e.detail.iv,
                    'session_key': data.data.session_key
                  },
                  method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                  header: {
                    'content-type': 'application/json'
                  }, // 设置请求的 header
                  success: function (data2) {
                    wx.hideLoading()
                    console.log("当前用户信息",data2.data[0])
                    that.setData({
                      role_id:data2.data[0].user_role_id})
                    that.setData({
                      user_id: data2.data[0].user_id
                    })
                    wx.setStorage({
                      key: "user_id",
                      data: data2.data[0].user_id
                    })
                    wx.setStorage({
                      key: "role_id",
                      data: data2.data[0].user_role_id
                    })
                  },
                  fail: function (err) {
                    console.log(err);
                  }
                })
              }
            },
            fail: function (err) {
              console.log(err);
            }
          })
        }
      }
    })
  },
  tap:function(){
    var that = this
    let role_id = that.data.role_id
      that.setData(role_id)
      if (role_id == 8 || role_id ==9) {
        wx.navigateTo({
          url: './marketer/marketer'
        })
      }
      else if(role_id == 6 || role_id == 7){
        wx.navigateTo({
          url: './product/product',
        })
      }
      else if (role_id == 10) {
        wx.navigateTo({
          url: './manager/manager',
        })
      }
      else if (role_id == 6 || role_id == 7) {
        wx.navigateTo({
          url: './product/product',
        })
      }
      else if (role_id == 4 || role_id == 5) {
        wx.navigateTo({
          url: './charge/charge',
        })
      }
      else if (role_id == 2) {
        wx.navigateTo({
          url: './support/government/government',
        })
      }
      else if (role_id == 3) {
        wx.navigateTo({
          url: './support/innovate/innovate',
        })
      }
      else if(role_id == 1){
        wx.showModal({
          title: '提示',
          content: '很抱歉，管理员请至网站端进行操作',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else {
              console.log('用户点击取消')
            };
            wx.navigateBack({
              delta: 1
            })

          }
        })
      }
      else{
        wx.showModal({
          title: '提示',
          content: '很抱歉，请通知管理员录入您的信息',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else {
              console.log('用户点击取消')
            };
            wx.navigateBack({
              delta: 1
            })

          }
        })
      }
  }
})
