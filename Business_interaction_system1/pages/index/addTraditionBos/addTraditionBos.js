const app = getApp();
import WxValidate from '../../../utils/WxValidate.js'
var util = require('../../../utils/util.js');
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    user_id:null,
    cust_id: null,
    role_id: null,
    cust_Name: ['中国联通', '中国移动', '中国电信'],
    role_Name: ['软件集成负责人——袁春晖', '硬件集成负责人——周立', '平台集成负责人——刘建云'],
    state_id: null,
    state_Name: ['咨询', '待交付', '交付成功', '交付失败', '延迟交付'],
    min: 5,//最少字数
    max: 10240, //最多字数 (根据自己需求改变)
  },
  initValidate() {
    this.validate = new WxValidate({
      cust_name: {
        required: true,
      },
      bos_name: {
        required: true,
        checkBos_name: true
      },
      role_name: {
        required: true,
      },
      state_name: {
        required: true,
      },
      bos_info: {
        required: true,
        checkBos_name: true
      },
      bos_edincome: {
        required: true,
        checkDouble: true
      },
      bos_edcost: {
        required: true,
        checkDouble: true
      },
      bos_edtime: {
        required: true,
        checkDataTime: true
      }
    },
      {
        cust_name: {
          required: '客户名称为必选字段',
        },
        bos_name: {
          required: '商机名称为必填字段',
          checkBos_name: '商机名称格式输入错误'
        },
        role_name: {
          required: '产品经理为必选字段',
        },
        state_name: {
          required: '商机状态为必选字段',
        },
        bos_info: {
          required: '项目概述为必填字段',
          checkBos_name: '项目概述格式填写错误'
        },
        bos_edincome: {
          required: '预估收入为必填字段',
          checkDouble: '预估收入格式填写错误',
        },
        bos_edcost: {
          required: '预估成本为必填字段',
          checkDouble: '预估成本格式填写错误',
        },
        bos_edtime: {
          required: "预估转化时间为必填字段",
          checkDataTime: "必填，格式为：2019-1-1",
        }
      })
  },
  PickerChangeCust(e) {
    console.log(e);
    this.setData({
      cust_id: e.detail.value
    })
  },
  PickerChangeRole(e) {
    console.log(e);
    this.setData({
      role_id: e.detail.value
    })
  },
  PickerChangeState(e) {
    console.log(e);
    this.setData({
      state_id: e.detail.value
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
      });
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
          delta: 1
        })
      }
    })
  },
  //重置表单信息
  formReset: function () {
    console.log('form发生了Reset事件，携带的数据为：')
  }
})