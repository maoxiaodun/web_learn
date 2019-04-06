// pages/index/bosChoose/bosChoose.js
const app = getApp();
Page({
  data: {
    showView: false,
    showModal: false,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    bosList: [{
      bos_id: '1',
      bos_name: '软件项目一',
      cust_name: '移动',
      bos_users: ['otx', 'zzc']
    },
    {
      bos_id: '2',
      bos_name: '软件项目2',
      cust_name: '联通',
      bos_users: ['zm', 'ly']
    }
    ]
  },
  showButton: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
  isCard(e) {
    this.setData({
      isCard: e.detail.value
    })
  },
  onLoad: function () {
    var that = this;
    var arrs = that.data.bosList;
    that.setData({
      list: arrs
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  submit: function () {
    this.setData({
      showModal: true
    })
  },
  go: function () {
    this.setData({
      showModal: false
    })
  }
})