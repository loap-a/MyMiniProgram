// pages/user/user.js
const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'barkk',
    phoneNumber:'',
    isLogin:app.globalData.login,
    userInfo:app.globalData.userInfo,
    modalHidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    this.setData({
      isLogin:app.globalData.login,
      userInfo:app.globalData.userInfo
    })

    wx.getSetting({
      success: function(res) {
       if (res.authSetting['scope.userInfo']) {
        wx.getUserInfo({
         success: function(res) {
          // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
          // 根据自己的需求有其他操作再补充
          // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
          wx.login({
           success: res => {
            // 获取到用户的 code 之后：res.code
            wx.request({
             url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx9cdb0e0b9205e3ea&secret='+that.data.value+'&js_code=' + res.code + '&grant_type=authorization_code',
             success: res => {
               app.globalData.openId = res.data.openid
             }
            });
           }
          });
         }
        });
       } else {
        // 用户没有授权
        // 改变 isHide 的值，显示授权页面
        that.setData({
         hideMain: true
        });
       }
      }
     });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      isLogin:app.globalData.login,
      userInfo:app.globalData.userInfo
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  login() {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  modalCandel: function () {
    // do something
    this.setData({
      modalHidden: true,
      isLogin:app.globalData.login,
      userInfo:app.globalData.userInfo
    })
  },

  modalConfirm: function () {
    // do something
    this.setData({
      modalHidden: true,
      isLogin:app.globalData.login,
      userInfo:app.globalData.userInfo
    })
  },

  showAction: function () {
    this.setData({
      modalHidden: false,
    })
  },
  logout(){
      this.setData({
        isLogin:false,
        userInfo:null
      })
      app.globalData.login=false;
      app.globalData.userInfo=null;
  }
})