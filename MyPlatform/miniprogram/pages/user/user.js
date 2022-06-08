// pages/user/user.js
const app = getApp();
const db = wx.cloud.database();
const _ = db.command;
var util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: 'barkk',
    isLogin: app.globalData.login,
    userInfo: app.globalData.userInfo,
    modalHidden: true,
    isSignin: false,
    signInModalHidden: true,
    signedDays: [],
    nickName: "",
    avatarUrl: "",
    theme: {
      bg: "#409efe",
      fontColor: "#fff",
      rangeStartColor: "#79bbff",
      rangeColor: "#b3d8ff",
      rangeEndColor: "#79bbff",
      touchColor: "#67c147",
      isRound: "true"

    },
    score: 0,
    date: ""
  },

  modifyUserProfile() {
    wx.navigateTo({
      url: '../modify_user_profile/modify_user_profile',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    wx.cloud.callFunction({
      name: "getUserInfo",
      data: {},
      success: function (res) {
        that.setData({
          nickName: res.result.nickName,
          avatarUrl: res.result.avatarUrl,
          score: res.result.score,
          isLogin: app.globalData.login,
        })
        app.globalData.score = that.data.score;
        app.globalData.actives = res.result.actives;
        var today = util.formatTimeSimplify(new Date())
        for (var i = 0; i < app.globalData.actives.length; i++) {
          if (today == app.globalData.actives[i].date) {
            that.setData({
              isSignin: true
            })
          }
        }
      },
      fail: function (res) {}
    })


  },

  handleScore() {
    wx.navigateTo({
      url: '../score_reward/score_reward',
    })
  },

  handleUserTask() {
    wx.navigateTo({
      url: '../user_task/user_task'
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
    var that = this;
    wx.cloud.callFunction({
      name: "getUserInfo",
      data: {

      },
      success: function (res) {
        that.setData({
          nickName: res.result.nickName,
          avatarURL: res.result.avatarURL,
          score: res.result.score
        })

      },
      fail: function (res) {}
    })

    this.setData({
      isLogin: app.globalData.login,
      userInfo: app.globalData.userInfo
    })



    this.onLoad();
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
      isLogin: app.globalData.login,
      userInfo: app.globalData.userInfo
    })
  },

  modalConfirm: function () {
    // do something
    this.setData({
      modalHidden: true,
      isLogin: app.globalData.login,
      userInfo: app.globalData.userInfo
    })
  },

  signInCandel: function () {
    // do something
    this.setData({
      signInModalHidden: true
    })
  },

  signInConfirm: function () {
    // do something
    this.setData({
      signInModalHidden: true,
    })
  },

  showAction: function () {
    this.setData({
      modalHidden: false,
    })
  },
  handleSetting() {
    wx.showToast({
      title: '此功能尚未开放, 敬请期待',
      icon: 'none'
    })
  },
  logout() {
    this.setData({
      isLogin: false,
      userInfo: null
    })
    app.globalData.login = false;
    app.globalData.userInfo = null;
    wx.showToast({
      title: '退出成功'
    })
  },
  signIn() {
    var that = this;

    if (that.data.isSignin) {
      that.setData({
        signInModalHidden: false
      })
    }
     else {
      var today = util.formatTimeSimplify(new Date())
      wx.cloud.callFunction({
        name: 'userSignIn',
        data: {
          today: today
        },
        success: function (res) {
          that.setData({
            isSignin: true
          })
          app.globalData.actives.push({
            date: today,
            text: '已签到'
          })
          wx.showToast({
            title: '签到成功',
          })
          that.onLoad();
        },
        fail: function(res){
        }

      })
    }
  }

})