// pages/all_talk/all_talk.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all_talks:[],
    message_numbers:[],
    message_dates:[],
    message_lastones:[],
    message_names:[]
  },

  talkNavigate: function(event)
  {
    var currentUser = "1";
    if(app.globalData.openId == event.currentTarget.dataset.talk.user2)
    {
      currentUser = "2";
    }
    wx.navigateTo({
      url:'../talk_detail/talk_detail?user1='
      +event.currentTarget.dataset.talk.user1+
      '&user2='+event.currentTarget.dataset.talk.user2+
      "&currentUser="+currentUser+
      "&type=user"+
      "&user1Name="+event.currentTarget.dataset.talk.user1Name+
      "&user2Name="+event.currentTarget.dataset.talk.user2Name,

      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {}
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showToast({
      title: '加载中',
      icon:'loading',
      duration:800
    })
    var that = this;
    wx.cloud.callFunction({
      name:'getAllTalksByUser',
      success:function(res){
        that.setData({
          all_talks: res.result.all_talks,
          message_numbers: res.result.message_numbers,
          message_dates: res.result.message_dates,
          message_lastones: res.result.message_lastones,
          message_names: res.result.message_name
        })
      }
    })
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

  }
})