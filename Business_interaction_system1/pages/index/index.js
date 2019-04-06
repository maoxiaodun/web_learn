//index.js
//获取应用实例
const app = getApp()
Page({
  roleControl: function() {
    console.log(this.data.role_id)
    var that = this
    if (this.data.role_id == 1) {
      this.setData({
        role_name: '管理员',
        list: [null]
      })
    } else if (this.data.role_id == 2) {
      this.setData({
        role_name: '政企综合支撑',
        list: [null]
      })
    } else if (this.data.role_id == 3) {
      this.setData({
        role_name: '创新综合支撑',
        list: [null]
      })
    } else if (this.data.role_id == 4) {
      this.setData({
        role_name: '客户经理总负责人'
      })
    } else if (this.data.role_id == 5) {
      this.setData({
        role_name: '产品经理总负责人',
        list: [{
          id: 'bos',
          name: '商机管理',
          open: false,
          pages: ['bosChoose','bosList'],
          content: ['项目分配','商机列表']
        }]
      })
    } else if (this.data.role_id == 6) {
      this.setData({
        role_name: '产品经理',
        list: [{
          id: 'bos',
          name: '商机管理',
          open: false,
          pages: ['bosList'],
          content: ['商机列表']
        }]
      })
    } else if (this.data.role_id == 7) {
      this.setData({
        role_name: '建维经理',
        list: [{
          id: 'bos',
          name: '商机管理',
          open: false,
          pages: ['bosList'],
          content: ['商机列表']
        }]
      })
    } else if (this.data.role_id == 8) {
      this.setData({
        role_name: '客户经理'
      })
    } else if (this.data.role_id == 9) {
      this.setData({
        role_name: '销售经理'
      })
    } else if (this.data.role_id == 10) {
      this.setData({
        role_name: '公司领导',
        list: [{
          id: 'cust',
          name: '客户管理',
          open: false,
          pages: ['custList'],
          content: ['客户列表']
        }, {
          id: 'bos',
          name: '商机管理',
          open: false,
          pages: ['bosList'],
          content: ['商机列表']
        }]
      })
    } else {
      this.setData({
        role_name: '未知岗位',
        list: [null]
      })
    }
  },
  data: {
    user_id:null,
    role_id:null,
    role_name: 'role_name',
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    author: '2019,中国联通昆明分公司©创新业务部',
    list: [{
        id: 'cust',
        name: '客户管理',
        open: false,
        pages: ['addCust', 'reviseCust', 'custList'],
        content: ['新增客户', '修改客户信息', '客户列表']
      },
      {
        id: 'bos',
        name: '商机管理',
        open: false,
        pages: ['addInnovateBos', 'addTraditionBos', 'bosList'],
        content: ['新增创新商机', '新增传统商机', '商机列表']
      },
    ],
  },
  kindToggle: function(e) {
    console.log(e);
    var id = e.currentTarget.id,
      list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open

        console.log(list[i])
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },
  onLoad: function() {
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
      }
    })
  },
  onReady:function(){
    this.roleControl()
  }
});