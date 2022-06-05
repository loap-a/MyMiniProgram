// pages/map_task/map_task.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: "39.026114",
    longitude: "117.714096" ,
    taskList:[],
    markers: []
  },
markertap: function(e)
{
  var taskJson = JSON.stringify(this.data.taskList[e.detail.markerId]);
  console.log('map', this.data.taskList[e.detail.markerId])
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
onLoad(options){
  var that = this;
  wx.cloud.callFunction({
    name:'getMapMarkers',
    data:{
      
    },
    success: function(res){
      that.setData({
        markers: res.result.markerList,
        taskList:res.result.taskList
      })
    },
    fail:function(res){
      
    }
  })
},
chooseLocation(){
  var that =this
  wx.chooseLocation({
    success: function(res) {
      // 设置坐标
      that.setData({
        longitude: res.longitude,
        latitude: res.latitude
      })
    },
  })
},
  regionchange(){

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.mapCtx = wx.createMapContext('showMap') // showMap 为地图组件ID
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var that = this;
    wx.cloud.callFunction({
      name:'getMapMarkers',
      data:{
        
      },
      success: function(res){
        that.setData({
          markers: res.result.markerList,
          taskList:res.result.taskList
        })
      },
      fail:function(res){
        
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

  }
})