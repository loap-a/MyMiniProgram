// pages/tasks/tasks.js
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    tasks:[],
    imageList:[],
    fileIdList:[],
    currentType:'全部',
    taskTypes:[
      {typeId: '01',
        typeName:'疫情防控'},
        {typeId: '02',
        typeName:'理论宣讲'},
        {typeId: '03',
        typeName:'阳光助残'},
        {typeId: '04',
        typeName:'少年助学'},
        {typeId: '05',
        typeName:'生态建设'},
        {typeId: '06',
        typeName:'抢险救灾'},
        {typeId: '07',
        typeName:'其他'},
    ],
    hint:""
  },

  taskNavigate: function(event)
  {
    wx.navigateTo({
      url:'../tasks_detail/tasks_detail?taskId='+event.currentTarget.dataset.task._id,
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
      name: 'getTasksByType',
      data:{
        type: that.data.currentType
      },
      success: function(res){
        that.setData({
          tasks: res.result.taskList,
          imageList: res.result.imageUrlList
        })
        if(that.data.tasks.length==0)
        {
          that.setData({
            hint: "暂无此类型活动"
          })
        }
      },
      fail: function(res){
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    wx.cloud.callFunction({
      name:"getAllTasks",
      success: function(res){
        that.setData({
          tasks: res.result.taskList,
          imageList: res.result.imageUrlList
        })
      }
    })
    // db.collection('tasks').get().then(res=>{
    //   this.setData({
    //     tasks:res.data
    //   })
    //   var tempFileIdList=[];
    //   for(var i=0;i<res.data.length;i++)
    //   {
    //     tempFileIdList.push(res.data[i].imageId);
    //   }
    //   this.setData({
    //     fileIdList:tempFileIdList
    //   })
    //   var that = this;
    // wx.cloud.getTempFileURL({
    //   fileList:that.data.fileIdList,
    //   success(res){
    //     that.setData({
    //       imageList:res.fileList
    //     })
    //   }
    // })
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
    this.onLoad();
    // var that = this;
    // wx.cloud.callFunction({
    //   name:"getAllTasks",
    //   success: function(res){
    //     that.setData({
    //       tasks: res.result.taskList,
    //       imageList: res.result.imageUrlList
    //     })
    //   }
    // })
    // db.collection('tasks').get().then(res=>{
    //   this.setData({
    //     tasks:res.data
    //   })
    //   var tempFileIdList=[];
    //   for(var i=0;i<res.data.length;i++)
    //   {
    //     tempFileIdList.push(res.data[i].imageId);
    //   }
    //   this.setData({
    //     fileIdList:tempFileIdList
    //   })
    //   var that = this;
    // wx.cloud.getTempFileURL({
    //   fileList:that.data.fileIdList,
    //   success(res){
    //     that.setData({
    //       imageList:res.fileList
    //     })
    //   }
    // })
    // })
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