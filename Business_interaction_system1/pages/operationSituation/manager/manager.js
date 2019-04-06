var wxCharts = require('../../../utils/wxcharts.js');
import WxValidate from '../../../utils/WxValidate.js';
var util = require('../../../utils/util.js');
var app = getApp();
var columnChart1 = null;
var columnChart2 = null;
var columnChart3 = null;
var chartData = {
  chart1: {
    title: '实际收入',
    data: [23, 28, 35, 54, 44,32,38,47,31,50,64,66],
    categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月','12月']
  },
  chart2: {
    title: '录入商机',
    data: [73, 42, 64, 54, 81,68,45,68,45,46,34,40],
    categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  },
  chart3: {
    title: '转化率',
    data: [60, 59, 64, 72, 63,75,55,61,63,66,50,56],
    categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  }
};
//加载报表数据
Page({
  data: {
    user_id:null,
    role_id:null,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    position_id:null,
    position_name:'',
    position_Name: ['党政军', '公共事业', '工业制造', '交通物流', '教育信息化', '金融证保', '旅游酒店', '官渡区分公司', '五华区分公司', '盘龙区分公司', '西山区分公司', '官渡空港营销服务中心', '五华小西门营销服务中心', '五华高新营销服务中心', '盘龙北市区营销服务中心', '盘龙城东营销服务中心', '西山金碧营销服务中心', '呈贡分公司', '嵩明分公司', '东川分公司', '石林分公司', '寻甸分公司', '宜良分公司',  '销售经理组','营业厅'],
    chartTitle1: '实际收入',
    chartTitle2: '录入商机',
    chartTitle3: '转化率',
    isMainChartDisplay: true
  },
  initValidate() {
    this.validate = new WxValidate({
      position_name: {
        required: true,
      },
    },
    {
      position_name: {
        required: '客户名称为必选字段',
      },
    })
  },
  PickerChangePosition(e) {
    console.log(e);
    this.setData({
      position_id: e.detail.value,
      position_name: this.data.position_Name[e.detail.value]
    })
  },
  onLoad:function(){
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
  },
  onReady: function (e) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    columnChart1 = new wxCharts({
      canvasId: 'columnCanvas1',
      type: 'column',
      animation: true,
      categories: chartData.chart1.categories,
      series: [{
        name: '月份',
        color: '#188df0',
        data: chartData.chart1.data,
        format: function (val, name) {
          return val.toFixed(2);
        }
      }],
      yAxis: {
        format: function (val) {
          return val + '万';
        },
        min: 0
      },
      xAxis: {
        disableGrid: false,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 15,
        },
        legendTextColor: '#000000'
      },
      width: windowWidth,
      height: 200,
    });
    columnChart2 = new wxCharts({
      canvasId: 'columnCanvas2',
      type: 'column',
      animation: true,
      categories: chartData.chart2.categories,
      series: [{
        name: '月份',
        color: '#188df0',
        data: chartData.chart2.data,
        format: function (val, name) {
          return val.toFixed(0) + '个';
        }
      }],
      yAxis: {
        format: function (val) {
          return val + '个';
        },
        min: 0
      },
      xAxis: {
        disableGrid: false,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 15,
        },
        legendTextColor: '#000000'
      },
      width: windowWidth,
      height: 200,
    });
    columnChart3 = new wxCharts({
      canvasId: 'columnCanvas3',
      type: 'column',
      animation: true,
      categories: chartData.chart3.categories,
      series: [{
        name: '月份',
        color: '#188df0',
        data: chartData.chart3.data,
        format: function (val, name) {
          return val.toFixed(0) + '%';
        }
      }],
      yAxis: {
        format: function (val) {
          return val + '%';
        },
        min: 0
      },
      xAxis: {
        disableGrid: false,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 15,
        },
        legendTextColor: '#000000'
      },
      width: windowWidth,
      height: 200,
    });
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
  },
});