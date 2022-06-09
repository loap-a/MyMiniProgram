// pages/task_info_detail/task_info_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectInfo:null,
    infoImageUrlList:[],
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
    var newsId = options.newsId;
    var that =this;
    console.log('options', newsId)
    wx.cloud.callFunction({
      name: 'getNewsDetailById',
      data:{
        newsId: newsId
      },
      success: function(res){
        that.setData({
          selectInfo: res.result.news,
          infoImageUrlList: res.result.imageUrlList
        })
        console.log(res)
      },
      fail: function(res){
        console.log('fail',res)
      }
    });

    wx.cloud.callFunction({
      name: 'updateNewsView',
      data:{
        newsId: newsId
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