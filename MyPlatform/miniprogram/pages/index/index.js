// pages/index/index.js
const db = wx.cloud.database();
const infomation = db.collection('information');
const activities = db.collection('activities');
const users = db.collection('user');

Page({

  /**
   * 页面的初始数据
   */
  data: {
      scrollView:[
      {
      }
    ],
    imageList:[],
    fileIdList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    db.collection('activities').get().then(res=>{
      this.setData({
        scrollView:res.data
      })
      var tempFileIdList=[];
      for(var i=0;i<res.data.length;i++)
      {
        tempFileIdList.push(res.data[i].imageId);
      }
      this.setData({
        fileIdList:tempFileIdList
      })
      var that = this;
    wx.cloud.getTempFileURL({
      fileList:that.data.fileIdList,
      success(res){
        that.setData({
          imageList:res.fileList
        })
        console.log(imageList)
      }
    })
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