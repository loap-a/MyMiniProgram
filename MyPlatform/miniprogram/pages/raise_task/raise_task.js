// pages/raise_task/raise_task.js
const db = wx.cloud.database();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:app.globalData.login,
    userInfo:app.globalData.userInfo,
    modelHidden:true,

    detailImageList: [],
    proveImageList:[],
    tempDetailImageList:[],
    tempProveImageList:[],

      title:"",
      detail:"",
      imgURL:[],
      address:['广东省', '广州市', '海珠区'],
      addressDetail:"",
      phoneNumber:"",
      startDate:"2022-05-23",
      endDate:"2022-05-24",
      raiserName:"",
      raiserAddress:"",
      raiserIntroduction:"",
      raiserImgURL:[]
    
    
  },
  submit(){
      if(this.data.detailImageList.length==0)
      {
        this.setData({
          detailImageList: ["cloud://cloud1-2gva005o7c08f44d.636c-cloud1-2gva005o7c08f44d-1311808483/wx.png"]
        })
      }
    db.collection('tasks').add({
      data:{
        title:this.data.title,
        content:this.data.detail,
        imageId:this.data.detailImageList[0],
        images:this.data.detailImageList,
        address:this.data.address,
        addressDetail:this.data.addressDetail,
        phoneNumber:this.data.phoneNumber,
        startDate:this.data.startDate,
        endData:this.data.endDate,
        raiserName:this.data.raiserName,
        raiserAddress:this.data.raiserAddress,
        raiserIntroduction:this.data.raiserIntroduction,
        raiserImages:this.data.proveImageList,
        visit:0,
        thumbUp:0,
        comment:0,
        comments:[]
      },
      success(res){
        wx.showToast({
          title:"成功",
          duration:2000,
          mask:false,
          success:function(){},

          fail:function(){},
    
          complete:function(){}
        });

      }
    })


  },
  
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.tempDetailImageList,
      current: e.currentTarget.dataset.url
    });
  },

  DelImg(e) {
    wx.showModal({
      title: '确认',
      content: '确定要删除这张照片吗？',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          this.data.tempDetailImageList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            tempDetailImageList: this.data.tempDetailImageList
          })
        }
      }
    })
  },

  ChooseImage() {
    var that=this;
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.detailImageList.length != 0) {
          this.setData({
            tempDetailImageList: this.data.tempDetailImageList.concat(res.tempFilePaths)
          })
          
        } else {
          this.setData({
            tempDetailImageList: res.tempFilePaths
          })
        }

        const urls = res.tempFilePaths;
        var fileIDs = that.data.detailImageList.length==0?[]:that.data.detailImageList;

        for(var i=0;i<urls.length;i++)
        {
          var cloudPath="userPhoto/"+Date.now()+i+".jpg";
          wx.cloud.uploadFile({
            cloudPath,
            filePath: urls[i]
          }).then(res=>{
            fileIDs.push(res.fileID);
          })
        }
        that.setData({
          detailImageList:fileIDs
        })

      }
    });
  },

  RegionChange: function(e) {
    this.setData({
      address: e.detail.value
    })
  },

  DateChangeStart(e) {
    this.setData({
      startDate: e.detail.value
    })
  },

  DateChangeEnd(e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      isLogin:app.globalData.login
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
    this.setData({
      isLogin:app.globalData.login
    })
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
      modelHidden: true,
      isLogin:app.globalData.login,
      userInfo:app.globalData.userInfo
    })
  },

  modalConfirm: function () {
    // do something
    this.setData({
      modelHidden: true,
      isLogin:app.globalData.login,
      userInfo:app.globalData.userInfo
    })
  },

  showAction: function () {
    this.setData({
      modelHidden: false,
    })
  },


  ViewImageProve(e) {
    wx.previewImage({
      urls: this.data.tempProveImageList,
      current: e.currentTarget.dataset.url
    });
  },

  DelImgProve(e) {
    wx.showModal({
      title: '确认',
      content: '确定要删除这张照片吗？',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          this.data.tempProveImageList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            tempProveImageList: this.data.tempProveImageList
          })
        }
      }
    })
  },

  ChooseImageProve() {
    var that=this;
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.tempProveImageList.length != 0) {
          this.setData({
            tempProveImageList: this.data.tempProveImageList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            tempProveImageList: res.tempFilePaths
          })
        }
  
        const urls = res.tempFilePaths;
        var fileIDs = that.data.proveImageList.length==0?[]:that.data.proveImageList;

        for(var i=0;i<urls.length;i++)
        {
          var cloudPath="userPhoto/"+Date.now()+i+".jpg";
          wx.cloud.uploadFile({
            cloudPath,
            filePath: urls[i]
          }).then(res=>{
            fileIDs.push(res.fileID);
          })
        }
        that.setData({
          proveImageList:fileIDs
        })
      }
    });
  },
  
})