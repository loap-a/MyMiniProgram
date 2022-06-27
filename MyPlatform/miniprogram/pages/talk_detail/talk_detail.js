// pages/talk_detail/talk_detail.js
const app = getApp();
const util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user1:"",
    user2:"",

    currentUser: "1",
    messages:[],
    targetName:"",
    inputMessage:""
  },

  handletap(){
    var that = this;
    var messages = this.data.messages;
    messages.push({
      activate: this.data.currentUser,
      time: util.formatTimeNew(new Date()),
      message: this.data.inputMessage
    })
    var inputMessage = this.data.inputMessage;
    this.setData({
      messages: messages,
      inputMessage: ""
    })

    wx.cloud.callFunction({
      name:'insertMessage',
      data:{
        user1:that.data.user1,
        user2:that.data.user2,
        time: util.formatTimeNew(new Date()),
        activate: that.data.currentUser,
        message: inputMessage
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    var user1 = options.user1;
    var user2 = options.user2;
    this.setData({
      user1:user1,
      user2:user2
    })
    var user1Name = options.user1Name;
    var user2Name = options.user2Name;
    var currentUser = options.currentUser;
    console.log(options);
    if(currentUser=="1")
    {
      this.setData({
        targetName: user2Name
      })
    }
    else{
      this.setData({
        targetName:user1Name
      })
    }

    var type = options.type;
    var today = util.formatTimeNew(new Date());

    if(type=="user"){
      wx.cloud.callFunction({
        name:"beginConversation",
        data:{
          user1:user1,
          user2:user2,
          curTime: today,
          user1Name: user1Name,
          user2Name: user2Name,
        },
        success:function(res){
          console.log(res);
          that.setData({
            messages: res.result.messages,
            currentUser: currentUser
          })
        },
        fail: function(res){
          console.log('fail',res)
        }
      })
    }
    else{
      user1Name = app.globalData.userInfo.nickName;
      wx.cloud.callFunction({
        name:"beginConversation",
        data:{
          user1:user1,
          user2:user2,
          curTime: today,
          user1Name: user1Name,
          user2Name: user2Name,
        },
        success:function(res){
          that.setData({
            messages: res.result.messages,
            currentUser: currentUser
          })
        }
      })
    }
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