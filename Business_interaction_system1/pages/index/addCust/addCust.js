const app = getApp();
import WxValidate from '../../../utils/WxValidate.js';
var util = require('../../../utils/util.js');
var validate;
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    user_id:null,
    role_id:null,
    form: {
      nacust_uniformSCcodeme: '',
      cust_name: '',
      cust_linkman: '',
      cust_linkman_role: '',
      cust_phone_num: '',
      cust_address: ''
    }
  },
  initValidate() {
    this.validate = new WxValidate({
      nacust_uniformSCcodeme: {
        required: true,
        checkNacust_uniformSCcodeme: true
      },
      cust_name: {
        required: true,
        checkCust_name: true
      },
      cust_linkman: {
        required: true,
        checkCust_linkman: true
      },
      cust_linkman_role: {
        required: true,
        checkCust_linkman_role: true
      },
      cust_phone_num: {
        required: true,
        checkCust_phone_num: true
      },
      cust_address: {
        required: true,
        checkCust_address: true
      }
    }, 
    {   
      nacust_uniformSCcodeme: {
        required: '统一社会信用代码为必填字段',
        checkNacust_uniformSCcodeme: '统一社会信用代码填写错误'
      },
      cust_name: {
        required: '公司名称为必填字段',
        checkCust_name: '公司名称填写错误'
      },
        cust_linkman: {
          required: '客户联系人为必填字段',
          checkCust_linkman: '客户联系人填写错误'
      },
        cust_linkman_role: {
          required: '联系人职位为必填字段',
          checkCust_linkman_role: '联系人职位填写错误呀'
      },
        cust_phone_num: {
          required: '联系电话为必填字段',
          checkCust_phone_num: '联系电话填写错误'
        },
        cust_address: {
          required: '详细地址为必填字段',
          checkCust_address: '详细地址填写错误'
        }
    })
  },
  onLoad: function (options) {
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
    this.initValidate();
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      time: time
    });
  },
  formSubmit(e) {
    if (!this.validate.checkForm(e.detail.value)) {
      const error = this.validate.errorList[0];
      wx.showToast({
        title: `${error.msg} `,
        icon: 'none'
      }) ;
      return false
    }
    console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    wx.request({
      url: 'http://10.216.21.25/CustomerManager/customer/AddCustomer.php', 
      data: formData,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        wx.navigateBack({
          delta:1
        })
      }
    })
  },
  //重置表单信息
  formReset: function() {
    console.log('form发生了Reset事件，携带的数据为：')
  }
})