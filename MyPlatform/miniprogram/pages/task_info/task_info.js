// pages/tasks/tasks.js
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    searchContent:"",
    task_info:[],
    imageList:[],
    fileIdList:[],
    newsTypes:[
      {typeId: '01',
        typeName:'新闻'},
        {typeId: '02',
        typeName:'科普'}
    ],
    hint:"",
    currentType: ""
  },

  
  typeChange(event){
    
    wx.showToast({
      title: '加载中',
      icon:'loading',
      duration: 800
    })
    var that = this;
    this.setData({
      currentType: event.detail.name
    })

    wx.cloud.callFunction({
      name: 'getNewsByType',
      data:{
        type: that.data.currentType
      },
      success: function(res){
        that.setData({
          task_info: res.result.newsList,
          imageList: res.result.imageUrlList
        })
        if(that.data.task_info.length==0)
        {
          that.setData({
            hint: "暂无此类型内容"
          })
        }
      },
      fail: function(res){
        console.log(res)
      }
    })
  },

  taskNavigate: function(event)
  {
    wx.navigateTo({
      url:'../task_info_detail/task_info_detail?newsId='+event.currentTarget.dataset.info._id,
      // url:'../tasks_detail/tasks_detail?task='+taskInfoJson,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {}
    })
  },
  showInput: function () {
    this.setData({
      inputShowed: true   //设置文本框可以输入内容
    });
  },
  // 取消搜索
  hideInput: function () {
    this.setData({
      inputShowed: false
    });
  },

  handleSearch(){
    var that = this;
    wx.showToast({
      title: '加载中',
      icon:'loading',
      duration: 800
    })
    wx.cloud.callFunction({
      name: 'getNewsBySearch',
      data:{
        value: that.data.searchContent
      },
      success: function(res){
        that.setData({
          task_info: res.result.newsList,
          imageList: res.result.imageUrlList
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    wx.showToast({
      title: '加载中',
      icon:'loading',
      duration: 800
    })
    wx.cloud.callFunction({
      name: 'getAllNews',
      success: function(res){
        that.setData({
          task_info: res.result.newsList,
          imageList: res.result.imageUrlList
        })
      },
      fail:function(res){
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