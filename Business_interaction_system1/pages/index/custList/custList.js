const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    custList:[{
      cust_id:'1',
      cust_name:'昆明联通',
      cust_address:'小菜园',
      cust_linkman:'zhangsan',
      cust_phone_num:'18608715089',
      cust_uniformSCcode:'XXXX'
      },
      {
        cust_id:'2',
        cust_name: '玉溪联通',
        cust_address: '红塔区',
        cust_linkman: '李四',
        cust_phone_num: '18608715088',
        cust_uniformSCcode: 'CCCC'
      }
    ]
  },
  isCard(e) {
    this.setData({
      isCard: e.detail.value
    })
  },
  call:function(){
    console.log("call------------->")
  },
  onLoad:function(){
    var that = this;
    wx.request({
      url: 'http://localhost/customer/CustomerList.php', // 仅为示例，并非真实的接口地址
      data: {
        user_id:109
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        var arrs = res.data;
        that.setData({
          list: arrs
        });
      }
    })
  },
})