// component/zy-modal/zy-modal.js
var util = require('../../utils/util')
const app = getApp();
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String
    },
    hidden: {
      type: Boolean
    },
    confirmText: {
      type: String
    },
    confirmColor: {
      type: String,
      observer: function (newValue) {
        this.setData({
          tintColor: 'color:' + newValue
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    confirmText: '确认',
    cancelText: '取消',
    tintColor: 'color:#00a48f'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    cancel: function () {
      this.triggerEvent('cancel')
    },
    confirm: function () {
      this.triggerEvent('confirm')
    },
    bindGetUserInfo: function(e) {
      if (e.detail.userInfo) {
          //用户按了允许授权按钮
          var that = this;
          // 获取到用户的信息了，打印到控制台上看下
          app.globalData.userInfo=e.detail.userInfo;
          app.globalData.login=true;
          //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
          that.setData({
              hideMain: false
          });
      } else {
          //用户按了拒绝按钮
          wx.showModal({
              title: '警告',
              content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
              showCancel: false,
              confirmText: '返回授权',
              success: function(res) {
                  // 用户没有授权成功，不需要改变 isHide 的值
                  if (res.confirm) {
                     
                  }
              }
          });
      }
      this.triggerEvent('confirm');
  },
  },

  ready: function () {
    let that = this
    util.wxPromisify(wx.getSystemInfo)().then(res => {
      that.setData({
        height: res.windowHeight + 'px'
      })
    })
  }
})
