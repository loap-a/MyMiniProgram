// pages/tasks_detail/tasks_detail.js
const app = getApp();
const db = wx.cloud.database();
const _ = db.command;
var util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:"",
    selectTask:null,
    mainDetail:true,
    mainTime:false,
    mainNeed:false,
    theme: {
        bg: "#409efe",
        fontColor: "#fff",
        rangeStartColor: "#79bbff",
        rangeColor: "#b3d8ff",
        rangeEndColor: "#79bbff",
        touchColor:"#67c147",
        isRound:"true"
      
    },
    startDate:"2022-06-10",
    endDate:"2022-06-30",
    taskImageUrlList:[],
    taskRaiserImageUrlList:[],
    taskRaiser:{
      nickName:"南极神秘客",
      address:"宣武区著北纬路甲一号德云社",
      introduction:"擅长模仿",
      phoneNumber:"114514",
    }

  },

  select ({detail}) {
    var that = this;
    this.setData({ date: detail.text });
    db.collection('task_user').where({
      _openid: app.globalData.openId
    }).get({
      success: function(res){
        if(res.data.length==0)
        {
          db.collection('task_user').add({
            data:{
            signedTasks: [{
              task: that.data.selectTask,
              date: that.data.date
            }]
            }
          })
        }
        else{
          db.collection('task_user').where({
            _openid: app.globalData.openId
          }).update({
            data:{
              signedTasks:_.push({
                task: that.data.selectTask,
                date: that.data.date
              })
            }
          })
        }
      }
    })
    wx.showToast({
      title:"成功",
      duration:2000,
      mask:false,
      success:function(){
      },

      fail:function(){},

      complete:function(){
      }
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var currentTask = JSON.parse(options.task);
    this.setData({
      selectTask:currentTask,
      startDate:currentTask.startDate,
      endDate:currentTask.endDate
    });
    var that = this;
  wx.cloud.getTempFileURL({
    fileList:currentTask.images,
    success(res){
      that.setData({
        taskImageUrlList:res.fileList
      })
    }
  });

  wx.cloud.getTempFileURL({
    fileList:currentTask.raiserImages,
    success(res){
      that.setData({
        taskRaiserImageUrlList:res.fileList
      })
    }
  });

  },

   handleTest(){
     wx.navigateTo({
       url:'../test/test'
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
  handleSidebarDetail(){
    this.setData({
      mainDetail:true,
      mainTime:false,
      mainNeed:false,
    })
  },
  handleSidebarTime(){
    this.setData({
      mainDetail:false,
      mainTime:true,
      mainNeed:false,
    })
  },
  handleSidebarEmployee(){
    this.setData({
      mainDetail:false,
      mainTime:false,
      mainNeed:true,
    })
  }
})