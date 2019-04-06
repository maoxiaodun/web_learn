var wxCharts = require('../../../utils/wxcharts.js');
var app = getApp();
var lineChart = null;
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    month_add_boscount:null,
    all_add_boscount:null,
    month_reincome:null,
    month_change_boscount:null,
    all_change_boscount:null,
    user_id:null,
    role_id:null
  },
  touchHandler: function (e) {
    console.log(lineChart.getCurrentDataIndex(e));
    lineChart.showToolTip(e, {
      // background: '#7cb5ec',
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  createSimulationData: function () {
    var categories = [];
    var data = [];
    for (var i = 0; i < 12; i++) {
      categories.push('2016-' + (i + 1));
      data.push(Math.random() * (20 - 10) + 10);
    }
    // data[4] = null;
    return {
      categories: categories,
      data: data
    }
  },
  updateData: function () {
    var simulationData = this.createSimulationData();
    var series = [{
      name: '创新业务',
      data: simulationData.data,
      format: function (val, name) {
        return val.toFixed(2) + '万';
      }
    }];
    lineChart.updateData({
      categories: simulationData.categories,
      series: series
    });
  },
  onLoad: function (e) {
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
    var windowWidth =null
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    var simulationData = this.createSimulationData();
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: simulationData.categories,
      animation: true,
      // background: '#f5f5f5',
      series: [{
        name: '创新业务',
        data: simulationData.data,
        format: function (val, name) {
          return val.toFixed(2) + '万';
        }
      }, {
        name: '传统业务',
        data: [2, 0, 0, 3, null, 4, 0, 0, 2, 0],
        format: function (val, name) {
          return val.toFixed(2) + '万';
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '成交金额 (万元)',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
    wx.request({
      url: 'http://localhost/CustomerManager/customer/Analys.php', // 仅为示例，并非真实的接口地址
      data: {
        user_id:wx.getStorageSync('user_id'),
        role_id:wx.getStorageSync('role_id')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          month_add_boscount: res.data[0].month_add_boscount,
          all_add_boscount: res.data[1].all_add_boscount,
          month_reincome: res.data[2].month_reincome,
          month_change_boscount: res.data[3].month_change_boscount,
          all_change_boscount: res.data[4].all_change_boscount,
        })
      }
    })
  }
});