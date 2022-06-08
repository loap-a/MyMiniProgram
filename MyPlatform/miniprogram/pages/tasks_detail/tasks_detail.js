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
    },
    thumb:"点赞"

  },

  select ({detail}) {
    var that = this;
    this.setData({ date: detail.text });

    wx.cloud.callFunction({
      name: 'userSignTask',
      data:{
        date: that.data.date,
        taskId: that.data.selectTask._id
      },
      success: function(res){
        if(res.result == 'fail'){
          wx.showToast({
            title: '您当日已报名',
            icon: 'error'
          })
        }
        else{
          wx.showToast({
            title: '报名成功',
          })
        }
      }
      
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) { 
    wx.showToast({
      title: '加载中',
      icon:'loading',
      duration: 800
    })
    var that = this;
    wx.cloud.callFunction({
      name: 'getTaskDetailById',
      data:{
        taskId: options.taskId
      },
      success: function(res){
        that.setData({
          selectTask: res.result.task,
          taskImageUrlList:res.result.taskImageUrlList,
          taskRaiserImageUrlList:res.result.taskRaiserImageUrlList,
          startDate: res.result.task.startDate,
          endDate: res.result.task.endDate
        })
        if(res.result.hasThumbed)
        {
          that.setData({
            thumb:'取消'
          })
        }
        var date = that.data.startDate.substring(0,8)+'01';
        that.setData({
          date: date
        })
      },
      fail: function(res)
      {
      }
    })

  wx.cloud.callFunction({
    name: "updateTaskView",
    data: {
      taskId: options.taskId
    },
    success: function(res){
      console.log('updatetaskview',res)
    },
    fail: function(res){
      console.log('updatetaskview fail',res)
    }
  })



  },

  handleSidebarThumb(){
    var that = this;
    if(that.data.thumb=='点赞')
    {
      this.setData({
        thumb:"取消"
      })
    wx.cloud.callFunction({
      name: "updateTaskThumb",
      data:{
        task: that.data.selectTask,
        plus: true
      },
      success: function(res){

      },
      fail: function(res){
      }
    })
  }
  else {
    this.setData({
      thumb:"点赞"
    })
    wx.cloud.callFunction({
      name: "updateTaskThumb",
      data:{
        task: that.data.selectTask,
        plus: false
      },
      success: function(res){
      },
      fail:function(res){
      }
    })
  }
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
    this.onUnload();
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