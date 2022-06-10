// pages/index/index.js
const db = wx.cloud.database();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tasks:[],
    imageList:[],
    fileIdList:[],
    hideMain:true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    modalHidden: false,
    value:null
  },
  handleTaskInfo()
  {
    wx.switchTab({
      url: '../task_info/task_info',
    })
  },
  handleMap()
  {
    wx.navigateTo({
      url: '../map_task/map_task',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    var that = this;
    db.collection('myValue').get().then(res=>{
      that.setData({
        value:res.data[0].value
      })
    })
    
    wx.getSetting({
     success: function(res) {
      if (res.authSetting['scope.userInfo']) {
       wx.getUserInfo({
        success: function(res) {
         // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
         // 根据自己的需求有其他操作再补充
         // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
         wx.login({
          success: res => {
           // 获取到用户的 code 之后：res.code
           wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx9cdb0e0b9205e3ea&secret='+that.data.value+'&js_code=' + res.code + '&grant_type=authorization_code',
            success: res => {
              app.globalData.openId = res.data.openid
            }
           });
          }
         });
        }
       });
      } else {
       // 用户没有授权
       // 改变 isHide 的值，显示授权页面
       that.setData({
        hideMain: true
       });
      }
     }
    });

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

    wx.cloud.callFunction({
      name: 'userLogin',
      success:function(res){
      }
    })

    // db.collection('tasks').get().then(res=>{
    //   this.setData({
    //     scrollView:res.data
    //   });
    //   var tempFileIdList=[];
    //   for(var i=0;i<res.data.length;i++)
    //   {
    //     tempFileIdList.push(res.data[i].imageId);
    //   }
    //   this.setData({
    //     fileIdList:tempFileIdList
    //   })
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

//   bindGetUserInfo: function(e) {
//     console.log(this.data.scrollView)
//     if (e.detail.userInfo) {
//         //用户按了允许授权按钮
//         var that = this;
//         app.globalData.userInfo=e.detail.userInfo;
//         app.globalData.login=true;
//         //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
//         that.setData({
//             hideMain: false
//         });
//         console.log(app.globalData.userInfo)
//     } else {
//         //用户按了拒绝按钮
//         wx.showModal({
//             title: '警告',
//             content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
//             showCancel: false,
//             confirmText: '返回授权',
//             success: function(res) {
//                 // 用户没有授权成功，不需要改变 isHide 的值
//                 if (res.confirm) {
//                 }
//             }
//         });
//     }
// },

  taskNavigate: function(event)
  {
    wx.navigateTo({
      url:'../tasks_detail/tasks_detail?taskId='+event.currentTarget.dataset.task._id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {}
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
    // var that=this
    // db.collection('tasks').get().then(res=>{
    //   this.setData({
    //     scrollView:res.data
    //   });
    //   var tempFileIdList=[];
    //   for(var i=0;i<res.data.length;i++)
    //   {
    //     tempFileIdList.push(res.data[i].imageId);
    //   }
    //   this.setData({
    //     fileIdList:tempFileIdList
    //   })
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

  },

  modalCandel: function () {
    // do something
    this.setData({
      modalHidden: true,
    })
  },

  modalConfirm: function () {
    // do something
    this.setData({
      modalHidden: true,
    })
  },

  showAction: function () {
    this.setData({
      modalHidden: false,
    })
  },
  handleTaskHire(){
    wx.switchTab({
      url: '../tasks/tasks',
    })
  },
  handleRaiseTask(){
    wx.navigateTo({
      url: '../raise_task/raise_task',
    })
  },
  handleUser()
  {
    wx.switchTab({
      url: '../user/user',
    })
  },
  handleCreator()
  {
    wx.navigateTo({
      url: '../creator/creator',
    })
  }
})