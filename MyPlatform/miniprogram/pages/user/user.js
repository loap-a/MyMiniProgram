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
    userName:'barkk',
    isLogin:app.globalData.login,
    userInfo:app.globalData.userInfo,
    modalHidden: true,
    isSignin: false,
    signInModalHidden: true,
    signedDays:[],
    nickName:"",
    avatarUrl:"",
    theme: {
      bg: "#409efe",
      fontColor: "#fff",
      rangeStartColor: "#79bbff",
      rangeColor: "#b3d8ff",
      rangeEndColor: "#79bbff",
      touchColor:"#67c147",
      isRound:"true"
    
  },
  score:0,
  date:""
  },

  modifyUserProfile(){
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
      name:"getUserInfo",
      data:{},
      success:function(res){
        that.setData({
          nickName: res.result.nickName,
          avatarUrl: res.result.avatarUrl,
          score: res.result.score,
          isLogin:app.globalData.login,
        })
        app.globalData.score = that.data.score;
      },
      fail: function(res){
      }
    })
    

    // wx.getSetting({
    //   success: function(res) {
    //    if (res.authSetting['scope.userInfo']) {
    //     wx.getUserInfo({
    //      success: function(res) {
    //       // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
    //       // 根据自己的需求有其他操作再补充
    //       // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
    //       wx.login({
    //        success: res => {
    //         // 获取到用户的 code 之后：res.code
    //         wx.request({
    //          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx9cdb0e0b9205e3ea&secret='+that.data.value+'&js_code=' + res.code + '&grant_type=authorization_code',
    //          success: res => {
    //            app.globalData.openId = res.data.openid
    //          }
    //         });
    //        }
    //       });
    //      }
    //     });
    //    } else {
    //     // 用户没有授权
    //     // 改变 isHide 的值，显示授权页面
    //     that.setData({
    //      hideMain: true
    //     });
    //    }
    //   }
    //  });

     var today = util.formatTimeSimplify(new Date())
     db.collection('signIn').where({
       _openid: app.globalData.openId,
       dates: _.elemMatch(_.eq(today))
     }).get({
       success: function(res){
         if(res.data.length == 0)
         {
           that.setData({
             isSignin:false
           })
         }
         else{
           that.setData({
             isSignin:true
           })
         }
 
       }
     })

     db.collection('signIn').where({
      _openid:app.globalData.openId
    }).get({
      success: function(res){
        var temp = []
        for(var i=0;i<res.data[0].dates.length;i++)
        {
          temp.push({
            date: res.data[0].dates[i],
            text: "已签到"
          })
        }
        app.globalData.actives = temp
      }
    })


  },

  handleScore()
  {
    wx.navigateTo({
      url: '../score_reward/score_reward',
    })
  },

  handleUserTask(){
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
      name:"getUserInfo",
      data:{

      },
      success:function(res){
        that.setData({
          nickName: res.result.nickName,
          avatarURL: res.result.avatarURL,
          score: res.result.score
        })

      },
      fail: function(res){
      }
    })

    this.setData({
      isLogin:app.globalData.login,
      userInfo:app.globalData.userInfo
    })

  
    var today = util.formatTimeSimplify(new Date())
    db.collection('signIn').where({
      _openid: app.globalData.openId,
      dates: _.elemMatch(_.eq(today))
    }).get({
      success: function(res){
        if(res.data.length == 0)
        {
          that.setData({
            isSignin:false
          })
        }
        else{
          that.setData({
            isSignin:true
          })
        }

      }
    })

    db.collection('signIn').where({
      _openid:app.globalData.openId
    }).get({
      success: function(res){
        var temp = []
        for(var i=0;i<res.data[0].dates.length;i++)
        {
          temp.push({
            date: res.data[0].dates[i],
            text: "已签到"
          })
        }
        app.globalData.actives = temp
      }
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
  handleSetting(){
    wx.showToast({
      title: '此功能尚未开放, 敬请期待',
      icon:'none'
    })
  },
  logout(){
      this.setData({
        isLogin:false,
        userInfo:null
      })
      app.globalData.login=false;
      app.globalData.userInfo=null;
      wx.showToast({
        title: '退出成功'
      })
  },
  signIn()
  {
    var that = this;
    if(this.data.isSignin)
    {
      db.collection('signIn').where({
        _openid:app.globalData.openId
      }).get({
        success: function(res){
          var temp = []
          for(var i=0;i<res.data[0].dates.length;i++)
          {
            temp.push({
              date: res.data[0].dates[i],
              text: "已签到"
            })
          }
          app.globalData.actives = temp
          that.setData({
            signInModalHidden:false
          })
          that.onLoad()
        }
      })

    }
    else{
    var today = util.formatTimeSimplify(new Date())
    db.collection('signIn').where({
      _openid: app.globalData.openId,
      dates: _.elemMatch(_.eq(today))
    }).get({
      success: function(res){
        if(res.data.length == 0)
        {
          db.collection('signIn').where({
            _openid: app.globalData.openId
          }).update({
            data:{
              dates:_.push(today)
            },
            success:function(res){
              that.setData({
                isSignin:true
              })
              wx.showToast({
                title: '签到成功',
              })
              that.onLoad()
              console.log('onLoad')
            }
          })
        }
        else{
          that.setData({
            isSignin:true
          })
        }

      }
    })

    }
  }
})