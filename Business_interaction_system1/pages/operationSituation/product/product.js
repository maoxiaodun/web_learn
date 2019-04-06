var app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    user_id:null,
    role_id:null
  },
  onLoad: function () {
    var that = this
    wx.getStorage({
      key: 'user_id',
      success: function (res) {
        console.log(res.data)
        that.setData({
          user_id: res.data
        })
        console.log(that.data.user_id)
      }
    })
    wx.getStorage({
      key: 'role_id',
      success: function (res) {
        console.log(res.data)
        that.setData({
          role_id: res.data
        })
        console.log(that.data.role_id)
      }
    })
    wx.request({
      url: 'http://localhost/customer/Analyse.php', // 仅为示例，并非真实的接口地址
      data: {
        user_id: wx.getStorageSync('user_id'),
        role_id: wx.getStorageSync('role_id')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
      }
    })
  }
});