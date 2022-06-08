// pages/user_task/user_task.js
const app = getApp();
const db = wx.cloud.database();
const _ = db.command;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur:0,
    scrollLeft:0,
    tasks: [],
    titleImageUrlList:[],
    dateList:[],
    theme: {
      bg: "#409efe",
      fontColor: "#fff",
      rangeStartColor: "#79bbff",
      rangeColor: "#b3d8ff",
      rangeEndColor: "#79bbff",
      touchColor:"#67c147",
      isRound:"true"
    
  },
  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
  },
  taskNavigate: function(event)
  {
    var taskJson = JSON.stringify(event.currentTarget.dataset.task);
    wx.navigateTo({
      url:'../tasks_detail/tasks_detail?task='+taskJson,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {}
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('user task onload')
    var that = this;
    wx.cloud.callFunction({
      name: 'getUserSignedTasks',
      success: function(res){
        that.setData({
          tasks: res.result.tasks,
          dateList: res.result.dateList,
          titleImageUrlList: res.result.imageUrlList
        })
        var userTaskActives = [];
        for(var i =0;i<res.result.tasks.length;i++)
        {
          userTaskActives.push({
            date: res.result.dateList[i],
            text: '活动'+ parseInt(i+1)
          })
        }
        app.globalData.userTaskActives = userTaskActives;
      }
    })

    // var that = this;
    // db.collection('task_user').where({
    //   _openid: app.globalData.openId,
    // }).get({
    //   success: function(res){
    //     console.log(res)
    //     var temp = []
    //     var tempFileIdList=[]
    //     var tempDateList=[]
    //     for(var i =0;i<res.data[0].signedTasks.length;i++)
    //     {
    //       tempDateList.push(res.data[0].signedTasks[i].date)
    //       temp.push(res.data[0].signedTasks[i].task)
    //       tempFileIdList.push(res.data[0].signedTasks[i].task.imageId)
    //     }
    //     that.setData({
    //       tasks: temp,
    //       dateList: tempDateList
    //     })
    //     wx.cloud.getTempFileURL({
    //       fileList:tempFileIdList,
    //       success(res){
    //         that.setData({
    //           titleImageUrlList:res.fileList
    //         })
    //       }
    //     })

    //   },
    //   fail: function(res){
    //     console.log('error')
    //   }
    // })



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

  }
})